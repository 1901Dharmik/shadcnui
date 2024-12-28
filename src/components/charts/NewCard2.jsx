import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
export const description = "Product Orders Breakdown"

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function Component() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(`${base_url}user/products/revenue`, config);
        setOrderData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch order data');
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = orderData.map((item, index) => ({
    name: item.productName,
    value: item.totalOrders,
    fill: colors[index % colors.length]
  }));

  const chartConfig = orderData.reduce((config, item, index) => {
    config[item.productName] = {
      label: item.productName,
      color: colors[index % colors.length]
    };
    return config;
  }, {});

  const totalOrders = orderData.reduce((sum, item) => sum + item.totalOrders, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product Orders Breakdown</CardTitle>
        <CardDescription>Total Orders: {totalOrders}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mt-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={chartData} dataKey="value" nameKey="name" label />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap w-full truncate gap-2 [&>*]:basis-1/4 [&>*]:justify-center "
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing order breakdown for all products
        </div>
      </CardFooter> */}
    </Card>
  )
}