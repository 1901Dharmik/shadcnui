import { Bar, BarChart } from "recharts"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Filter, MoreHorizontal, Plus } from 'lucide-react'
import { useState } from "react"

export default function Component() {
  const [date, setDate] = useState(new Date())

  const performanceData = [
    { month: "Jan", value: 34 },
    { month: "Feb", value: 67 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 28 },
    { month: "May", value: 80 },
    { month: "Jun", value: 65 },
  ]

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome, Let&apos;s dive into your personalized setup guide.</p>
        </div>
        <Button className="bg-teal-800 hover:bg-teal-900">
          <Plus className="mr-2 h-4 w-4" />
          Create campaigns
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Performance Over Time</CardTitle>
            <p className="text-sm text-muted-foreground">29 Sept, 2024</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Delivered</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">42,642.1</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">+0.02%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Opened</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">26,843</p>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">+0.02%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Clicked</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">525,753</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">+0.02%</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Subscribe</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">425</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">+0.02%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Campaign Performance</CardTitle>
              <p className="text-sm text-muted-foreground">29 Sept, 2024</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-3xl font-bold">$24,747.01</p>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-900">
                +12% vs last month
              </div>
            </div>
            <ChartContainer className="h-[200px] mt-4">
              <BarChart data={performanceData}>
                <Bar
                  dataKey="value"
                  style={{
                    fill: "var(--chart-1)",
                    opacity: 0.9,
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-4">
              <div className="bg-yellow-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Element of Design Test</p>
                    <p className="text-sm text-muted-foreground">10:00 - 11:00 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Design Principle Test</p>
                    <p className="text-sm text-muted-foreground">10:00 - 11:00 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}