import { authConfig, authMiddleware } from '@/lib/auth';

export default async function Dashboard() {
  await authMiddleware();
  return (
    <main className="flex min-h-screen flex-col items-start dark">
    </main>
  );
}
