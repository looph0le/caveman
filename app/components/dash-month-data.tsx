import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DashMonthData({ monthData }) {

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

  const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

  const emptyDays = Array.from({ length: adjustedFirstDay }, (_, i) => ({
    day: "",
    color: ""
  }));

  monthData.unshift(...emptyDays);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl opacity-90">{currentMonth}'s Consistancy</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 uppercase text-sm text-gray-500">
          {week.map((day, index) => (
            <div
              key={index}
              className="p-1 text-center text-sm font-bold"
            >
              {day}
            </div>
          ))}
          {monthData.map((day, i) => (
            <div
              key={i}
              className={cn('p-1 rounded text-center text-sm', day.color == "green" ? 'border text-green-500' : 'text-white/50')}
            >
              {day.day}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          {/* Maybe show total workout days, summary, etc. */}
        </div>
      </CardFooter>
    </Card >
  );
}
