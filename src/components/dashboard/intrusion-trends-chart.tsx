"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { subDays, format } from 'date-fns';

// Generate dynamic data for the last 14 days
const generateLast14DaysData = () => {
  const today = new Date();
  return Array.from({ length: 14 }).map((_, i) => {
    const date = subDays(today, 13 - i);
    return {
      date: format(date, 'yyyy-MM-dd'),
      intrusions: Math.floor(Math.random() * 10), // Keep random data for now
    };
  });
};

const chartData = generateLast14DaysData();


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
