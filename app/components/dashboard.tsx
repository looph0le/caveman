"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data for weekly workout duration
const weeklyWorkoutData = [
  { week: "Week 1", duration: 180 },
  { week: "Week 2", duration: 210 },
  { week: "Week 3", duration: 240 },
  { week: "Week 4", duration: 200 },
  { week: "Week 5", duration: 270 },
  { week: "Week 6", duration: 300 },
  { week: "Week 7", duration: 100 },
  { week: "Week 8", duration: 156 },
  { week: "Week 9", duration: 400 },
  { week: "Week 10", duration: 359 },
  { week: "Week 11", duration: 300 },
]

// Sample data for exercise progress
const exerciseProgressData = [
  { date: "2023-01-01", "Push-ups": 20, "Squats": 15, "Plank": 30 },
  { date: "2023-01-08", "Push-ups": 22, "Squats": 18, "Plank": 35 },
  { date: "2023-01-15", "Push-ups": 25, "Squats": 20, "Plank": 40 },
  { date: "2023-01-22", "Push-ups": 28, "Squats": 22, "Plank": 45 },
  { date: "2023-01-29", "Push-ups": 30, "Squats": 25, "Plank": 50 },
  { date: "2023-02-05", "Push-ups": 33, "Squats": 28, "Plank": 55 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <p className="text-sm font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ExerciseDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-6 mt-[75px] text-[10px] md:text-[14px]">
      <div className="grid md:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Workout Duration</CardTitle>
            <CardDescription>Total exercise time per week (in minutes)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyWorkoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis/>
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="duration" fill="hsl(var(--primary))" radius={5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exercise Progress</CardTitle>
            <CardDescription>Number of repetitions/duration over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exerciseProgressData}>
                  <CartesianGrid strokeDasharray="1 0 0 1" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="Push-ups" stroke="hsl(var(--primary))" />
                  <Line type="monotone" dataKey="Squats" stroke="hsl(var(--secondary))" />
                  <Line type="monotone" dataKey="Plank" stroke="hsl(var(--accent))" />
                  <Line type="monotone" dataKey="Deadlift" stroke="hsl(var(--accent))" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
