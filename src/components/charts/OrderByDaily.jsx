import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";
// Helper function to format date strings for the x-axis
const formatDate = (year, month, day) => {
  if (day) return `${year}-${month}-${day}`;
  return `${year}-${month}`;
};

// Sales Trends Component
const SalesTrends = () => {
  const [salesData, setSalesData] = useState([]);
  const [period, setPeriod] = useState("monthly"); // Default period is monthly

  // Fetch sales trend data from the API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          `${base_url}user/getorder/getallordersbytrands?period=${period}`,config
        );
        const formattedData = response.data.data.map((item) => ({
          name:
            period === "daily"
              ? formatDate(item.year, item.month, item.day)
              : period === "weekly"
              ? `${item.year}-W${item.week}`
              : `${item.year}-${item.month}`,
          totalOrders: item.totalOrders,
          totalRevenue: item.totalRevenue,
        }));
        setSalesData(formattedData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, [period]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Trends ({period.charAt(0).toUpperCase() + period.slice(1)})</CardTitle>
        <CardDescription>View sales trends over different time periods</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={period} onValueChange={(value) => setPeriod(value)}>
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

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" name="Total Orders" />
            <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" name="Total Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesTrends;
