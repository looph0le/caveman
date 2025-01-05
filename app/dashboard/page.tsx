import ExerciseDashboard from '../components/dashboard';
import { authConfig, authMiddleware, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authConfig);
  if(!session){
    redirect("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-start dark">
      <ExerciseDashboard />
    </main>
  );
}
