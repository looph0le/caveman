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

export default function DashWorkoutPlan({ todayPlan }) {

  const totalSets = todayPlan.reduce((sum, item) => sum + item.wp_sets, 0);

  return (
    <main className="">
      <Card className="shadow-2xl shadow-blue-500/10 h-full">
        <CardHeader>
          <CardTitle className="tracking-wide text-gray-300">Today's Workout Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="uppercase">
                <TableHead>~</TableHead>
                <TableHead>Exercise</TableHead>
                <TableHead className="text-right">Sets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {typeof todayPlan !== 'undefined' && todayPlan.length > 0 ? todayPlan.map((plan, index) => (
                <TableRow key={plan.wp_id}>
                  <TableCell className="">{index + 1}</TableCell>
                  <TableCell className="">{plan.wp_ex_name}</TableCell>
                  <TableCell className="text-right">{plan.wp_sets}</TableCell>
                </TableRow>
              )) :
                <TableRow>
                  <TableCell className="text-gray-500"></TableCell>
                  <TableCell className="text-gray-500">Empty</TableCell>
                  <TableCell className="text-gray-500">Empty</TableCell>
                </TableRow>
              }
            </TableBody>
            <TableFooter>
              <TableRow className="uppercase text-right">
                <TableCell></TableCell>
                <TableCell className="text-[12px] mt-4">Total Sets / Total Exercises</TableCell>
                <TableCell className="text-green-500">{totalSets} / {todayPlan.length}</TableCell>
                <TableCell className=""></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </main>
  );
}
