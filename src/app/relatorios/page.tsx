import Sidebar from '@/components/Sidebar';
import DashboardLayout from '@/components/DashboardLayout';
import Header from '@/components/Header';
import { getPageAuthData } from '@/lib/page-auth';

export default async function Relatorios() {
  const { user } = await getPageAuthData();

  return (
    <>
      <Sidebar user={user} />
      <DashboardLayout>
        <Header title="Relatórios" subtitle="Visualize relatórios e estatísticas" />
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Dashboard de métricas e relatórios.</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
