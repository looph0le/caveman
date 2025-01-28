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


  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  const exercises = await getExercise();

  return (
    <div className="flex flex-col items-center justify-center text-sm">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 m-5 gap-3">
        {days.map((day, index) => (
          < WorkoutplanCard key={index} day={day} exdata={exercises} />
        ))}
      </div>
    </div>
  );
}
