import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "somaclini.com.br";

// Rotas públicas (não requerem autenticação)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
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
  // Permite rotas públicas de autenticação (sign-in, sign-up) mesmo em subdomínio
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Requer autenticação para todas as outras rotas
  if (!userId) {
    // Redireciona para login mantendo o mesmo hostname
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(url);
  }

  // Usuário autenticado: permite acesso ao dashboard do tenant
  // A verificação de acesso ao tenant específico será feita no servidor
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
