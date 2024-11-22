import ExerciseDashboard from '../components/dashboard';
import { loginIsRequiredServer } from '@/lib/auth';

export default async function Dashboard() {
  await loginIsRequiredServer();
  return (
    <main className="flex min-h-screen flex-col items-start dark">
      <ExerciseDashboard />
    </main>
  );
}
