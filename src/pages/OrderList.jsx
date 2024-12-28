import React, { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ListFilter,
  PlusCircle,
  File,
} from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import OrderStatusChange from "../components/AddProduct/OrderStatusChange";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { config } from "../utils/axiosconfig";
import { useNavigate } from "react-router-dom";
import CSVExportButton from "../components/CSVExportButton";
import { toast } from "sonner";
import { base_url } from "../utils/base_url"
export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderStatus, setOrderStatus] = useState("all");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [fullName, setFullName] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [loading, setLoading] = useState(false); // New state for loading
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleRowExpansion = (orderId) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  useEffect(() => {
    fetchOrders();
  }, [
    page,
    limit,
    startDate,
    endDate,
    orderStatus,
    firstname,
    lastname,
    fullName,
  ]);
const token = localStorage.getItem('token');
  const fetchOrders = async () => {
    try {
      setLoading(true); // Start loading
      setError(""); // Clear previous errors

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(startDate && { startDate: startDate.toISOString() }),
        ...(endDate && { endDate: endDate.toISOString() }),
        ...(orderStatus !== "all" && { orderStatus }),
        ...(firstname && { firstname }),
        ...(lastname && { lastname }),
      });

      const response = await fetch(
        `${base_url}user/getallorders?${queryParams}`,
       config
      );
    console.log("config",config);
    

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle non-2xx responses
      }

      const data = await response.json();
      // console.log(data);

      setOrders(data.orders);
      setTotalOrders(data.totalOrders);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Error fetching orders: " + error.message); // Set error message
      toast.error(error.message ||"Failed to fetch orders");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleStatusChange = (value) => {
     setOrderStatus(value);
    setPage(1); // Reset to first page when changing status
  };

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullName(value);

    // Split the full name into firstname and lastname
    const [first, ...last] = value.trim().split(" ");
    setFirstname(first || "");
    setLastname(last.join(" ") || "");
  };

  const [filteredOrders, setFilteredOrders] = useState([]); // New state for filtered orders

  useEffect(() => {
    // Update filtered orders whenever the orders or fullName changes
    const results = orders.filter((order) =>
      `${order.user?.firstname} ${order.user?.lastname}`
        .toLowerCase()
        .includes(fullName?.toLowerCase())
    );
    setFilteredOrders(results);
  }, [orders, fullName]); // Add fullName to the dependency array

  // exports
  const prepareExportData = () => {
    return (
      orders?.map((order, index) => {
        const product = order.orderItems[0]?.product; // Assuming one product per order
        return {
          "Order ID": order._id,
          "User Name": `${order.user.firstname} ${order.user.lastname}`,
          "Order Date": new Date(order.createdAt).toLocaleDateString(),
          "Product Title": product?.title || "Untitled Product",
          Category: product?.category || "N/A",
          Price: order.totalPrice,
          "Total Quantity": order.orderItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
          "Sold Items": product?.sold || 0,
          "In Stock": product?.quantity - (product?.sold || 0),
          "Order Status": order.orderStatus,
          "Payment Method": order.paymentMethod,
        };
      }) || []
    );
  };
  return (
    <div className="space-y-2">
      <h3 className="mb-3 title text-2xl font-semibold">Products</h3>
      <div className="flex space-x-4 justify-between items-center">
        <div className="flex gap-6">
          <div className="flex flex-col space-y-2">
            {/* <label htmlFor="startDate">Start Date</label> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col space-y-2 ">
            {/* <label htmlFor="endDate">End Date</label> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          {/* <label htmlFor="orderStatus">Order Status</label>
          <Select value={orderStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Ordered">Ordered</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        <div className="flex flex-col space-y-3">
          {/* <label htmlFor="orderStatus">Order Status</label> */}
          <div className="flex">
            <Input
              placeholder="Search by Full Name"
              value={fullName}
              onChange={handleFullNameChange}
            />
            {/* <span className="ml-2 w-[200px]">{filteredOrders.length} results found</span>{" "} */}
          </div>
          {/* <div className="flex">
            <Tabs
              value={orderStatus}
              className="w-full"
              onValueChange={handleStatusChange}
            >
              <TabsList>
                <TabsTrigger value="all">All </TabsTrigger>
                <TabsTrigger value="Ordered"> Ordered</TabsTrigger>
                <TabsTrigger value="Processing"> Processing </TabsTrigger>
                <TabsTrigger value="Shipped"> Shipped </TabsTrigger>
                <TabsTrigger value="Delivered"> Delivered </TabsTrigger>
                <TabsTrigger value="Cancelled"> Cancelled </TabsTrigger>
              </TabsList>
            </Tabs>
            <span className="w-[100px] mt-2">{totalOrders} orders</span>
          </div> */}
        </div>
      </div>

      <div className="flex space-x-4 justify-between items-center">
        {/* <label htmlFor="fullName" cl>Search by Full Name</label> */}
        <div className="flex">
          <Tabs
            value={orderStatus}
            className="w-full"
            onValueChange={handleStatusChange}
          >
            <TabsList>
              <TabsTrigger value="all">All </TabsTrigger>
              <TabsTrigger value="Ordered"> Ordered</TabsTrigger>
              <TabsTrigger value="Processing"> Processing </TabsTrigger>
              <TabsTrigger value="Shipped"> Shipped </TabsTrigger>
              <TabsTrigger value="Delivered"> Delivered </TabsTrigger>
              <TabsTrigger value="Cancelled"> Cancelled </TabsTrigger>
            </TabsList>
          </Tabs>
          <span className="w-[100px] mt-2">{totalOrders} orders</span>
        </div>
        {/* Display total search results */}
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-end justify-center ">
            <CSVExportButton
              data={prepareExportData()}
              filename="products-export.csv"
            />
          </div>
        </div>
      </div>
      <div className="border">
        <div className="">
          <Table className="relative ">
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                {/* <TableHead className="w-[50px] "></TableHead> */}
                <TableHead className="">Index</TableHead>
                <TableHead onClick={() => handleSort("customer")}>
                  Customer{" "}
                </TableHead>
                <TableHead onClick={() => handleSort("date")}>Date </TableHead>
                <TableHead onClick={() => handleSort("items")}>
                  Items{" "}
                </TableHead>
                <TableHead onClick={() => handleSort("price")}>
                  Price{" "}
                </TableHead>
                <TableHead onClick={() => handleSort("status")}>
                  Status{" "}
                </TableHead>
                <TableHead className="text-right">Change Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                {/* <TableHead className="w-[50px]"></TableHead> */}
              </TableRow>
            </TableHeader>
          </Table>
          <div className="overflow-auto">
            {loading && (
              <div className="flex justify-center items-center h-[500px]">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </div>
            )}
            {!loading && !error && orders.length > 0 && (
              <Table>
                <TableBody className="relative">
                  {orders?.map((order, index) => (
                    <React.Fragment key={order?._id}>
                      <TableRow className="relative">
                        <TableCell>{(page - 1) * limit + index + 1}</TableCell>

                        <TableCell className="">
                          <div className="flex items-center">
                            <div className="w-8 h-8 capitalize rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-2">
                              {order?.user?.firstname[0]}
                            </div>
                            <div
                              onClick={() =>
                                navigate(`/admin/order-list/${order?._id}`)
                              }
                            >
                              <div className="font-medium capitalize truncate">
                                {order?.user?.firstname} {order?.user?.lastname}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {order?.user?.mobile}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="truncate">
                          <span className="text-md font-medium">
                            {format(order?.createdAt, "dd MMM yyyy")}
                          </span>
                          <br />
                          <span className="text-md text-gray-500">
                            {format(order?.createdAt, "hh:mm:ss a")}
                          </span>
                        </TableCell>
                        <TableCell>{order?.orderItems?.length}</TableCell>
                        <TableCell className="truncate">
                          ₹ {order?.totalPrice?.toFixed(2)}/-
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold
                          ${
                            order?.orderStatus === "Ordered"
                              ? "bg-muted text-muted-foreground"
                              : order.orderStatus === "Processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.orderStatus === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                          >
                            {order?.orderStatus}
                          </span>
                        </TableCell>
                        <TableCell className="w-[50px]">
                          <Button
                            className="bg-muted"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(order?._id)}
                          >
                            {expandedRows.includes(order?._id) ? (
                              <div className="flex justify-center items-center space-x-1 ">
                                Hide
                                <ChevronUp className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="flex justify-center items-center space-x-1 ">
                                View
                                <ChevronDown className="h-4 w-4" />
                              </div>
                            )}
                          </Button>
                        </TableCell>
                        <OrderStatusChange
                          orderId={order._id}
                          initialStatus={order?.orderStatus}
                        />
                        {/* <TableCell className="">
                          <Select
                          // onValueChange={(value) =>
                          //   handleStatusChange(Enquiries._id, value)
                          // }
                          // defaultValue={Enquiries.status || "Submitted"}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value=" ">Change Status</SelectItem>
                              <SelectItem value="Ordered">Ordered</SelectItem>
                              <SelectItem value="Processing">
                                Processing
                              </SelectItem>
                              <SelectItem value="Shipped">Shipped</SelectItem>
                              <SelectItem value="Delivered">
                                Delivered
                              </SelectItem>
                              <SelectItem value="Cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell> */}
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/admin/order-list/${order?._id}`)
                                }
                              >
                                View details
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Delete order</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {expandedRows.includes(order._id) && (
                        <TableRow>
                          <TableCell colSpan={8} className="p-0">
                            <div className="p-4 bg-muted/60">
                              {/* <h4 className="font-semibold mb-2">Order Details</h4> */}
                              {/* {order?.orderItems?.map((product, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center px-6  p-2 "
                            >
                              <img src={product?.product?.images[0]?.url} className="w-12 h-12" alt="" />
                              <span>
                               {product?.product?.title}
                              </span>
                              <span>Qty: {product?.quantity}</span>
                              <span>₹ {product?.price?.toFixed(2)}/-</span>
                            </div>
                          ))} */}
                              <Table>
                                <TableHeader className="border-b">
                                  <TableRow>
                                    <TableHead className="w-[100px]">
                                      Image
                                    </TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">
                                      Quantity
                                    </TableHead>
                                    <TableHead className="text-right">
                                      Price
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order?.orderItems?.map((product) => (
                                    <TableRow
                                      key={product.code}
                                      className="w-full"
                                    >
                                      <TableCell>
                                        <img
                                          src={product?.product?.images[0]?.url}
                                          alt={product?.product?.title}
                                          width={40}
                                          height={40}
                                          className="h-12 w-12 rounded-md"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <div>
                                          <p className="font-medium">
                                            {product?.product?.title}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                            {product?.product?.category}
                                          </p>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        x{product?.quantity}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        ₹ {product?.price}/-
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            )}

            {!loading && !error && orders.length === 0 && (
              <div className="flex justify-center items-center h-[500px] text-2xl">
                <span class="icon-[solar--bill-cross-bold-duotone] mr-2 h-10 w-10 text-gray-400 "></span>
                Orders Not Found
                {/* <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Orders Not Found */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span>
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalOrders)} of {totalOrders} orders
          </span>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setPage(1)} disabled={page === 1}>
            First
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
          <Button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
