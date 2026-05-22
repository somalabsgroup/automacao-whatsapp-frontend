import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "somaclini.com.br";

interface TenantInfo {
  id: string;
  slug: string;
  role: string;
}

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

  console.log(`[Middleware] Hostname: ${hostname}, Subdomain: ${subdomain}, Path: ${url.pathname}, UserId: ${userId}`);

  // Se está no domínio principal (sem subdomínio)
  if (!subdomain) {
    // Permite acesso à landing page e rotas públicas
    if (url.pathname === "/" || isPublicRoute(req)) {
      return NextResponse.next();
    }

    // Se tentar acessar /dashboard sem subdomain, redireciona para home
    if (url.pathname.startsWith("/dashboard")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Se está em um subdomínio (tenant-specific)
  // Permite apenas rotas de autenticação (não a raiz "/")
  if (url.pathname.startsWith("/sign-in") || url.pathname === "/unauthorized") {
    return NextResponse.next();
  }

  // Requer autenticação para todas as outras rotas (incluindo "/")
  if (!userId) {
    // Redireciona para login mantendo o mesmo hostname
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(url);
  }

  // Usuário autenticado: verifica se tem acesso ao tenant específico
  // Busca tenants do sessionClaims (public metadata)
  const tenants = (sessionClaims?.tenants as TenantInfo[]) || [];
  
  console.log(`[Middleware] Tenants do usuário:`, JSON.stringify(tenants));
  console.log(`[Middleware] Subdomain atual: "${subdomain}"`);
  
  // Se usuário não tem tenants configurados, bloqueia acesso
  if (!tenants || tenants.length === 0) {
    console.log(`[Middleware] ❌ ACESSO NEGADO - Usuário ${userId} não possui tenants configurados`);
    url.pathname = "/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }
  
  // Verifica se o usuário tem acesso a este tenant (slug EXATAMENTE igual)
  const hasAccess = tenants.some((tenant) => {
    const match = tenant.slug === subdomain;
    console.log(`[Middleware] Comparando "${tenant.slug}" === "${subdomain}": ${match}`);
    return match;
  });
  
  console.log(`[Middleware] hasAccess: ${hasAccess}`);
  
  if (!hasAccess) {
    console.log(`[Middleware] ❌ ACESSO NEGADO - Usuário ${userId} não tem acesso ao tenant ${subdomain}`);
    // Redireciona para página de acesso negado
    url.pathname = "/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }
  
  console.log(`[Middleware] ✅ ACESSO PERMITIDO - Usuário ${userId} tem acesso ao tenant ${subdomain}`);
  
  // Se acessou a raiz do subdomínio, redireciona para dashboard
  if (url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
});

function getSubdomain(hostname: string, baseDomain: string): string | null {
  // Remove porta se existir
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
