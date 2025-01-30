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
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type WorkoutPlan = {
  wp_id: number;
  wp_user_id: string;
  wp_day: string;
  wp_ex_name: string;
  wp_sets: number;
  wp_created_at: Date;
};

const FormSchema = z.object({
  exercise: z.string({
    required_error: "Please select a Exercise.",
  }),
  day: z.string({
    required_error: "Please select day.",
  }),
  sets: z.number({
    required_error: "Please select number of sets.",
  }),
})

const daysWithSmall = {
  monday: "mon",
  tuesday: "tue",
  wednesday: "wed",
  thursday: "thu",
  friday: "fri",
  saturday: "sat",
  sunday: "sun",
};

const daysWithFull = {
  mon: "monday",
  tue: "tuesday",
  wed: "wednesday",
  thu: "thursday",
  fri: "friday",
  sat: "saturday",
  sun: "sunday",
};

export default function WorkoutplanCard({ exdata, day, plan }) {
  const [selectedSets, setSelectedSets] = useState(1);
  const session = useSession()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (session.data) {
        await createWorkoutplan(session.data.user.id, data.day, data.exercise, data.sets)
        toast({
          title: (<div className="text-green-500">Exercise added to the plan</div>) as unknown as string,
          description: (
            <Table className="uppercase">
              <TableBody className="">
                <TableRow>
                  <TableCell>{daysWithFull[data.day]}</TableCell>
                  <TableCell>{data.exercise}</TableCell>
                  <TableCell>{data.sets}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
        })
      }
    } catch (error) {
      toast({
        title: (<div className="text-rose-500">Something went wrong while adding the exercise to the plan.</div>) as unknown as string,
        description: (
          <div>{error.message}</div>
        ),
      })
    }
  }

  return (
    <Card className="shadow-2xl shadow-blue-500/10 min-h-[600px] min-w-[350px]">
      <CardHeader>
        <CardTitle className="uppercase tracking-wide">{day}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="exercise"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Exercises</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? exdata.find(
                              (ex) => ex.name === field.value
                            )?.name
                            : "Select an exercise"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search exercise..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No exercise found.</CommandEmpty>
                          <CommandGroup>
                            {exdata.map((ex) => (
                              <CommandItem
                                value={ex.name}
                                key={ex.id}
                                onSelect={() => {
                                  form.setValue("exercise", ex.name)
                                  form.setValue("day", daysWithSmall[day])
                                }}
                              >
                                {ex.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    ex.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormLabel className="py-3 flex">Number of sets <div className={cn("mx-2", selectedSets >= 6 ? "text-rose-500" : "text-green-500")}>{selectedSets}</div></FormLabel>
                  <Input type="range" id="number" name="number" min="1" max="12" step="1"
                    value={selectedSets}
                    onChange={(e) => {
                      setSelectedSets(Number(e.target.value))
                      form.setValue("sets", Number(e.target.value))
                    }}
                    className="w-full appearance-none bg-black h-[1px] rounded-lg outline-none accent-white"
                  ></Input>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="secondary" >Add</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Table>
          <TableHeader>
            <TableRow className="uppercase">
              <TableHead>Exercise</TableHead>
              <TableHead>Sets</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {typeof plan !== 'undefined' ? plan.filter((plan) => plan.wp_day === daysWithSmall[day]).map((plan) => (
              <TableRow key={plan.wp_id}>
                <TableCell className="">{plan.wp_ex_name}</TableCell>
                <TableCell className="">{plan.wp_sets}</TableCell>
                <TableCell className="font-bold text-rose-500 text-right text-xl">
                  <AlertDialog>
                    <AlertDialogTrigger><MdOutlineDeleteOutline /></AlertDialogTrigger>
                    <AlertDialogContent className="shadow-2xl shadow-rose-500/50">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to remove {plan.wp_ex_name} from the plan?</AlertDialogTitle>
                        <AlertDialogDescription>
                          {plan.wp_ex_name} exercise will be removed from the plan, This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            await deleteWorkoutplan(plan.wp_id)
                            toast({
                              title: (<div className="text-rose-500">Exercise removed from the plan</div>) as unknown as string,
                              description: (
                                <Table className="uppercase">
                                  <TableBody className="">
                                    <TableRow>
                                      <TableCell>{plan.wp_day}</TableCell>
                                      <TableCell>{plan.wp_ex_name}</TableCell>
                                      <TableCell>{plan.wp_sets}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              ),
                            })
                          }}
                        >Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
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
}
