import { authConfig, authMiddleware } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import Tracker from '../components/tracker';
import { getWorkoutPlanByDay } from '../actions/workoutplan-actions';
import { getTrackerRecordByUserOfToday } from '../actions/tracker-actions';


export default async function Trackerpage() {

  // Redirect if not login
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/");
  }

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  // Get Today's workout plan
  const weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const d = new Date();
  let day = weekday[d.getDay()];

  const todayPlan = await getWorkoutPlanByDay(session.user.id, day);
  const totalExercises = todayPlan.length;

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
    <div className="flex flex-col items-center justify-center text-sm">
      <div className="text-3xl font-bold uppercase italic opacity-50">
        <div>
          {days[d.getDay()]}
        </div>
      </div>
      <div className="text-center my-[25px] text-rose-500/90 text-xl">
        {exerciseDone} / {totalExercises}
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 m-5 gap-4">
        {todayPlan.map((workout, workoutIndex) => (
          <div key={workoutIndex} className="border p-3 rounded-2xl">
            <div className="font-bold">{workout.wp_ex_name}</div>
            {Array.from({ length: workout.wp_sets }).map((_, setIndex) => (
              <Tracker
                key={`${workoutIndex}-${setIndex}`}
                set={setIndex + 1}
                exercise={workout.wp_ex_name}
                dbdata={trackerRecord.find((record) => record.tr_ex_name === workout.wp_ex_name && record.tr_set === setIndex + 1) || null}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
