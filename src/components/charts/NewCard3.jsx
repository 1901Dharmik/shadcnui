import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
export const description = "Monthly Revenue and Orders"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartConfig = {
  totalRevenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  totalOrders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
}

export default function Component() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState([]);
  const [yearlyTotal, setYearlyTotal] = useState({ totalOrdersYear: 0, totalRevenueYear: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_url}user/monthly-summary/${year}`, config);
        const monthlyData = response.data.data[0].monthlyData;
        setChartData(monthlyData.map(item => ({
          month: monthNames[item.month - 1],
          totalRevenue: item.totalRevenue,
          totalOrders: item.totalOrders
        })));
        setYearlyTotal(response.data.data[0].yearlyTotal);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Monthly Revenue and Orders</CardTitle>
          <Select value={year.toString()} onValueChange={(value) => setYear(parseInt(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2023,]?.map((y) => (
                <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>Year {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke={chartConfig.totalRevenue.color} />
            <YAxis yAxisId="right" orientation="right" stroke={chartConfig.totalOrders.color} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar yAxisId="left" dataKey="totalRevenue" fill={chartConfig.totalRevenue.color}   radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="totalOrders" fill={chartConfig.totalOrders.color}  radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Total Revenue: ₹{yearlyTotal?.totalRevenueYear?.toLocaleString()}
        </div>
        <div className="flex gap-2 font-medium leading-none">
          Total Orders: {yearlyTotal?.totalOrdersYear?.toLocaleString()}
        </div> */}
      </CardFooter>
    </Card>
  )
}