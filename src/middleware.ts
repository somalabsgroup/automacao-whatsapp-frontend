import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'somaclini.com.br'

/** Reconstrói a URL correta usando x-forwarded-proto (necessário atrás de proxy como Vercel) */
function getRequestUrl(req: NextRequest): string {
  const proto = req.headers.get('x-forwarded-proto') ??
    (req.headers.get('host')?.includes('localhost') ? 'http' : 'https')
  const host = req.headers.get('host') || ''
  return `${proto}://${host}${req.nextUrl.pathname}${req.nextUrl.search}`
}

function getSubdomain(hostname: string): string | null {
  const host = hostname.replace(/^www\./, '')

  // Remove porta (ex: localhost:3000 → localhost)
  const hostWithoutPort = host.split(':')[0]

  if (hostWithoutPort === BASE_DOMAIN || hostWithoutPort === 'localhost') {
    return null
  }

  // Extrai subdomain tanto para BASE_DOMAIN quanto para .localhost
  const subdomain = hostWithoutPort
    .replace(`.${BASE_DOMAIN}`, '')
    .replace('.localhost', '')

  return subdomain && !subdomain.includes('.') ? subdomain : null
}

export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') || ''
  const subdomain = getSubdomain(hostname)

  // Cria response
  let res = NextResponse.next({
    request: req,
  })

  // Cria cliente Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            req.cookies.set(name, value)
          })
          res = NextResponse.next({
            request: req,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // DOMÍNIO PRINCIPAL
  // DOMÍNIO PRINCIPAL - apenas landing page, sem app
  if (!subdomain) {
    return res
  }

  // SUBDOMÍNIO - ignora assets e rotas públicas (login funciona no próprio subdomínio)
  const subdomainPublicPaths = ['/login', '/signup', '/unauthorized']
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.includes('.') ||
    subdomainPublicPaths.includes(req.nextUrl.pathname)
  ) {
    return res
  }

  // FORÇA LOGIN - redireciona para /login no mesmo subdomínio
  if (!user) {
    const requestUrl = getRequestUrl(req)
    const loginUrl = new URL('/login', requestUrl)
    loginUrl.searchParams.set('redirect', requestUrl)
    return NextResponse.redirect(loginUrl)
  }

  // VERIFICA ACESSO via RPC (SECURITY DEFINER, bypassa RLS e restrições de Data API)
  const { data: access, error: rpcError } = await supabase
    .rpc('check_tenant_access', { tenant_slug: subdomain })

  // Se a função RPC não existe ou houve erro, TEMPORARIAMENTE permite acesso para debug
  if (rpcError) {
    console.error('Erro ao verificar acesso ao tenant:', rpcError)
    // TODO: Descomentar após criar a função RPC no Supabase
    // return NextResponse.redirect(new URL('/unauthorized', getRequestUrl(req)))
  }

  if (!access && !rpcError) {
    return NextResponse.redirect(new URL('/unauthorized', getRequestUrl(req)))
  }

  // Adiciona tenant no header para acesso nas páginas
  res.headers.set('x-tenant', subdomain)
  
  // Se está na raiz do subdomínio, redireciona para dashboard
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', getRequestUrl(req)))
  }
  
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}