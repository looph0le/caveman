import Nav from './components/nav'
import ExerciseDashboard from './components/dashboard';

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-start dark">
      <ExerciseDashboard />
    </main>
  );
}
