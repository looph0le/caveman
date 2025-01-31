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
  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  const startOfDayFormatted = formatDateTime(startOfDay);
  const endOfDayFormatted = formatDateTime(endOfDay);
  const trackerRecord = await getTrackerRecordByUserOfToday(session.user.id, startOfDayFormatted, endOfDayFormatted);


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
