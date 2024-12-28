import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, MoreHorizontal, Search } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Mock data
const orders = [
  {
    id: '#6010',
    customer: { name: 'Jayvion Simon', email: 'nannie.abernathy70@yahoo.com', avatar: '/placeholder.svg?height=32&width=32' },
    date: new Date('2024-09-27T10:51:00'),
    items: 6,
    price: 484.15,
    status: 'Refunded',
    products: [
      { name: 'Urban Explorer Sneakers', sku: '16H9UR0', quantity: 1, price: 83.74 }
    ]
  },
  {
    id: '#6011',
    customer: { name: 'Lucian Obrien', email: 'ashlynn.ohara62@gmail.com', avatar: '/placeholder.svg?height=32&width=32' },
    date: new Date('2024-09-26T09:51:00'),
    items: 1,
    price: 83.74,
    status: 'Completed',
    products: [
      { name: 'Urban Explorer Sneakers', sku: '16H9UR0', quantity: 1, price: 83.74 }
    ]
  },
  {
    id: '#60110',
    customer: { name: 'Soren Durham', email: 'vergie.block82@hotmail.com', avatar: '/placeholder.svg?height=32&width=32' },
    date: new Date('2024-09-17T12:51:00'),
    items: 5,
    price: 400.41,
    status: 'Pending',
    products: [
      { name: 'Urban Explorer Sneakers', sku: '16H9UR0', quantity: 1, price: 83.74 }
    ]
  },
  {
    id: '#60111',
    customer: { name: 'Cortez Herring', email: 'vito.hudson@hotmail.com', avatar: '/placeholder.svg?height=32&width=32' },
    date: new Date('2024-09-15T11:51:00'),
    items: 1,
    price: 83.74,
    status: 'Completed',
    products: [
      { name: 'Urban Explorer Sneakers', sku: '16H9UR0', quantity: 1, price: 83.74 }
    ]
  },
  {
    id: '#60112',
    customer: { name: 'Brycen Jimenez', email: 'tyrel.greenholt@gmail.com', avatar: '/placeholder.svg?height=32&width=32' },
    date: new Date('2024-09-14T22:51:00'),
    items: 6,
    price: 484.15,
    status: 'Refunded',
    products: [
      { name: 'Urban Explorer Sneakers', sku: '16H9UR0', quantity: 1, price: 83.74 }
    ]
  },
  {
    id: '#60111',
    customer: { name: 'Cortez Herring', email: 'vito.hudson@hotmail.com', avatar: '/placeholder.svg?height=32&width=32' },
    date: new Date('2024-09-15T11:51:00'),
    items: 1,
    price: 83.74,
    status: 'Completed',
    products: [
      { name: 'Urban Explorer Sneakers', sku: '16H9UR0', quantity: 1, price: 83.74 }
    ]
  },
  {
    id: '#60112',
    customer: { name: 'Brycen Jimenez', email: 'tyrel.greenholt@gmail.com', avatar: '/placeholder.svg?height=32&width=32' },
    date: new Date('2024-09-14T22:51:00'),
    items: 6,
    price: 484.15,
    status: 'Refunded',
    products: [
      { name: 'Urban Explorer Sneakers', sku: '16H9UR0', quantity: 1, price: 83.74 }
    ]
  },
]
export default function OrderManagement() {
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleRowExpansion = (orderId) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Filtering, sorting, and paginating data
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (selectedTab !== "all" && order.status.toLowerCase() !== selectedTab)
        return false;
      if (searchTerm) {
        return (
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    });
  }, [selectedTab, searchTerm]);

  const sortedOrders = useMemo(() => {
    if (!sortColumn) return filteredOrders;
    return (Array.isArray(filteredOrders) ? [...filteredOrders] : []).sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredOrders, sortColumn, sortDirection]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedOrders.slice(startIndex, endIndex);
  }, [sortedOrders, currentPage, rowsPerPage]);

  return (
    <div className="container mx-auto py-10">
    <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
      <TabsList>
        <TabsTrigger value="all">All <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">{orders.length}</span></TabsTrigger>
        <TabsTrigger value="pending">Pending <span className="ml-2 rounded-full bg-yellow-200 px-2 py-1 text-xs font-semibold">{orders.filter(o => o.status === 'Pending').length}</span></TabsTrigger>
        <TabsTrigger value="completed">Completed <span className="ml-2 rounded-full bg-green-200 px-2 py-1 text-xs font-semibold">{orders.filter(o => o.status === 'Completed').length}</span></TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled <span className="ml-2 rounded-full bg-red-200 px-2 py-1 text-xs font-semibold">{orders.filter(o => o.status === 'Cancelled').length}</span></TabsTrigger>
        <TabsTrigger value="refunded">Refunded <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">{orders.filter(o => o.status === 'Refunded').length}</span></TabsTrigger>
      </TabsList>
    </Tabs>

    <div className="flex justify-between items-center my-4">
      <div className="flex space-x-2">
        <Input type="date" className="w-40" placeholder="Start date" />
        <Input type="date" className="w-40" placeholder="End date" />
      </div>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customer or order number..."
          className="pl-8 w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    <div className="rounded-md border">
    <div className="overflow-auto max-h-[500px]">
    <Table className="table-auto w-full">
      {/* Table Header */}
      <TableHeader className="sticky top-0 bg-background z-10">
        <TableRow className="relative">
          
          <TableHead className="w-[40px]"> {/* Adjusted width */}
            {/* Expand/Collapse */}
          </TableHead>
          <TableHead className="w-[100px] text-left" onClick={() => handleSort('id')}> {/* Set text-left for alignment */}
            Order {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="w-[200px] text-left" onClick={() => handleSort('customer')}> {/* Adjusted width */}
            Customer {sortColumn === 'customer' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="w-[150px] text-left" onClick={() => handleSort('date')}> {/* Adjusted width */}
            Date {sortColumn === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="w-[80px] text-left" onClick={() => handleSort('items')}> {/* Adjusted width */}
            Items {sortColumn === 'items' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="w-[100px] text-left" onClick={() => handleSort('price')}> {/* Adjusted width */}
            Price {sortColumn === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="w-[120px] text-left" onClick={() => handleSort('status')}> {/* Adjusted width */}
            Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead className="w-[50px] text-center"> {/* Adjusted width for Actions */}
            Actions
          </TableHead>
        </TableRow>

      </TableHeader>

      {/* Table Body */}
      <TableBody className="overflow-auto max-h-[400px]">
        {sortedOrders.slice(0, rowsPerPage).map((order) => (
          <React.Fragment key={order.id}>
            <TableRow>
              <TableCell className="w-[40px] text-center">
                <Button variant="ghost" size="sm" onClick={() => toggleRowExpansion(order.id)}>
                  {expandedRows.includes(order.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </TableCell>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <img src={order.customer.avatar} alt={order.customer.name} className="h-8 w-8 rounded-full mr-2" />
                  <div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{format(order.date, 'dd MMM yyyy')}<br />{format(order.date, 'HH:mm')}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>${order.price.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'Completed' ? 'bg-green-200 text-green-800' : order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : order.status === 'Cancelled' ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="w-[50px] text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

            {/* Expanded Row */}
            {expandedRows.includes(order.id) && (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="p-4 bg-muted">
                    <h4 className="font-semibold mb-2">Order Details</h4>
                    {order.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center mb-2">
                        <span>{product.name} (SKU: {product.sku})</span>
                        <span>Qty: {product.quantity}</span>
                        <span>${product.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  </div>
</div>


    <div className="sticky bottom-0 bg-background z-10 flex items-center justify-between space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {Math.min(rowsPerPage, sortedOrders.length)} of {sortedOrders.length} results
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => setRowsPerPage(parseInt(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={rowsPerPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page 1 of 1
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {}}
            disabled
          >
            <span className="sr-only">Go to first page</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {}}
            disabled
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {}}
            disabled
          >
            <span className="sr-only">Go to next page</span>
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {}}
            disabled
          >
            <span className="sr-only">Go to last page</span>
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}
