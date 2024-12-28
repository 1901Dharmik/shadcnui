// import { TrendingUp } from "lucide-react"
// import { Pie, PieChart } from "recharts"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// export  const description = "A pie chart with a label"

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } 

// export default function Component() {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Pie Chart - Label</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
//         >
//           <PieChart>
//             <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//             <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
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

export const description = "Product Revenue Breakdown"

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function Component() {
  const [revenueData, setRevenueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get(`${base_url}user/products/revenue`,config);
        setRevenueData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch revenue data');
        setIsLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = revenueData.map((item, index) => ({
    name: item.productName,
    value: item.totalRevenue,
    fill: colors[index % colors.length]
  }));

  const chartConfig = revenueData.reduce((config, item, index) => {
    config[item.productName] = {
      label: item.productName,
      color: colors[index % colors.length]
    };
    return config;
  }, {});

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.totalRevenue, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product Revenue Breakdown</CardTitle>
        <CardDescription>Total Revenue: ₹{totalRevenue.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mt-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip  content={<ChartTooltipContent />}   />
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
          Showing revenue breakdown for all products
        </div>
      </CardFooter> */}
    </Card>
  )
}