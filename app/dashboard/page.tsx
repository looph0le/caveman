import ExerciseDashboard from '../components/dashboard';
import { authConfig, authMiddleware, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashWorkoutPlan from '../components/dash-workout-plan';
import DashStats from '../components/dash-stats';
import { getWorkoutPlanByDay } from '@/app/actions/workoutplan-actions';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getTrackerRecordByUserOfToday } from '../actions/tracker-actions';

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

  const today = new Date();

  const formatDateTime = (date: Date): string => date.toISOString().replace("T", " ").replace("Z", "").slice(0, -1);

  const startOfDay = new Date(today).setHours(0, 0, 0, 0);
  const endOfDay = new Date(today).setHours(23, 59, 59, 999);

  const trackerRecord = await getTrackerRecordByUserOfToday(
    session.user.id,
    formatDateTime(new Date(startOfDay)),
    formatDateTime(new Date(endOfDay))
  );


  const uniqueExercises = new Set(trackerRecord.map(item => item.tr_ex_name));
  const exerciseDone = uniqueExercises.size;

  return (
    <main className="lg:flex items-center justify-center m-3">
      <div className="grid lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2">
          <DashStats todayPlan={todayPlan} tracker={trackerRecord} />
        </div>
        <DashWorkoutPlan todayPlan={todayPlan} />
        <Card className="flex items-center min-h-[300px] shadow-xl shadow-red-500/10 lg:col-span-3">
          <h1 className="mx-auto text-gray-500">Coming Soon...</h1>
        </Card>
      </div>
    </main>
  );
}
