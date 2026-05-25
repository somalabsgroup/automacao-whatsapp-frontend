import Sidebar from '@/components/Sidebar';
import DashboardLayout from '@/components/DashboardLayout';
import ProfessionalsContent from '@/components/ProfessionalsContent';
import { getProfessionals } from '@/lib/services/professionals';
import { getPageAuthData } from '@/lib/page-auth';

export default async function Profissionais() {
  const { user, tenant, supabase } = await getPageAuthData();

  // Busca profissionais da clínica
  const professionals = await getProfessionals(supabase, tenant.id, false);

  return (
    <>
      <Sidebar user={user} />
      <DashboardLayout>
        <ProfessionalsContent initialProfessionals={professionals} tenantId={tenant.id} />
      </DashboardLayout>
    </>
  );
}
