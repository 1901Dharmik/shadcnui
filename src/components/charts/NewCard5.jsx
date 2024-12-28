import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
export const description = "Sajivan Orders Analytics"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartConfig = {
  analytics: {
    label: "Analytics",
  },
  totalOrders: {
    label: "Total Orders",
    color: "hsl(var(--chart-1))",
  },
  totalRevenue: {
    label: "Total Revenue",
    color: "hsl(var(--chart-2))",
  },
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-background p-4 border rounded-md shadow-md">
        <p className="label font-bold">{`${label}`}</p>
        <p className="text-sm">{`Total Orders: ${payload[0].value}`}</p>
        <p className="text-sm">{`Total Revenue: ₹${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};

export default function Component() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_url}sajivanorders/sajivan/analytics`, config);
        const data = response.data;
        
        const processedData = data.map(item => ({
          date: `${item.month}. ${monthNames[item.month - 1]} ${item.year}`,
          totalOrders: item.totalOrders,
          totalRevenue: item.totalRevenue
        }));

        setChartData(processedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sajivan Orders Analytics</CardTitle>
        <CardDescription>
          Monthly breakdown of orders and revenue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis yAxisId="left" orientation="left" stroke={chartConfig.totalOrders.color} />
                <YAxis yAxisId="right" orientation="right" stroke={chartConfig.totalRevenue.color} />
                <Bar
                  yAxisId="left"
                  dataKey="totalOrders"
                  fill={chartConfig.totalOrders.color}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="totalRevenue"
                  fill={chartConfig.totalRevenue.color}
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip
                  content={<CustomTooltip />}
                  cursor={false}
                />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}