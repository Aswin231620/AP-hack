"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { day: "Mon", intrusions: 18 },
  { day: "Tue", intrusions: 21 },
  { day: "Wed", intrusions: 10 },
  { day: "Thu", intrusions: 25 },
  { day: "Fri", intrusions: 12 },
  { day: "Sat", intrusions: 30 },
  { day: "Sun", intrusions: 28 },
]

const chartConfig = {
  intrusions: {
    label: "Intrusions",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function DailyIntrusionsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Intrusions</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              allowDecimals={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="intrusions" fill="var(--color-intrusions)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
