// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { TrendingUp } from "lucide-react";

// export default function OrdersByMonthAndYear() {
//   const chartData2 = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
//   ];
//   const chartConfig = {
//     desktop: {
//       label: "Desktop",
//       color: "hsl(var(--chart-1))",
//     },
//     mobile: {
//       label: "Mobile",
//       color: "hsl(var(--chart-2))",
//     },
//   };
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Bar Chart - Multiple</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={chartData2}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="dashed" />}
//             />
//             <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
//             <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyDataCharts() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${base_url}user/monthly-summary/${selectedYear}`,
        config
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result?.data[0]);
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);

  const formatChartData = (monthlyData) => {
    return monthlyData?.map((item) => ({
      ...item,
      month: monthNames[item?.month - 1],
    }));
  };

  const handleYearChange = (year) => {
    setSelectedYear(parseInt(year));
  };

  // Generate an array of years for the dropdown (e.g., last 5 years)
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );
  return (
    <div className="space-y-8">
      {/* <Card className="w-full">
          <CardHeader>
            <CardTitle>Monthly Orders ({selectedYear})</CardTitle>
            <CardDescription>
              Line chart showing total orders per month
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : data ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={formatChartData(data.monthlyData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="totalOrders"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Monthly Revenue ({selectedYear})</CardTitle>
            <CardDescription>
              Line chart showing total revenue per month
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : data ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={formatChartData(data.monthlyData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="totalRevenue"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card> */}
      <div className="">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle>Monthly Orders and Revenue ({selectedYear})</CardTitle>
            <CardDescription>
              Bar chart showing total orders and revenue per month
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="">
        <div className="space-y-4">
          <div className="flex mb-6 justify-between items-center">
            <Select
              onValueChange={handleYearChange}
              value={selectedYear?.toString()}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year?.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => fetchData(selectedYear)}
              disabled={isLoading}
            >
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Refresh Data
            </Button>
          </div>
        </div>
        {data && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Yearly Totals ({selectedYear})</CardTitle>
              <CardDescription>
                Summary of total orders and revenue for the year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold">
                    {data?.yearlyTotal?.totalOrdersYear}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold">
                    ₹ {data?.yearlyTotal?.totalRevenueYear?.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : data ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={formatChartData(data?.monthlyData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="totalOrders"
                    name="Orders"
                    fill="#8884d8"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="totalRevenue"
                    name="Revenue"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : null}


          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
           Monthly & Yearly Orders and Revenue ({selectedYear}) <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing Orders and Revenue for the last 12 months With year wise comparison
            </div>
          </CardFooter>
        </Card>
      </div>
     
    </div>
  );
}
