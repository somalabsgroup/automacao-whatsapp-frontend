/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: tenants } = await supabase
    .from('tenant_users')
    .select('role, tenants(id, slug, name)')
    .eq('user_id', user.id)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Suas clínicas</h1>
          <span className="text-sm text-gray-500">{user.email}</span>
        </div>

        {!tenants || tenants.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Nenhuma clínica encontrada. Entre em contato com o suporte.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tenants.map((item: any) => {
              const tenant = item.tenants as any
              return (
                <a
                  key={tenant.id}
                  href={`${process.env.NEXT_PUBLIC_BASE_DOMAIN ? `https://${tenant.slug}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}` : `http://${tenant.slug}.localhost:3000`}/dashboard`}
                  className="block bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
                >
                  <h2 className="font-semibold text-gray-900">{tenant.name}</h2>
                  <p className="text-sm text-gray-500 mt-1 capitalize">{item.role}</p>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
