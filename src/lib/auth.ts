import { SupabaseClient } from '@supabase/supabase-js';
import { UserData, TenantData } from '@/stores/useUserStore';

/**
 * Busca dados do usuário autenticado
 */
export async function fetchUserData(
  supabase: SupabaseClient,
  userId: string
): Promise<UserData | null> {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user?.user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name, image_url')
      .eq('id', userId)
      .single();

    return {
      id: userId,
      firstName: profile?.first_name || null,
      lastName: profile?.last_name || null,
      email: user.user.email || '',
      imageUrl: profile?.image_url || undefined,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

/**
 * Busca dados do tenant pelo slug
 */
export async function fetchTenantData(
  supabase: SupabaseClient,
  tenantSlug: string
): Promise<TenantData | null> {
  try {
    const { data: tenantData, error } = await supabase
      .from('tenants')
      .select('id, slug, name')
      .eq('slug', tenantSlug)
      .maybeSingle();

    if (error || !tenantData) {
      console.error('Error fetching tenant data:', error);
      return null;
    }

    return {
      id: tenantData.id,
      slug: tenantData.slug,
      name: tenantData.name,
    };
  } catch (error) {
    console.error('Error fetching tenant data:', error);
    return null;
  }
}
