import Sidebar from '@/components/Sidebar';
import DashboardLayout from '@/components/DashboardLayout';
import Header from '@/components/Header';
import { getPageAuthData } from '@/lib/page-auth';

export default async function Configuracoes() {
  const { user } = await getPageAuthData();

  return (
    <>
      <Sidebar user={user} />
      <DashboardLayout>
        <Header title="Configurações" subtitle="Configure o sistema e preferências" />
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Ajuste as configurações do sistema.</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
