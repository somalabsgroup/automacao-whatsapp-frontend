import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import DashboardLayout from '@/components/DashboardLayout'
import Header from '@/components/Header'

export default async function Configuracoes() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Busca dados do perfil do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, image_url')
    .eq('id', user.id)
    .single()

  const userData = {
    firstName: profile?.first_name || null,
    lastName: profile?.last_name || null,
    email: user.email || '',
    imageUrl: profile?.image_url,
  }

  return (
    <>
      <Sidebar user={userData} />
      <DashboardLayout>
        <Header
          title="Configurações"
          subtitle="Configure o sistema e preferências"
        />
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Ajuste as configurações do sistema.</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
