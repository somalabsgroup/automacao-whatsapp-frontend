import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function TenantDashboard({
  params,
}: {
  params: Promise<{ tenant: string }>
}) {
  const { tenant } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Busca dados do tenant
  const { data: tenantData } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', tenant)
    .single()

  // Busca role do usuário
  const { data: membership } = await supabase
    .from('tenant_users')
    .select('role')
    .eq('user_id', user.id)
    .eq('tenant_id', tenantData?.id)
    .single()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard - {tenantData?.name}</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Bem-vindo, {user.email}</p>
        <p className="text-sm text-gray-500">Role: {membership?.role}</p>
      </div>
    </div>
  )
}
