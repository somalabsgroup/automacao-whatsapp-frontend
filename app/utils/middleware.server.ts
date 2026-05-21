import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { getAuthUser, getUserTenants, hasAccessToTenant } from "./auth.server";

// Domínio base
const BASE_DOMAIN = process.env.BASE_DOMAIN || "somaclini.com.br";

export interface TenantInfo {
  id: string;
  slug: string;
  role: string;
  name: string;
}

export interface MiddlewareContext {
  userId: string | null;
  subdomain: string | null;
  userTenants: TenantInfo[];
  hasAccess: boolean;
}

/**
 * Extrai subdomínio do hostname
 */
export function getSubdomain(hostname: string): string | null {
  // Remove www. se existir
  const host = hostname.replace(/^www\./, "");

  // Localhost em desenvolvimento
  if (host.includes("localhost")) {
    // Formato: clinica.localhost:5173
    const parts = host.split(".");
    if (parts.length > 1 && parts[0] !== "localhost") {
      return parts[0];
    }
    return null;
  }

  // Se for o domínio principal, retorna null
  if (host === BASE_DOMAIN || host === `www.${BASE_DOMAIN}`) {
    return null;
  }

  // Extrai subdomínio
  const subdomain = host.replace(`.${BASE_DOMAIN}`, "");

  // Verifica se é um subdomínio válido (não contém pontos)
  if (subdomain && !subdomain.includes(".")) {
    return subdomain;
  }

  return null;
}

/**
 * Verifica autenticação e permissões do usuário
 * Retorna contexto com informações do tenant
 */
export async function checkTenantAccess(
  args: LoaderFunctionArgs
): Promise<MiddlewareContext> {
  const { request } = args;
  const url = new URL(request.url);
  const hostname = url.hostname;
  const subdomain = getSubdomain(hostname);

  // Busca usuário autenticado via Clerk
  const user = await getAuthUser(request);
  const userId = user?.id || null;
  const userTenants = getUserTenants(user);

  const hasAccess = subdomain
    ? hasAccessToTenant(user, subdomain)
    : true;

  return {
    userId,
    subdomain,
    userTenants,
    hasAccess,
  };
}

/**
 * Middleware para rotas públicas (landing page)
 */
export async function publicRouteMiddleware(args: LoaderFunctionArgs) {
  const context = await checkTenantAccess(args);
  const { subdomain } = context;

  // Se tiver subdomínio, redireciona pro domínio principal
  if (subdomain) {
    const url = new URL(args.request.url);
    url.hostname = BASE_DOMAIN;
    throw redirect(url.toString());
  }

  return context;
}

/**
 * Middleware para rotas protegidas (requer autenticação)
 */
export async function protectedRouteMiddleware(args: LoaderFunctionArgs) {
  const context = await checkTenantAccess(args);
  const { userId, subdomain } = context;

  // Se não tiver login, redireciona pra login
  if (!userId) {
    const url = new URL(args.request.url);
    const loginUrl = subdomain
      ? `https://${BASE_DOMAIN}/login?redirect=${encodeURIComponent(url.toString())}`
      : `/login?redirect=${encodeURIComponent(url.pathname)}`;
    throw redirect(loginUrl);
  }

  return context;
}

/**
 * Middleware para rotas de tenant (requer acesso ao tenant)
 */
export async function tenantRouteMiddleware(args: LoaderFunctionArgs) {
  const context = await checkTenantAccess(args);
  const { userId, subdomain, hasAccess } = context;

  // Se não tiver subdomínio, redireciona pro domínio principal
  if (!subdomain) {
    throw redirect(`https://${BASE_DOMAIN}/`);
  }

  // Se não tiver login, redireciona pra login com redirect
  if (!userId) {
    const url = new URL(args.request.url);
    throw redirect(
      `https://${BASE_DOMAIN}/login?redirect=${encodeURIComponent(url.toString())}`
    );
  }

  // Se não tiver acesso ao tenant, redireciona pra unauthorized
  if (!hasAccess) {
    throw redirect(`https://${BASE_DOMAIN}/unauthorized`);
  }

  return context;
}
