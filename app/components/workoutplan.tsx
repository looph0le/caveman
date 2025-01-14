"use client"

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
import { createWorkoutplan, deleteWorkoutplan, getWorkoutPlanByUser } from '../actions/workoutplan-actions';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from "react"


const days = [
  { mon: "Monday" },
  { tue: "Tuesday" },
  { wed: "Wednesday" },
  { thu: "Thursday" },
  { fri: "Friday" },
  { sat: "Saturday" },
  { sun: "Sunday" }
];

export default function WorkoutplanCard({ exdata }) {
  const [exName, setExName] = useState('')
  const [set, setSet] = useState('')
  const [day, setDay] = useState('')
  const [plan, setPlan] = useState();

  const session = useSession()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (session.data) {
      await createWorkoutplan(session.data.user.id, day, exName, Number(set))
      location.reload();
    }
  }

  const getUserPlan = async () => {
    if (session.data) {
      const userPlans = await getWorkoutPlanByUser(session.data.user.id);
      return userPlans;
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      const userPlan = await getUserPlan(); // Wait for the promise to resolve
      setPlan(userPlan); // Update state with the resolved data
    };

    fetchPlan(); // Call the async function inside useEffect
  }, [session?.data]); // Dependency to re-run when session.data changes


  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-sm">
      <div className="grid my-[150px] gap-3 m-4 md:grid-cols-2 lg:grid-cols-4 items-center justify-center">
        {days.map((day) => {
          const [small, full] = Object.entries(day)[0];
          return (
            <Card key={small} className="shadow-xl shadow-blue-500/10">
              <CardHeader>
                <CardTitle className="uppercase tracking-wide">{full}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} onChange={(e) => setDay(small)}>
                  <div className="grid grid-cols-3 w-full items-center gap-4">
                    <div className="flex flex-col col-span-2">
                      <Select onValueChange={(e) => setExName(e)}>
                        <SelectTrigger id="Exercise">
                          <SelectValue placeholder="Select Exercise" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectGroup>
                            <SelectLabel>Exercises</SelectLabel>
                            {typeof exdata !== 'undefined' ? exdata.map((ex) => (
                              <SelectItem id={ex.id} key={ex.id} value={ex.name}>{ex.name}</SelectItem>
                            )) :
                              <SelectItem key="Empty" value="Empty">Empty</SelectItem>
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Sets"
                          onChange={(e) => setSet(e.target.value)}
                        ></Input>
                      </div>
                    </div>
                    <Button variant="secondary" className="" type="submit">+ Add</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Table>
                  <TableHeader>
                    <TableRow className="uppercase">
                      <TableHead>Exercise</TableHead>
                      <TableHead>Sets</TableHead>
                      <TableHead></TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {typeof plan !== 'undefined' ? plan.filter((plan) => plan.wp_day === small).map((plan) => (
                        <TableRow key={plan.wp_id}>
                          <TableCell className="">{plan.wp_ex_name}</TableCell>
                          <TableCell className="">{plan.wp_sets}</TableCell>
                          <TableCell className="font-bold text-red-500 text-right"
                          ><Button
                            onClick={async () => {
                              await deleteWorkoutplan(plan.wp_id)
                              location.reload()
                            }}
                          >Delete</Button></TableCell>
                        </TableRow>
                      )) :
                      <TableRow>
                        <TableCell className="text-gray-500">Empty</TableCell>
                        <TableCell className="text-gray-500">Empty</TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
