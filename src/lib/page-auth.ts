import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchUserData, fetchTenantData } from '@/lib/auth';
import { UserData, TenantData } from '@/stores/useUserStore';

export interface PageAuthData {
  user: UserData;
  tenant: TenantData;
  supabase: Awaited<ReturnType<typeof createClient>>;
}

/**
 * Helper centralizado para autenticação e dados de sessão
 * Usado em todas as páginas protegidas para evitar duplicação
 */
export async function getPageAuthData(): Promise<PageAuthData> {
  const headersList = await headers();
  const tenantSlug = headersList.get('x-tenant');
  const supabase = await createClient();

  // Verifica autenticação
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Valida tenant
  if (!tenantSlug) {
    throw new Error('Acesse através de um subdomínio de clínica válido.');
  }

  // Busca dados do tenant
  const tenantData = await fetchTenantData(supabase, tenantSlug);

  if (!tenantData) {
    throw new Error(`Clínica não encontrada: ${tenantSlug}`);
  }

  // Busca dados do usuário
  const userData = await fetchUserData(supabase, user.id);

  if (!userData) {
    throw new Error('Erro ao carregar dados do usuário');
  }

  return {
    user: userData,
    tenant: tenantData,
    supabase,
  };
}
