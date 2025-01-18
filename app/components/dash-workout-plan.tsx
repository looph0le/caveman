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
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DashWorkoutPlan({todayPlan}) {
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
