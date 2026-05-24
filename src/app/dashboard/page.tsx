import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Sidebar from '@/components/Sidebar'
import DashboardLayout from '@/components/DashboardLayout'
import ContentLayout from '@/components/ContentLayout'
import Header from '@/components/Header'
import ConversationList from '@/components/ConversationList'
import ChatWrapper from '@/components/ChatWrapper'
import { getConversations } from '@/lib/services/conversations'
import { Conversation } from '@/types'

export default async function Dashboard() {
  const headersList = await headers()
  const tenant = headersList.get('x-tenant')
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  if (!tenant) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Erro</h1>
        <p>Acesse através de um subdomínio de clínica válido.</p>
      </div>
    )
  }

  // Busca dados do tenant
  const { data: tenantData, error: tenantError } = await supabase
    .from('tenants')
    .select('id, slug, name')
    .eq('slug', tenant)
    .maybeSingle()
  
  if (tenantError) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Erro ao buscar tenant</h1>
        <p>Erro: {tenantError.message}</p>
        <p>Slug: {tenant}</p>
      </div>
    );
  }
  
  if (!tenantData) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Tenant não encontrado</h1>
        <p>Nenhum tenant encontrado com o slug: {tenant}</p>
      </div>
    );
  }

  // Busca role do usuário
  await supabase
    .from('tenant_users')
    .select('role')
    .eq('user_id', user.id)
    .eq('tenant_id', tenantData?.id)
    .single()

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

  // Buscar conversas do tenant
  let conversations: Conversation[] = [];
  try {
    if (tenantData?.id) {
      conversations = await getConversations(supabase, tenantData.id);
    }
  } catch (error) {
    console.error('Error loading conversations:', error);
  }

  return (
    <>
      <Sidebar user={userData} />
      <DashboardLayout>
        <Header
          title="Dashboard"
          subtitle="Gerencie as conversas e o atendimento da clínica"
        />
        
        <ContentLayout conversationList={<ConversationList conversations={conversations} />}>
          <ChatWrapper 
            conversations={conversations} 
            tenantId={tenantData?.id || ''} 
          />
        </ContentLayout>
      </DashboardLayout>
    </>
  )
}