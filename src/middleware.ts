import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "somaclini.com.br";

// Rotas públicas (não requerem autenticação)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/unauthorized",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth();
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  // Extrai o subdomínio
  const subdomain = getSubdomain(hostname, BASE_DOMAIN);

  console.log(`[Middleware] ====================================`);
  console.log(`[Middleware] Request: ${url.pathname}`);
  console.log(`[Middleware] Hostname: ${hostname}`);
  console.log(`[Middleware] Subdomain: ${subdomain}`);
  console.log(`[Middleware] UserId: ${userId || "não logado"}`);

  // Se está no domínio principal (sem subdomínio)
  if (!subdomain) {
    if (url.pathname === "/" || isPublicRoute(req)) {
      return NextResponse.next();
    }

    if (url.pathname.startsWith("/dashboard")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // ============================================
  // ESTÁ EM UM SUBDOMÍNIO - VALIDA ORGANIZAÇÃO
  // ============================================

  // Sempre permite /unauthorized
  if (url.pathname === "/unauthorized") {
    return NextResponse.next();
  }

  // Se NÃO está logado, permite apenas /sign-in
  if (!userId) {
    if (url.pathname.startsWith("/sign-in")) {
      return NextResponse.next();
    }
    console.log(`[Middleware] ❌ Não autenticado, redirecionando para /sign-in`);
    url.pathname = "/sign-in";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // IMPORTANTE: Usuário está logado, mas agora PRECISA validar a organização
  console.log(`[Middleware] ⚠️ Usuário LOGADO - Iniciando validação de organização`);

  // ============================================
  // USUÁRIO LOGADO - VALIDA ACESSO À ORGANIZAÇÃO
  // ============================================

  const orgMemberships = (sessionClaims?.org_memberships as any[]) || [];
  
  console.log(`[Middleware] Total de organizations: ${orgMemberships.length}`);
  console.log(`[Middleware] Organizations:`, JSON.stringify(orgMemberships, null, 2));

  // Bloqueia se não tem nenhuma organização
  if (orgMemberships.length === 0) {
    console.log(`[Middleware] ❌ BLOQUEADO - Sem organizações`);
    url.pathname = "/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Verifica se tem acesso ao subdomain específico
  const hasAccess = orgMemberships.some((membership) => {
    const orgSlug = membership.slug || membership.organization?.slug;
    console.log(`[Middleware] Checando: "${orgSlug}" === "${subdomain}" ?`);
    
    if (!orgSlug) {
      console.log(`[Middleware] ⚠️ Organization sem slug definido!`);
      return false;
    }
    
    return orgSlug === subdomain;
  });

  // BLOQUEIA se não tem acesso
  if (!hasAccess) {
    console.log(`[Middleware] ❌ BLOQUEADO - Sem acesso a "${subdomain}"`);
    console.log(`[Middleware] Redirecionando para /unauthorized`);
    url.pathname = "/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }

  console.log(`[Middleware] ✅ ACESSO PERMITIDO`);

  // Se está na página de sign-in estando logado e com acesso, redireciona para dashboard
  if (url.pathname.startsWith("/sign-in")) {
    console.log(`[Middleware] Já está logado com acesso, redirecionando para /dashboard`);
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Se acessou a raiz do subdomínio, redireciona para dashboard
  if (url.pathname === "/") {
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

function getSubdomain(hostname: string, baseDomain: string): string | null {
  const host = hostname.split(":")[0];

  // Casos de desenvolvimento
  if (host === "localhost" || host === "127.0.0.1") {
    return null;
  }

  // Remove base domain
  const subdomain = host.replace(`.${baseDomain}`, "");

  // Se for o próprio domain (sem subdomain)
  if (subdomain === baseDomain || subdomain === host) {
    return null;
  }

  return subdomain;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
