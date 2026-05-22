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
  const { userId, orgSlug, orgRole, sessionClaims } = await auth();
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
  // Sempre permite acesso à página de unauthorized
  if (url.pathname === "/unauthorized") {
    return NextResponse.next();
  }

  // Se não está logado, permite apenas acesso ao sign-in
  if (!userId) {
    if (url.pathname.startsWith("/sign-in")) {
      return NextResponse.next();
    }
    // Redireciona para login
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(url);
  }

  // USUÁRIO ESTÁ LOGADO - VALIDA ACESSO USANDO CLERK ORGANIZATIONS
  // Pega as organizações do usuário (memberships do sessionClaims)
  const orgMemberships = (sessionClaims?.org_memberships as any[]) || [];
  
  console.log(`[Middleware] Organizations do usuário:`, JSON.stringify(orgMemberships));
  console.log(`[Middleware] Subdomain atual: "${subdomain}"`);
  
  // Se usuário não tem organizações, bloqueia acesso
  if (!orgMemberships || orgMemberships.length === 0) {
    console.log(`[Middleware] ❌ ACESSO NEGADO - Usuário ${userId} não pertence a nenhuma organização`);
    url.pathname = "/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }
  
  // Verifica se o usuário tem acesso a este tenant (slug da org EXATAMENTE igual)
  const hasAccess = orgMemberships.some((membership) => {
    const orgSlug = membership.slug || membership.organization?.slug;
    const match = orgSlug === subdomain;
    console.log(`[Middleware] Comparando "${orgSlug}" === "${subdomain}": ${match}`);
    return match;
  });
  
  console.log(`[Middleware] hasAccess: ${hasAccess}`);
  
  // Se usuário NÃO tem acesso, bloqueia
  if (!hasAccess) {
    console.log(`[Middleware] ❌ ACESSO NEGADO - Usuário ${userId} não tem acesso à organização ${subdomain}`);
    url.pathname = "/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }
  
  console.log(`[Middleware] ✅ ACESSO PERMITIDO - Usuário ${userId} tem acesso à organização ${subdomain}`);
  
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
