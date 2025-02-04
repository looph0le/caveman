"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";

export default function DashStats({ todayPlan, tracker }) {

  const totalSets = todayPlan.reduce((sum, item) => sum + item.wp_sets, 0);

  const uniqueExercises = new Set(tracker.map(item => item.tr_ex_name));
  const exerciseDone = uniqueExercises.size;

  const firstTime = new Date(tracker[0] ? tracker[0].tr_created_at : '').getTime();
  const lastTime = new Date(tracker[tracker.lenght - 1] ? tracker[tracker.length - 1].tr_created_at : '').getTime();

  const diffMs = lastTime - firstTime; // Convert Date objects to timestamps (milliseconds)

  const diffSeconds = Math.floor((diffMs / 1000) % 60);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const d = new Date();

  type WorkoutData = {
    tr_ex_name: string;
    tr_set: number;
    tr_rep: number;
    tr_weight: number;
    tr_created_at: string;
  };

  type ProcessedData = {
    ex_name: string;
    total_sets: number;
    total_reps: number;
    total_weight: number;
    duration: string;
  };

  function processWorkoutData(tracker: WorkoutData[]): ProcessedData[] {
    const exerciseMap: Record<string, ProcessedData> = {};

    tracker.forEach((entry) => {
      const { tr_ex_name, tr_set, tr_rep, tr_weight, tr_created_at } = entry;

      if (!exerciseMap[tr_ex_name]) {
        exerciseMap[tr_ex_name] = {
          ex_name: tr_ex_name,
          total_sets: 0,
          total_reps: 0,
          total_weight: 0,
          duration: "00:00:00",
        };
      }

      exerciseMap[tr_ex_name].total_sets += 1;
      exerciseMap[tr_ex_name].total_reps += tr_rep;
      exerciseMap[tr_ex_name].total_weight += tr_weight;
    });

    // Calculate duration for each exercise
    Object.keys(exerciseMap).forEach((exercise) => {
      const filteredEntries = tracker
        .filter((entry) => entry.tr_ex_name === exercise)
        .sort((a, b) => new Date(a.tr_created_at).getTime() - new Date(b.tr_created_at).getTime());

      if (filteredEntries.length > 1) {
        const startTime = new Date(filteredEntries[0].tr_created_at);
        const endTime = new Date(filteredEntries[filteredEntries.length - 1].tr_created_at);
        exerciseMap[exercise].duration = getDuration(startTime, endTime);
      }
    });

    return Object.values(exerciseMap);
  }

  // Helper function to calculate duration in HH:mm:ss format
  function getDuration(startTime: Date, endTime: Date): string {
    const diffMs = endTime.getTime() - startTime.getTime(); // Difference in milliseconds
    const diffSeconds = Math.floor((diffMs / 1000) % 60);
    const diffMinutes = Math.floor((diffMs / 1000 / 60) % 60);
    const diffHours = Math.floor(diffMs / 1000 / 60 / 60);

    return `${String(diffHours).padStart(2, "0")}:${String(diffMinutes).padStart(2, "0")}:${String(diffSeconds).padStart(2, "0")}`;
  }

  let totalWorkoutDuration = "00:00:00";
  if (tracker && tracker[0] && tracker[tracker.length - 1]) {
    totalWorkoutDuration = getDuration(new Date(tracker[0].tr_created_at), new Date(tracker[tracker.length - 1].tr_created_at));
  }

  const dataTable = processWorkoutData(tracker);

  return (
    <main className="">
      <Card className="shadow-2xl shadow-blue-500/10 h-full">
        <CardHeader className="m-2">
          <CardTitle className="tracking-wide text-gray-300">Today's Analytics</CardTitle>
          <h1 className="uppercase italic font-bold text-center text-xl text-gray-200 animate-pulse">{days[d.getDay()]}</h1>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8 uppercase font-bold italic p-2">
            <div className="text-center">
              <h1>Duration</h1>
              <p className={cn("lowercase", totalWorkoutDuration != "00:00:00" ? "text-green-500" : "text-rose-500")}>{totalWorkoutDuration}</p>
            </div>
            <div className="text-center">
              <h1>Exercises</h1>
              <p className={cn(exerciseDone == todayPlan.length && todayPlan.length > 0 ? "text-green-500" : "text-rose-500")} >{exerciseDone} / {todayPlan.length}</p>
            </div>
            <div className="text-center">
              <h1>Sets</h1>
              <p className={cn(tracker.length == totalSets && totalSets > 0 ? "text-green-500" : "text-rose-500")}>{tracker.length} / {totalSets}</p>
            </div>
          </div>
          <Table className="">
            <TableHeader className="uppercase italic text-[12px]">
              <TableHead>Exercise</TableHead>
              <TableHead>Sets</TableHead>
              <TableHead className="text-right">Reps</TableHead>
              <TableHead className="text-right">Avg.Reps</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableHeader>
            <TableBody>
              {dataTable.length > 0 ? dataTable.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.ex_name}</TableCell>
                  <TableCell>{item.total_sets}</TableCell>
                  <TableCell className="text-right">{item.total_reps}</TableCell>
                  <TableCell className="text-right">{(item.total_reps / item.total_sets).toFixed(1)}</TableCell>
                  <TableCell className="text-right">{item.duration}</TableCell>
                </TableRow>
              )) : <TableRow><TableCell colSpan={5} className="text-center text-gray-500">Seems like a rest day...</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </main >
  );
}
