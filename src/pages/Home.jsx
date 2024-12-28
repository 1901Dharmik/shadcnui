import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrdersByMonthAndYear from "../components/charts/OrdersByMonthAndYear";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { config } from "../utils/axiosconfig";
import ProductRevenueCharts from "../components/charts/ProductRevenueCharts";
import OrdersByMonthWithYear from "../components/charts/OrdersByMonthWithYear";
import SalesTrends from "../components/charts/OrderByDaily";
import NewCard from "../components/charts/NewCard";
import NewCard2 from "../components/charts/NewCard2";
import NewCard3 from "../components/charts/NewCard3";
import NewCard4 from "../components/charts/NewCard4";
import NewCard5 from "../components/charts/NewCard5";
import Sidebar from "../components/components-sidebar-07";
import { base_url } from "../utils/base_url";
export default function UserOrdersTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${base_url}user/getuser/maxorders`, config);
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (err) {
      setError("An error occurred while fetching data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card className="w-full  mx-auto">
          <CardHeader>
            <CardTitle>Users with Most Orders</CardTitle>
            <CardDescription>
              A table showing users with the highest number of orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <Table>
                <TableCaption>
                  List of users with their order counts
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium capitalize">
                        {user.userDetails[0]?.firstname +
                          " " +
                          user.userDetails[0]?.lastname || "Unknown"}
                      </TableCell>
                      <TableCell>
                        {user.userDetails[0]?.mobile || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.totalOrders}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <div className="mt-4 flex justify-end">
              <Button onClick={fetchData} disabled={isLoading}>
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Refresh Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <ProductRevenueCharts /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-6">
        {/* <OrdersByMonthAndYear />
      
      <OrdersByMonthWithYear /> */}
        <NewCard />
        <NewCard2 />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <OrdersByMonthAndYear />
      
      <OrdersByMonthWithYear />
      
      </div> */}
      {/* <div className="my-6">
      <SalesTrends />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="col-span-2">
          <NewCard3 />
        </div>
        <div className="col-span-2">
          <NewCard4 />
        </div>
      </div>
      <NewCard5 />
  
    </>
  );
}
