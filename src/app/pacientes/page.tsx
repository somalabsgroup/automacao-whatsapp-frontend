import Sidebar from '@/components/Sidebar';
import DashboardLayout from '@/components/DashboardLayout';
import Header from '@/components/Header';
import { getPageAuthData } from '@/lib/page-auth';

export default async function Pacientes() {
  const { user } = await getPageAuthData();

  return (
    <>
      <Sidebar user={user} />
      <DashboardLayout>
        <Header title="Pacientes" subtitle="Gerencie o cadastro de pacientes" />
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Lista de pacientes cadastrados.</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
