import { authConfig, authMiddleware } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import WorkoutplanCard from '../components/workoutplan';
import { getExercise } from '../actions/exercise-actions';
import { getWorkoutPlanByUser } from '../actions/workoutplan-actions';


export default async function Workoutplan() {

  // Redirect if not login
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/");
  }

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const smallDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const exercises = await getExercise();
  const userPlan = await getWorkoutPlanByUser(session.user.id);

  return (
    <div className="flex flex-col items-center justify-center text-sm">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 m-5 gap-3">
        {days.map((day, index) => (
          < WorkoutplanCard key={index} day={day} exdata={exercises} plan={userPlan[smallDay[index]]} />
        ))}
      </div>
    </div>
  );
}
