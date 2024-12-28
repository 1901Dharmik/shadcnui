
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "../ui/chart"
import { Pie, PieChart, CartesianGrid, XAxis, Bar, BarChart, Line, LineChart, Area, AreaChart } from "recharts"

export default function New2Chart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Pie Chart</CardTitle>
          <CardDescription>A pie chart showing the distribution of sales by product category.</CardDescription>
        </CardHeader>
        <CardContent>
          <PiechartcustomChart className="aspect-square" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>A bar chart comparing the performance of different sales regions.</CardDescription>
        </CardHeader>
        <CardContent>
          <BarchartChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription>A line chart tracking the stock price of a company over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <LinechartChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>An area chart visualizing the growth in user signups over the past year.</CardDescription>
        </CardHeader>
        <CardContent>
          <AreachartChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Multi-Series Pie Chart</CardTitle>
          <CardDescription>
            A pie chart with multiple series showing the market share of different brands.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PiechartcustomChart className="aspect-square" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Stacked Bar Chart</CardTitle>
          <CardDescription>
            A stacked bar chart comparing the sales performance of different product lines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AreachartstackedChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Grouped Bar Chart</CardTitle>
          <CardDescription>
            A grouped bar chart analyzing the revenue and expenses of a company over time.
          </CardDescription>
        </CardHeader>
        <CardContent >
          <BarchartChart 
          className="aspect-[4/3] " 
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Spline Chart</CardTitle>
          <CardDescription>
            A spline chart tracking the temperature changes in a city throughout the year.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinechartChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Donut Chart</CardTitle>
          <CardDescription>A donut chart visualizing the distribution of website traffic sources.</CardDescription>
        </CardHeader>
        <CardContent>
          <PiechartChart className="aspect-square" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Combo Chart</CardTitle>
          <CardDescription>
            A combo chart combining a line chart and a bar chart to show sales and profit trends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AreachartChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
    </div>
  )
}

function AreachartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px] max-w-[350px]"
      >
        <AreaChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}


function AreachartstackedChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
          mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="min-h-[300px] max-w-[350px]"
      >
        <AreaChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186, mobile: 80 },
            { month: "February", desktop: 305, mobile: 200 },
            { month: "March", desktop: 237, mobile: 120 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "May", desktop: 209, mobile: 130 },
            { month: "June", desktop: 214, mobile: 140 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Area
            dataKey="mobile"
            type="natural"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}


function BarchartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px] max-w-[350px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}


function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}


function PiechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          visitors: {
            label: "Visitors",
          },
          chrome: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "Firefox",
            color: "hsl(var(--chart-3))",
          },
          edge: {
            label: "Edge",
            color: "hsl(var(--chart-4))",
          },
          other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
          },
        }}
        className="mx-auto aspect-square max-h-[250px] max-w-[350px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={[
              { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
              { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
              { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
              { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
              { browser: "other", visitors: 90, fill: "var(--color-other)" },
            ]}
            dataKey="visitors"
            nameKey="browser"
            innerRadius={60}
          />
        </PieChart>
      </ChartContainer>
    </div>
  )
}


function PiechartcustomChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          visitors: {
            label: "Visitors",
          },
          chrome: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "Firefox",
            color: "hsl(var(--chart-3))",
          },
          edge: {
            label: "Edge",
            color: "hsl(var(--chart-4))",
          },
          other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
          },
        }}
        className="mx-auto aspect-square max-h-[250px] max-w-[350px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={[
              { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
              { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
              { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
              { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
              { browser: "other", visitors: 90, fill: "var(--color-other)" },
            ]}
            dataKey="visitors"
            nameKey="browser"
          />
        </PieChart>
      </ChartContainer>
    </div>
  )
}