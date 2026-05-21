/**
 * Utilitários para autenticação Clerk no servidor
 * React Router v7 + Clerk
 */

import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export interface TenantInfo {
  id: string;
  slug: string;
  role: string;
  name: string;
}

export interface ClerkUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  publicMetadata: {
    tenants?: TenantInfo[];
  };
}

/**
 * Extrai token de sessão do cookie __session do Clerk
 */
function getSessionToken(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) {
    return null;
  }

  // Parse cookies manualmente
  const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  // Clerk usa __session para o token JWT
  return cookies["__session"] || null;
}

/**
 * Obtém informações do usuário autenticado
 * Verifica token de sessão do Clerk
 */
export async function getAuthUser(request: Request): Promise<ClerkUser | null> {
  try {
    const sessionToken = getSessionToken(request);
    
    if (!sessionToken) {
      return null;
    }

    // Verifica o token com o Clerk
    const session = await clerkClient.sessions.verifySession(sessionToken, sessionToken);
    
    if (!session || !session.userId) {
      return null;
    }

    // Busca informações completas do usuário
    const user = await clerkClient.users.getUser(session.userId);

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      publicMetadata: user.publicMetadata as { tenants?: TenantInfo[] },
    };
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return null;
  }
}

/**
 * Obtém lista de tenants do usuário
 */
export function getUserTenants(user: ClerkUser | null): TenantInfo[] {
  if (!user) {
    return [];
  }

  return user.publicMetadata.tenants || [];
}

/**
 * Verifica se usuário tem acesso a um tenant específico
 */
export function hasAccessToTenant(
  user: ClerkUser | null,
  tenantSlug: string
): boolean {
  if (!user) {
    return false;
  }

  const tenants = getUserTenants(user);
  return tenants.some((tenant) => tenant.slug === tenantSlug);
}

/**
 * Obtém tenant ativo baseado no subdomínio
 */
export function getActiveTenant(
  user: ClerkUser | null,
  subdomain: string
): TenantInfo | null {
  if (!user) {
    return null;
  }

  const tenants = getUserTenants(user);
  return tenants.find((tenant) => tenant.slug === subdomain) || null;
}
