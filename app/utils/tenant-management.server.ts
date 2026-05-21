/**
 * Utilitários para gerenciar tenants dos usuários no Clerk
 * Use essas funções para adicionar/remover acesso de usuários a clínicas
 */

import { createClerkClient } from "@clerk/backend";
import type { TenantInfo } from "./auth.server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

/**
 * Adiciona um tenant ao usuário
 * Atualiza o publicMetadata do usuário no Clerk
 */
export async function addTenantToUser(
  userId: string,
  tenant: TenantInfo
): Promise<void> {
  try {
    const user = await clerkClient.users.getUser(userId);
    const currentTenants = (user.publicMetadata.tenants as TenantInfo[]) || [];

    // Verifica se já tem acesso
    const exists = currentTenants.some((t) => t.id === tenant.id);
    if (exists) {
      console.log(`Usuário ${userId} já tem acesso ao tenant ${tenant.slug}`);
      return;
    }

    // Adiciona o novo tenant
    const updatedTenants = [...currentTenants, tenant];

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        tenants: updatedTenants,
      },
    });

    console.log(`Tenant ${tenant.slug} adicionado ao usuário ${userId}`);
  } catch (error) {
    console.error("Erro ao adicionar tenant ao usuário:", error);
    throw error;
  }
}

/**
 * Remove um tenant do usuário
 */
export async function removeTenantFromUser(
  userId: string,
  tenantId: string
): Promise<void> {
  try {
    const user = await clerkClient.users.getUser(userId);
    const currentTenants = (user.publicMetadata.tenants as TenantInfo[]) || [];

    // Remove o tenant
    const updatedTenants = currentTenants.filter((t) => t.id !== tenantId);

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        tenants: updatedTenants,
      },
    });

    console.log(`Tenant ${tenantId} removido do usuário ${userId}`);
  } catch (error) {
    console.error("Erro ao remover tenant do usuário:", error);
    throw error;
  }
}

/**
 * Atualiza o role do usuário em um tenant
 */
export async function updateUserRoleInTenant(
  userId: string,
  tenantId: string,
  newRole: string
): Promise<void> {
  try {
    const user = await clerkClient.users.getUser(userId);
    const currentTenants = (user.publicMetadata.tenants as TenantInfo[]) || [];

    // Atualiza o role
    const updatedTenants = currentTenants.map((t) =>
      t.id === tenantId ? { ...t, role: newRole } : t
    );

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        tenants: updatedTenants,
      },
    });

    console.log(`Role do usuário ${userId} no tenant ${tenantId} atualizado para ${newRole}`);
  } catch (error) {
    console.error("Erro ao atualizar role do usuário:", error);
    throw error;
  }
}

/**
 * Lista todos os usuários de um tenant
 */
export async function getUsersByTenant(tenantSlug: string): Promise<string[]> {
  try {
    // Busca todos os usuários (paginado)
    const users = await clerkClient.users.getUserList();
    
    // Filtra usuários que têm acesso ao tenant
    const tenantUsers = users.data.filter((user) => {
      const tenants = (user.publicMetadata.tenants as TenantInfo[]) || [];
      return tenants.some((t) => t.slug === tenantSlug);
    });

    return tenantUsers.map((u) => u.id);
  } catch (error) {
    console.error("Erro ao listar usuários do tenant:", error);
    throw error;
  }
}

/**
 * Exemplo de uso:
 * 
 * // Adicionar usuário à clínica "clinica-exemplo"
 * await addTenantToUser("user_xxx", {
 *   id: "tenant_123",
 *   slug: "clinica-exemplo",
 *   role: "admin",
 *   name: "Clínica Exemplo"
 * });
 * 
 * // Remover acesso
 * await removeTenantFromUser("user_xxx", "tenant_123");
 * 
 * // Atualizar role
 * await updateUserRoleInTenant("user_xxx", "tenant_123", "owner");
 */
