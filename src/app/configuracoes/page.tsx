import Sidebar from '@/components/Sidebar';
import DashboardLayout from '@/components/DashboardLayout';
import Header from '@/components/Header';
import ConfiguracoesContent from '@/components/ConfiguracoesContent';
import { getPageAuthData } from '@/lib/page-auth';
import { getTenantSettings, getGoogleCalendarId } from '@/lib/services/tenantSettings';

export default async function Configuracoes() {
  const { user, tenant, supabase } = await getPageAuthData();

  const [settings, calendarId] = await Promise.all([
    getTenantSettings(supabase, tenant.id),
    getGoogleCalendarId(supabase, tenant.id),
  ]);

  return (
    <>
      <Sidebar user={user} />
      <DashboardLayout>
        <Header
          title="Configurações"
          subtitle="Ajuste o comportamento da clínica no WhatsApp"
        />
        <ConfiguracoesContent
          initialSettings={settings}
          initialCalendarId={calendarId}
          tenantId={tenant.id}
        />
      </DashboardLayout>
    </>
  );
}
