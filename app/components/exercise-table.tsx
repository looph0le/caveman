"use client"
import { Exercise } from '@prisma/client'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card'
import { deleteExercise } from '../actions/exercise-actions'
import { cn } from '@/lib/utils'

interface ExerciseTableProps {
  exercise: Exercise[]
}


export function ExerciseTable({ exercise }: ExerciseTableProps) {
  return (
    <Card className="m-2 p-2 shadow-xl shadow-blue-500/20">
      <Table className="">
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead>Id</TableHead>
            <TableHead>Exercise Name</TableHead>
            <TableHead>Exercise Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="py-5">
          {exercise.map((exercise) => (
            <TableRow key={exercise.id}>
              <TableCell className="font-medium text-gray-500">{exercise.id}</TableCell>
              <TableCell className="font-medium">{exercise.name}</TableCell>
              <TableCell className={cn("font-medium", exercise.type == 'CARDIO' ? "text-white" : '', exercise.type == 'CALISTHENICS' ? "text-yellow-300" : "", exercise.type == 'STRENGTH' ? "text-green-500" : "")}>{exercise.type}</TableCell>
              <TableCell className="font-medium text-right">
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await deleteExercise(exercise.id)
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
