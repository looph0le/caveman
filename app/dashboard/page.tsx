import ExerciseDashboard from '../components/dashboard';
import { authConfig, authMiddleware, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-start dark">
      <ExerciseDashboard />
    </main>
  );
}
