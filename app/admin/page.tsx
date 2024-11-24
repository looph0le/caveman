import ExerciseDashboard from '../components/dashboard';
import { authConfig, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession(authConfig);
  if(session){
    if(session.user.role != 'admin'){
      return redirect('/');
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-start dark">
      <h1>This is admin panel</h1>
    </main>
  );
}
