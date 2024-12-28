"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Search,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const invoices = [
  {
    id: "INV-19919",
    customer: "Amiah Pruitt",
    create: "08 Sep 2024",
    due: "01 Nov 2024",
    amount: 2331.63,
    sent: 9,
    status: "Paid",
  },
  {
    id: "INV-19918",
    customer: "Ariana Lang",
    create: "09 Sep 2024",
    due: "31 Oct 2024",
    amount: 2372.93,
    sent: 4,
    status: "Overdue",
  },
  {
    id: "INV-19917",
    customer: "Lawson Bass",
    create: "10 Sep 2024",
    due: "30 Oct 2024",
    amount: 2283.97,
    sent: 9,
    status: "Paid",
  },
  {
    id: "INV-19916",
    customer: "Selina Boyer",
    create: "11 Sep 2024",
    due: "29 Oct 2024",
    amount: 2251.84,
    sent: 8,
    status: "Pending",
  },
  {
    id: "INV-19915",
    customer: "Angelique Morse",
    create: "12 Sep 2024",
    due: "28 Oct 2024",
    amount: 2343.51,
    sent: 11,
    status: "Paid",
  },
];

const statusColors = {
  Paid: "bg-green-100 text-green-800",
  Overdue: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Draft: "bg-gray-100 text-gray-800",
};

export default function InvoiceDashboard() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [service, setService] = useState("All services");

  const summaryData = [
    {
      title: "Total",
      count: 20,
      amount: 46218.04,
      icon: "📄",
      color: "text-blue-500",
    },
    {
      title: "Paid",
      count: 10,
      amount: 23110.23,
      icon: "✅",
      color: "text-green-500",
    },
    {
      title: "Pending",
      count: 6,
      amount: 13825.05,
      icon: "⏳",
      color: "text-yellow-500",
    },
    {
      title: "Overdue",
      count: 2,
      amount: 4655.63,
      icon: "⚠️",
      color: "text-red-500",
    },
    {
      title: "Draft",
      count: 2,
      amount: 4627.13,
      icon: "📝",
      color: "text-gray-500",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-5 gap-4 mb-6">
        {summaryData.map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <span className={`text-2xl ${item.color} mr-2`}>{item.icon}</span>
              <span className="text-lg font-semibold">{item.title}</span>
            </div>
            <div className="text-sm text-gray-600">{item.count} invoices</div>
            <div className="text-lg font-bold">
              ${item.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex space-x-2 mb-4">
          {["All", "Paid", "Pending", "Overdue", "Draft"].map((status) => (
            <Button
              key={status}
              variant={status === "All" ? "default" : "outline"}
              className="rounded-full"
            >
              {status}{" "}
              {status === "All"
                ? "20"
                : summaryData.find((item) => item.title === status)?.count}
            </Button>
          ))}
        </div>

        <div className="flex space-x-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between">
                {service} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuCheckboxItem
                checked={service === "All services"}
                onCheckedChange={() => setService("All services")}
              >
                All services
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={service === "Design"}
                onCheckedChange={() => setService("Design")}
              >
                Design
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={service === "Development"}
                onCheckedChange={() => setService("Development")}
              >
                Development
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                {startDate ? format(startDate, "PPP") : <span>Start date</span>}
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
                {endDate ? format(endDate, "PPP") : <span>End date</span>}
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

          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search customer or invoice number..."
              className="pl-8 w-full"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem>Export as CSV</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Print invoices
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Create ↑</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      {invoice.customer[0]}
                    </div>
                    <div>
                      <div className="font-medium">{invoice.customer}</div>
                      <div className="text-sm text-gray-500">{invoice.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{invoice.create}</TableCell>
                <TableCell>{invoice.due}</TableCell>
                <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{invoice.sent}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[invoice.status]
                    }`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuCheckboxItem>Edit</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Delete
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="dense" />
            <label htmlFor="dense">Dense</label>
          </div>
          <div className="flex items-center space-x-4">
            <span>Rows per page:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[70px]">
                  5 <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem>5</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>10</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>20</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span>1-5 of 20</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
