import { clerkClient } from "@clerk/nextjs/server";

export interface TenantInfo {
  id: string;
  slug: string;
  role: "owner" | "admin" | "user";
  name: string;
}

export interface UserWithTenants {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  tenants: TenantInfo[];
}

/**
 * Busca informações do usuário com seus tenants
 */
export async function getUserWithTenants(userId: string): Promise<UserWithTenants | null> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const tenants = (user.publicMetadata.tenants as TenantInfo[]) || [];

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      tenants,
    };
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}

/**
 * Verifica se usuário tem acesso a um tenant específico
 */
export async function hasAccessToTenant(userId: string, tenantSlug: string): Promise<boolean> {
  const user = await getUserWithTenants(userId);
  if (!user) return false;

  return user.tenants.some((tenant) => tenant.slug === tenantSlug);
}

/**
 * Obtém tenant ativo baseado no slug
 */
export async function getActiveTenant(userId: string, tenantSlug: string): Promise<TenantInfo | null> {
  const user = await getUserWithTenants(userId);
  if (!user) return null;

  return user.tenants.find((tenant) => tenant.slug === tenantSlug) || null;
}
