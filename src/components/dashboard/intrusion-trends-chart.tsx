"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

const chartData = [
    { date: "2024-07-01", intrusions: 2 },
    { date: "2024-07-02", intrusions: 1 },
    { date: "2024-07-03", intrusions: 4 },
    { date: "2024-07-04", intrusions: 2 },
    { date: "2024-07-05", intrusions: 5 },
    { date: "2024-07-06", intrusions: 3 },
    { date: "2024-07-07", intrusions: 6 },
    { date: "2024-07-08", intrusions: 4 },
    { date: "2024-07-09", intrusions: 7 },
    { date: "2024-07-10", intrusions: 5 },
    { date: "2024-07-11", intrusions: 8 },
    { date: "2024-07-12", intrusions: 6 },
    { date: "2024-07-13", intrusions: 9 },
    { date: "2024-07-14", intrusions: 7 },
];

const chartConfig = {
  intrusions: {
    label: "Intrusions",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function IntrusionTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          Intrusion Trends
        </CardTitle>
        <CardDescription>Overview of events over the last 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-60 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { day: 'numeric' })}
            />
             <YAxis
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              allowDecimals={false}
              width={30}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="intrusions"
              type="monotone"
              stroke="var(--color-intrusions)"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "hsl(var(--background))",
                stroke: "var(--color-intrusions)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
