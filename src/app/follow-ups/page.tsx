import Sidebar from '@/components/Sidebar';
import DashboardLayout from '@/components/DashboardLayout';
import Header from '@/components/Header';
import { getPageAuthData } from '@/lib/page-auth';

export default async function FollowUps() {
  const { user } = await getPageAuthData();

  return (
    <>
      <Sidebar user={user} />
      <DashboardLayout>
        <Header title="Follow-ups" subtitle="Acompanhe os follow-ups agendados" />
        <div className="p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">Gerencie seus follow-ups.</p>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
