"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
    { date: "2024-07-01", intrusions: 20 },
    { date: "2024-07-02", intrusions: 35 },
    { date: "2024-07-03", intrusions: 40 },
    { date: "2024-07-04", intrusions: 30 },
    { date: "2024-07-05", intrusions: 50 },
    { date: "2024-07-06", intrusions: 45 },
    { date: "2024-07-07", intrusions: 60 },
];

const chartConfig = {
  intrusions: {
    label: "Intrusions",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function IntrusionTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Intrusion Trends</CardTitle>
        <CardDescription>Overview of events over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -10,
              right: 20,
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
            <Line
              dataKey="intrusions"
              type="monotone"
              stroke="var(--color-intrusions)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
