import { Bar, BarChart, Line, LineChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreVertical } from 'lucide-react'


export default function Dash() {
  const salesData = [
    { month: "Jun 24", value: 40000 },
    { month: "Jul 24", value: 35000 },
    { month: "Aug 24", value: 45000 },
    { month: "Sep 24", value: 55000 },
    { month: "Oct 24", value: 48000 },
    { month: "Nov 24", value: 52000 },
    { month: "Dec 24", value: 47000 },
  ]

  const products = [
    {
      name: "Space design UI",
      date: "06 September, 2024",
      price: "$73.52",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Eventez Event App UI",
      date: "01 September, 2024",
      price: "$83.66",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Delivery App UI",
      date: "31 October, 2024",
      price: "$514.53",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const countries = [
    { name: "United States", value: "84.2K", flag: "🇺🇸" },
    { name: "United Kingdom", value: "65.8K", flag: "🇬🇧" },
    { name: "France", value: "46.5K", flag: "🇫🇷" },
    { name: "Germany", value: "34.2K", flag: "🇩🇪" },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-rose-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">envato</p>
                  <p className="text-sm text-gray-500">34 Oder&apos;s today</p>
                </div>
              </div>
              <MoreVertical className="text-gray-500" />
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold">$463,783</p>
              <p className="text-rose-600 text-sm">42.21%</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm">See Details</p>
              <span>→</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">UI8</p>
                  <p className="text-sm text-gray-500">34 Oder&apos;s today</p>
                </div>
              </div>
              <MoreVertical className="text-gray-500" />
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold">$463,783</p>
              <p className="text-green-600 text-sm">68.51%</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm">See Details</p>
              <span>→</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">Gumroad</p>
                  <p className="text-sm text-gray-500">34 Oder&apos;s today</p>
                </div>
              </div>
              <MoreVertical className="text-gray-500" />
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold">$463,783</p>
              <p className="text-rose-600 text-sm">32.5%</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm">See Details</p>
              <span>→</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Overall Sales</CardTitle>
            <Select defaultValue="last-month">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <BarChart data={salesData}>
                <Bar dataKey="value" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Visitor Source</CardTitle>
            <Select defaultValue="last-month">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl font-bold">84%</p>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset="70"
                  className="text-blue-500"
                />
              </svg>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
                Website (69%)
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2" />
                Instagram (25%)
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                Facebook (73%)
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                TikTok (35%)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Product List</CardTitle>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="flex items-center space-x-3">
                      <img
                        alt={product.name}
                        className="rounded-lg"
                        height="40"
                        src={product.image}
                        style={{
                          aspectRatio: "40/40",
                          objectFit: "cover",
                        }}
                        width="40"
                      />
                      <span>{product.name}</span>
                    </TableCell>
                    <TableCell>{product.date}</TableCell>
                    <TableCell>{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Customer Growth</CardTitle>
            <Select defaultValue="last-month">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countries.map((country) => (
                <div key={country.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                  <span className="font-medium">{country.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}