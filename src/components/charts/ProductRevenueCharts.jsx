import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#fb7185",
];

export default function ProductRevenueCharts() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${base_url}user/products/revenue`,
          config
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Product Revenue Charts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Product Revenue - Pie Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
              <ResponsiveContainer width={380} height={380}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="totalOrders"
                    nameKey="productName"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {data?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <ResponsiveContainer width={380} height={380}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="totalRevenue"
                    nameKey="productName"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  >
                    {data?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Product Revenue Details
              </h3>
              <div className="max-h-[380px] overflow-auto ">
                <Table>
                  <TableHeader className="sticky top-0 ">
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Total Orders</TableHead>
                      <TableHead className="text-right">
                        Total Revenue
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell className="text-right">
                          {item.totalOrders}
                        </TableCell>
                        <TableCell className="text-right">
                          ${item.totalRevenue.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// import { useState, useEffect } from 'react'
// import { TrendingUp } from "lucide-react"
// import { LabelList, Pie, PieChart } from "recharts"
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
// import { config } from "../../utils/axiosconfig";

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

// export default function ProductRevenueCharts() {
//   const [data, setData] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/api/user/products/revenue', config)
//         const result = await response.json()
//         setData(result)
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   const chartConfig = data.reduce((acc, item) => {
//     acc[item.productName] = {
//       label: item.productName,
//       color: COLORS[data.indexOf(item) % COLORS.length],
//     }
//     return acc
//   }, {})

//   return (
//     <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//       <Card className="flex flex-col">
//         <CardHeader className="items-center pb-0">
//           <CardTitle>Total Orders</CardTitle>
//           <CardDescription>Product Distribution</CardDescription>
//         </CardHeader>
//         <CardContent className="flex-1 pb-0">
//           <ChartContainer
//             config={chartConfig}
//             className="mx-auto aspect-square max-h-[250px]"
//           >
//             <PieChart>
//               <ChartTooltip
//                 content={<ChartTooltipContent nameKey="totalOrders"  />}
//               />
//               <Pie data={data} dataKey="totalOrders">
//                 <LabelList
//                   dataKey="productName"
//                   className="fill-background"
//                   stroke="none"
//                   fontSize={12}
//                   formatter={(value) => chartConfig[value]?.label}
//                 />
//               </Pie>
//             </PieChart>
//           </ChartContainer>
//         </CardContent>
//         <CardFooter className="flex-col gap-2 text-sm">
//           <div className="flex items-center gap-2 font-medium leading-none">
//             Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//           </div>
//           <div className="leading-none text-muted-foreground">
//             Showing total orders distribution across products
//           </div>
//         </CardFooter>
//       </Card>

//       <Card className="flex flex-col">
//         <CardHeader className="items-center pb-0">
//           <CardTitle>Total Revenue</CardTitle>
//           <CardDescription>Product Distribution</CardDescription>
//         </CardHeader>
//         <CardContent className="flex-1 pb-0">
//           <ChartContainer
//             config={chartConfig}
//             className="mx-auto aspect-square max-h-[250px]"
//           >
//             <PieChart>
//               <ChartTooltip
//                 content={<ChartTooltipContent nameKey="totalRevenue"  />}
//               />
//               <Pie data={data} dataKey="totalRevenue">
//                 <LabelList
//                   dataKey="productName"
//                   className="fill-background"
//                   stroke="none"
//                   fontSize={12}
//                   formatter={(value) => chartConfig[value]?.label}
//                 />
//               </Pie>
//             </PieChart>
//           </ChartContainer>
//         </CardContent>
//         <CardFooter className="flex-col gap-2 text-sm">
//           <div className="flex items-center gap-2 font-medium leading-none">
//             Trending up by 7.1% this month <TrendingUp className="h-4 w-4" />
//           </div>
//           <div className="leading-none text-muted-foreground">
//             Showing total revenue distribution across products
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }
