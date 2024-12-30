import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from '@/components/ui/card'

export function UsersTable(props) {
  return (
    <Card className="m-2 shadow-xl shadow-blue-500/20 text-sm">
      <Table className="text-left">
        <TableHeader className="font-bold shadow-xl shadow-green-300/10 uppercase">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            {/*
            <TableHead>Action</TableHead>
            */}
          </TableRow>
        </TableHeader>
        <TableBody className="py-5">
          {props.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              {/*
              <TableCell>
                <Button variant="outline" className="shadow-xl shadow-rose-500/10">Delete</Button>
              </TableCell>
              */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
