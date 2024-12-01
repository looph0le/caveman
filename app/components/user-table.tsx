"use client"
import { Weight } from '@prisma/client'
import { deleteWeight } from '../actions/weight-actions'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card'

interface UserTableProps{
  users: Users[]
}

export function UserTable({ users }: UserTableProps) {
  return (
    <Card className="m-2 shadow-xl shadow-blue-500/20">
    <Table className="text-center">
      <TableBody className="text-center py-5">
        {weights.map((weight) => (
          <TableRow key={weight.id}>
            <TableCell className="font-medium">{weight.type}</TableCell>
            <TableCell className="font-medium">{weight.kg}</TableCell>
            <TableCell className="font-medium">{weight.lbs}</TableCell>
            <TableCell className="font-medium">
              <Button
                variant="secondary"
                onClick={async () => {
                  await deleteWeight(weight.id)
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
