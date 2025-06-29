import ExerciseDashboard from '../components/dashboard';
import { authConfig, authMiddleware, loginIsRequiredServer } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashWorkoutPlan from '../components/dash-workout-plan';
import DashStats from '../components/dash-stats';
import { DashChart } from '../components/dash-week-chart';
import { getWorkoutPlanByDay } from '@/app/actions/workoutplan-actions';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getTrackerRecordByUserOfToday } from '../actions/tracker-actions';
import { getWeeklyComparisonChartData } from '../actions/tracker-actions';

import {GoogleGenAI} from "@google/genai";

export default async function Dashboard() {
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/");
  }

  const ai = new GoogleGenAI({});
  const aiResponse = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: "Give new motivational quote for gym, make them 2 liner, response with only 1 quote each time. use name of client" + session.user.name + " in the quote.",
    config: {
      temperature: 0.7,
      systemInstruction: "You are a fitness coach and you are giving motivational quotes to your client.",
    }
  });

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

  const comparsion = await getWeeklyComparisonChartData(session.user.id);

  return (
    <main className="lg:flex items-center justify-center m-3">
      <div className="grid lg:grid-cols-3 gap-3">
        <div className="text-lg max-w-[300px] mx-auto animate-pulse my-auto italic text-cyan-500">
          {aiResponse.text}
        </div>
        <div className="lg:col-span-2">
          <DashStats todayPlan={todayPlan} tracker={trackerRecord} />
        </div>
        <DashWorkoutPlan todayPlan={todayPlan} />
        <div className="lg:col-span-2">
          <DashChart comparison={comparsion} />
        </div>
      </div>
    </main>
  );
}
