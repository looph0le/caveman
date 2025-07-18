"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function DashChart({ comparison }) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl opacity-90">Week Consistancy</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={comparison}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              className="uppercase font-bold"
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="duration"
              type="step"
              fill="var(--color-mobile)"
              fillOpacity={0.3}
              stroke="var(--color-mobile)"
              stackId="a"
              className="uppercase font-bold"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent >
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
        </div>
      </CardFooter>
    </Card >
  )
}
