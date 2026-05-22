import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'somaclini.com.br'

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

export async function proxy(req: NextRequest) {
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
  if (!subdomain) {
    const publicPaths = ['/', '/login', '/signup', '/unauthorized']
    if (publicPaths.includes(req.nextUrl.pathname)) {
      return res
    }
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
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
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // BUSCA TENANT
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, slug, name')
    .eq('slug', subdomain)
    .maybeSingle()

  // TENANT NÃO EXISTE
  if (!tenant) {
    const mainBase = hostname.includes('localhost')
      ? 'http://localhost:3000'
      : `https://${BASE_DOMAIN}`
    return NextResponse.redirect(`${mainBase}/unauthorized`)
  }

  // VERIFICA ACESSO DO USUÁRIO
  const { data: access } = await supabase
    .from('tenant_users')
    .select('id, role')
    .eq('user_id', user.id)
    .eq('tenant_id', tenant.id)
    .maybeSingle()

  // USUÁRIO SEM ACESSO
  if (!access) {
    const mainBase = hostname.includes('localhost')
      ? 'http://localhost:3000'
      : `https://${BASE_DOMAIN}`
    return NextResponse.redirect(`${mainBase}/unauthorized`)
  }

  // Reescreve URL
  const url = req.nextUrl.clone()
  url.pathname = `/app/${subdomain}${req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname}`

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}