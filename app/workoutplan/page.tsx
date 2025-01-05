import { authConfig, authMiddleware } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select"

import { getExercise } from '../actions/exercise-actions';
import { SelectGroup } from '@radix-ui/react-select';


const days = [
  { mon: "Monday" },
  { tue: "Tuesday" },
  { wed: "Wednesday" },
  { thu: "Thursday" },
  { fri: "Friday" },
  { sat: "Saturday" },
  { sun: "Sunday" }
];

export default async function Workoutplan() {

  // Redirect if not login
  const session = await getServerSession(authConfig);
  if (!session) {
    redirect("/");
  }

  const exercises = await getExercise();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-sm">
      <div className="grid my-[150px] lg:grid-cols-2 gap-3">
        {days.map((day) => {
          const [small, full] = Object.entries(day)[0];
          return (
            <Card key={small} className="m-1 p-1 md:w-[600px] shadow-xl shadow-green-500/10">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide">{full}</CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid grid-cols-3 w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Select>
                        <SelectTrigger id="Exercise">
                          <SelectValue placeholder="Select Exercise" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            <SelectLabel>Exercises</SelectLabel>
                            {exercises.map((ex) => (
                              <SelectItem key={ex.id} value={ex.name}>{ex.name}</SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Sets"
                        ></Input>
                      </div>
                    </div>
                    <Button variant="secondary">Add</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
