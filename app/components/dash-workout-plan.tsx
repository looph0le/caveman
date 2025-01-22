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
  return (
    <main className="">
      <Card className="shadow-2xl shadow-blue-500/10 h-full">
        <CardHeader>
          <CardTitle className="tracking-wide text-gray-300">Today's Workout Plan</CardTitle>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
          <Table>
            <TableHeader>
              <TableRow className="uppercase">
                <TableHead>Exercise</TableHead>
                <TableHead>Sets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {typeof todayPlan !== 'undefined' && todayPlan.length > 0 ? todayPlan.map((plan) => (
                <TableRow key={plan.wp_id}>
                  <TableCell className="">{plan.wp_ex_name}</TableCell>
                  <TableCell className="">{plan.wp_sets}</TableCell>
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
    </main>
  );
}
