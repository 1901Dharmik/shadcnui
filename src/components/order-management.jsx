'use client';
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, MoreHorizontal, Search, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Avatar } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
    id: '#60113',
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
    id: '#60115',
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
    id: '#60116',
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

export default function OrderManagementComponent() {
  const [expandedRows, setExpandedRows] = useState([])
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [date, setDate] = useState({
    from: new Date(2024, 8, 1),
    to: new Date(2024, 8, 30)
  })

  const toggleRowExpansion = (orderId) => {
    setExpandedRows(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId])
  }

  const filteredOrders = orders.filter(order => {
    if (selectedTab !== 'all' && order.status.toLowerCase() !== selectedTab) {
      return false
    }
    if (searchTerm) {
      return (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (date?.from && date?.to) {
      return order.date >= date.from && order.date <= date.to
    }
    return true
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortColumn) return 0
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">{orders.length}</span></TabsTrigger>
          <TabsTrigger value="pending">Pending <span
            className="ml-2 rounded-full bg-yellow-200 px-2 py-1 text-xs font-semibold">{orders.filter(o => o.status === 'Pending').length}</span></TabsTrigger>
          <TabsTrigger value="completed">Completed <span
            className="ml-2 rounded-full bg-green-200 px-2 py-1 text-xs font-semibold">{orders.filter(o => o.status === 'Completed').length}</span></TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled <span className="ml-2 rounded-full bg-red-200 px-2 py-1 text-xs font-semibold">{orders.filter(o => o.status === 'Cancelled').length}</span></TabsTrigger>
          <TabsTrigger value="refunded">Refunded <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">{orders.filter(o => o.status === 'Refunded').length}</span></TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex justify-between items-center my-4">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={`w-[300px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customer or order number..."
            className="pl-8 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="rounded-md border">
        <div className="overflow-auto max-h-[500px]">
        <Table className="relative">
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[100px]" onClick={() => handleSort('id')}>Order {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                <TableHead onClick={() => handleSort('customer')}>Customer {sortColumn === 'customer' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                <TableHead onClick={() => handleSort('date')}>Date {sortColumn === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                <TableHead onClick={() => handleSort('items')}>Items {sortColumn === 'items' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                <TableHead onClick={() => handleSort('price')}>Price {sortColumn === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                <TableHead onClick={() => handleSort('status')}>Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="relative">
              {sortedOrders.slice(0, rowsPerPage).map((order) => (
                <React.Fragment key={order?.id}>
                  <TableRow className="relative">
                    <TableCell className="w-[50px]">
                      <Button variant="ghost" size="sm" onClick={() => toggleRowExpansion(order?.id)}>
                        {expandedRows.includes(order?.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <img
                          src={order?.customer?.avatar}
                          alt={order?.customer?.name}
                          className="h-8 w-8 rounded-full mr-2" />
                        <div>
                          <div className="font-medium">{order?.customer?.name}</div>
                          <div className="text-sm text-muted-foreground">{order?.customer?.email}</div>
                        </div>
                      </div>
                    </TableCell>
                          <TableCell>{format(order?.date, 'dd MMM yyyy')}<br />{format(order?.date, 'HH:mm')}</TableCell>
                    <TableCell>{order?.items}</TableCell>
                    <TableCell>${order?.price?.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${order.status === 'Completed' ? 'bg-green-200 text-green-800' :
                            order.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                            order.status === 'Cancelled' ? 'bg-red-200 text-red-800' :
                            'bg-gray-200 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="w-[50px]">
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
                  {expandedRows.includes(order.id) && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-0">
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
      <div
        className="sticky bottom-0 bg-background z-10 flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {Math.min(rowsPerPage, sortedOrders.length)} of {sortedOrders.length} results
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => setRowsPerPage(parseInt(value))}>
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
          <div
            className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page 1 of 1
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {}}
              disabled>
              <span className="sr-only">Go to first page</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => {}} disabled>
              <span className="sr-only">Go to previous page</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => {}} disabled>
              <span className="sr-only">Go to next page</span>
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {}}
              disabled>
              <span className="sr-only">Go to last page</span>
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
    )
  );
}