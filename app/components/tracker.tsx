"use client"

import { toast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"
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
import { FaCheck } from "react-icons/fa6";
import { createTrackerRecord } from "../actions/tracker-actions"
import { getSession, useSession } from "next-auth/react"
import { useEffect } from "react"


export default function Tracker({ set, exercise, dbdata }) {
  const [range, setRange] = useState(0)
  const [repRange, setRepRange] = useState(0)
  const [checked, setChecked] = useState(false)

  const session = useSession();

  useEffect(() => {
    if (dbdata && dbdata.tr_weight && dbdata.tr_rep) {
      setRange(dbdata.tr_weight)
      setRepRange(dbdata.tr_rep)
      setChecked(true || false)
    }
  }, [dbdata]);


  return (
    <div className={cn("grid grid-cols-6 gap-3 m-[20px]", checked == true ? "opacity-50" : "opacity-100")}>
      <div className="uppercase my-auto text-sm font-bold opacity-50">set {set}</div>
      <div className="col-span-4 grid gap-2">
        <div className="grid grid-cols-3">
          <Input
            type="range"
            min="0"
            max="80"
            step="2.5"
            value={range}
            onChange={(e) => setRange(parseFloat(e.target.value))}
            disabled={checked}
            className="appearance-none bg-black h-[1px] rounded-lg outline-none w-full accent-white col-span-2"
          />
          <div className="mx-auto"><h1>{range} kgs</h1></div>
        </div>
        <div className="grid grid-cols-3">
          <Input
            type="range"
            min="0"
            max="30"
            step="1"
            value={repRange}
            onChange={(e) => setRepRange(parseFloat(e.target.value))}
            disabled={checked}
            className="appearance-none bg-black h-[1px] rounded-lg outline-none w-full accent-white col-span-2"
          />
          <div className="mx-auto"><h1>{repRange} Reps</h1></div>
        </div>
      </div>
      <div className="text-xl text-center my-auto">
        <AlertDialog>
          <AlertDialogTrigger disabled={repRange > 0 && range > 0 && checked != true ? false : true}>
            <FaCheck className={cn(repRange > 0 && range > 0 ? "text-green-500" : "")} />
          </AlertDialogTrigger>
          <AlertDialogContent className="shadow-2xl shadow-green-500/50">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to record the set?</AlertDialogTitle>
              <AlertDialogDescription>
                <Table className="text-left">
                  <TableHeader className="font-bold uppercase">
                    <TableHead>Exercise</TableHead>
                    <TableHead>Set</TableHead>
                    <TableHead>Rep</TableHead>
                    <TableHead>Kgs</TableHead>
                  </TableHeader>
                  <TableBody className="text-green-500">
                    <TableRow>
                      <TableCell>{exercise}</TableCell>
                      <TableCell>{set}</TableCell>
                      <TableCell>{repRange}</TableCell>
                      <TableCell>{range}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  try {
                    if (session.data?.user?.id) {
                      await createTrackerRecord(
                        session.data.user.id,
                        exercise,
                        set,
                        repRange,
                        range
                      )
                      setChecked(true)
                      toast({
                        title: (<div className="text-green-500">Set recorded successfully</div>) as unknown as string,
                        description: (
                          <Table className="uppercase w-full">
                            <TableHeader className="font-bold uppercase">
                              <TableHead>Exercise</TableHead>
                              <TableHead>Set</TableHead>
                              <TableHead>Rep</TableHead>
                              <TableHead>Kgs</TableHead>
                            </TableHeader>
                            <TableBody className="">
                              <TableRow>
                                <TableCell>{exercise}</TableCell>
                                <TableCell>{set}</TableCell>
                                <TableCell>{repRange}</TableCell>
                                <TableCell>{range}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        ),
                      })
                    }
                  } catch (e) {
                    console.error(e)
                  }
                }}
              >Yes</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
