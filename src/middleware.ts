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
  console.log(`[Middleware] 🔍 Iniciando validação de acesso`);
  console.log(`[Middleware] UserId: ${userId}`);
  console.log(`[Middleware] Subdomain tentado: "${subdomain}"`);
  
  // Pega as organizações do usuário (memberships do sessionClaims)
  const orgMemberships = (sessionClaims?.org_memberships as any[]) || [];
  
  console.log(`[Middleware] Organizations do usuário:`, JSON.stringify(orgMemberships, null, 2));
  
  // Se usuário não tem organizações, bloqueia acesso
  if (!orgMemberships || orgMemberships.length === 0) {
    console.log(`[Middleware] ❌ BLOQUEADO - Usuário não pertence a nenhuma organização`);
    url.pathname = "/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }
  
  // Verifica se o usuário tem acesso a este tenant (slug da org EXATAMENTE igual)
  console.log(`[Middleware] 🔎 Verificando match de slugs...`);
  const hasAccess = orgMemberships.some((membership) => {
    const orgSlug = membership.slug || membership.organization?.slug;
    const match = orgSlug === subdomain;
    console.log(`[Middleware]   - Org slug: "${orgSlug}" === Subdomain: "${subdomain}" ? ${match ? '✅' : '❌'}`);
    return match;
  });
  
  console.log(`[Middleware] Resultado final: hasAccess = ${hasAccess}`);
  
  // SEMPRE bloqueia se não tem acesso
  if (!hasAccess) {
    console.log(`[Middleware] ❌❌❌ ACESSO NEGADO ❌❌❌`);
    console.log(`[Middleware] Motivo: Nenhuma organização do usuário tem slug igual a "${subdomain}"`);
    console.log(`[Middleware] Redirecionando para /unauthorized`);
    url.pathname = "/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }
  
  console.log(`[Middleware] ✅✅✅ ACESSO PERMITIDO ✅✅✅`);
  console.log(`[Middleware] Usuário ${userId} tem acesso à organização "${subdomain}"`);
  
  // Se acessou a raiz do subdomínio, redireciona para dashboard
  if (url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
});

function getSubdomain(hostname: string, baseDomain: string): string | null {
  console.log(`[getSubdomain] Input hostname: "${hostname}", baseDomain: "${baseDomain}"`);
  
  // Remove porta se existir
  const host = hostname.split(":")[0];
  console.log(`[getSubdomain] Host sem porta: "${host}"`);

  // Casos de desenvolvimento
  if (host === "localhost" || host === "127.0.0.1") {
    console.log(`[getSubdomain] Ambiente local detectado, retornando null`);
    return null;
  }

  // Remove base domain
  const subdomain = host.replace(`.${baseDomain}`, "");
  console.log(`[getSubdomain] Após remover baseDomain: "${subdomain}"`);

  // Se for o próprio domain (sem subdomain)
  if (subdomain === baseDomain || subdomain === host) {
    console.log(`[getSubdomain] É o domínio principal, retornando null`);
    return null;
  }

  console.log(`[getSubdomain] ✅ Subdomain extraído: "${subdomain}"`);
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
