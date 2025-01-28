import ExerciseDashboard from '../components/dashboard';
import { authConfig, authMiddleware, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashWorkoutPlan from '../components/dash-workout-plan';
import { getWorkoutPlanByDay } from '@/app/actions/workoutplan-actions';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Dashboard() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/");
  }

  // Get Today's workout plan
  const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const d = new Date();
  let day = weekday[d.getDay()];
  const todayPlan = await getWorkoutPlanByDay(session.user.id, day);

  return (
    <main className="lg:flex items-center justify-center m-3">
      <div className="grid lg:grid-cols-3 gap-3">
        <DashWorkoutPlan todayPlan={todayPlan} />
        <Card className="flex items-center min-h-[300px] shadow-xl shadow-red-500/10 lg:col-span-2">
          <h1 className="mx-auto text-gray-500">Coming Soon...</h1>
        </Card>
        <Card className="flex items-center min-h-[300px] shadow-xl shadow-red-500/10 lg:col-span-3">
          <h1 className="mx-auto text-gray-500">Coming Soon...</h1>
        </Card>
      </div>
    </main>
  );
}
