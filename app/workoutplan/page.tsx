import { authConfig, authMiddleware } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import WorkoutplanCard from '../components/workoutplan';
import { getExercise } from '../actions/exercise-actions';
import { useSession } from 'next-auth/react';
import { getWorkoutplan, getWorkoutPlanByUser } from '../actions/workoutplan-actions';


export default async function Workoutplan() {

  // Redirect if not login
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/");
  }

  const exercises = await getExercise();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-sm">
        <WorkoutplanCard exdata={exercises} />
    </main>
  );
}
