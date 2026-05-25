import Sidebar from '@/components/Sidebar';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardContent from '@/components/DashboardContent';
import { getConversations } from '@/lib/services/conversations';
import { getPageAuthData } from '@/lib/page-auth';
import { Conversation } from '@/types';

export default async function Dashboard() {
  const { user, tenant, supabase } = await getPageAuthData();

  // Buscar conversas do tenant
  let conversations: Conversation[] = [];
  try {
    conversations = await getConversations(supabase, tenant.id);
  } catch (error) {
    console.error('Error loading conversations:', error);
  }

  return (
    <>
      <Sidebar user={user} />
      <DashboardLayout>
        <DashboardContent initialConversations={conversations} tenantId={tenant.id} />
      </DashboardLayout>
    </>
  );
}