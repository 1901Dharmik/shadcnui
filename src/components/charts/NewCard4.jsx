"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
export const description = "Order and Revenue Trends"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartConfig = {
  totalOrders: {
    label: "Total Orders",
    color: "hsl(var(--chart-1))",
  },
  totalRevenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-2))",
  },
}

export default function Component() {
  const [period, setPeriod] = useState('monthly');
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_url}user/getorder/getallordersbytrands?period=${period}`, config);
        const data = response.data.data;
        
        const processedData = data.map(item => {
            let label;
            switch(period) {
              case 'daily':
                label = `${item.year}-${item.month}-${item.day}`;
                break;
              case 'weekly':
                label = `Week ${item.week}, ${item.year}`;
                break;
              case 'monthly':
                label = `${monthNames[item.month - 1]} ${item.year}`;
                break;
              default:
                label = '';
            }
            return {
              label,
              totalOrders: item.totalOrders,
              totalRevenue: item.totalRevenue
            };
          });
          console.log(processedData);
        setChartData(processedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [period]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Order and Revenue Trends</CardTitle>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>Showing {period} trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
            
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis yAxisId="left" orientation="left" stroke={chartConfig.totalOrders.color} />
            <YAxis yAxisId="right" orientation="right" stroke={chartConfig.totalRevenue.color} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.totalOrders.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.totalOrders.color} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartConfig.totalRevenue.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartConfig.totalRevenue.color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="totalOrders"
              stroke={chartConfig.totalOrders.color}
              fillOpacity={1}
              fill="url(#fillOrders)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="totalRevenue"
              stroke={chartConfig.totalRevenue.color}
              fillOpacity={1}
              fill="url(#fillRevenue)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Showing {period} trends
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}