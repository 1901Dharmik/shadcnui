// import React, { useState } from 'react'
// import { CalendarIcon, ChevronDown, ChevronUp, MoreHorizontal, Search } from 'lucide-react'
// import { format } from 'date-fns'
// // import { DateRange } from 'react-day-picker'

// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import { Card, CardContent } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'

// // Mock data
// const invoices = [
//   { id: 'INV-19919', customer: 'Amiah Pruitt', createDate: new Date('2024-09-08'), dueDate: new Date('2024-11-01'), amount: 2331.63, sent: 9, status: 'Paid' },
//   { id: 'INV-19918', customer: 'Ariana Lang', createDate: new Date('2024-09-09'), dueDate: new Date('2024-10-31'), amount: 2372.93, sent: 4, status: 'Overdue' },
//   { id: 'INV-19917', customer: 'Lawson Bass', createDate: new Date('2024-09-10'), dueDate: new Date('2024-10-30'), amount: 2283.97, sent: 9, status: 'Paid' },
//   { id: 'INV-19916', customer: 'Selina Boyer', createDate: new Date('2024-09-11'), dueDate: new Date('2024-10-29'), amount: 2251.84, sent: 8, status: 'Pending' },
//   { id: 'INV-19915', customer: 'Angelique Morse', createDate: new Date('2024-09-12'), dueDate: new Date('2024-10-28'), amount: 2343.51, sent: 11, status: 'Paid' },
//   { id: 'INV-19919', customer: 'Amiah Pruitt', createDate: new Date('2024-09-08'), dueDate: new Date('2024-11-01'), amount: 2331.63, sent: 9, status: 'Paid' },
//   { id: 'INV-19918', customer: 'Ariana Lang', createDate: new Date('2024-09-09'), dueDate: new Date('2024-10-31'), amount: 2372.93, sent: 4, status: 'Overdue' },
//   { id: 'INV-19917', customer: 'Lawson Bass', createDate: new Date('2024-09-10'), dueDate: new Date('2024-10-30'), amount: 2283.97, sent: 9, status: 'Paid' },
//   { id: 'INV-19916', customer: 'Selina Boyer', createDate: new Date('2024-09-11'), dueDate: new Date('2024-10-29'), amount: 2251.84, sent: 8, status: 'Pending' },
//   { id: 'INV-19915', customer: 'Angelique Morse', createDate: new Date('2024-09-12'), dueDate: new Date('2024-10-28'), amount: 2343.51, sent: 11, status: 'Paid' },
// ]

// export default function InvoiceManagement() {
//   const [selectedTab, setSelectedTab] = useState('all')
//   const [searchTerm, setSearchTerm] = useState('')
//   const [date, setDate] = useState({
//     from: new Date(2024, 8, 1),
//     to: new Date(2024, 8, 30)
//   })
//   const [rowsPerPage, setRowsPerPage] = useState(5)

//   const filteredInvoices = invoices.filter(invoice => {
//     if (selectedTab !== 'all' && invoice.status.toLowerCase() !== selectedTab) {
//       return false
//     }
//     if (searchTerm) {
//       return (
//         invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }
//     return true
//   })

//   return (
//     <div className=" flex flex-col bg-background p-8 overflow-hidden z-30">
//       <div className="flex justify-between mb-6 space-x-4">
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-6">
//             <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Total</p>
//               <h3 className="text-2xl font-bold">$46,218.04</h3>
//               <p className="text-xs text-muted-foreground">20 invoices</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-6">
//             <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Paid</p>
//               <h3 className="text-2xl font-bold">$23,110.23</h3>
//               <p className="text-xs text-muted-foreground">10 invoices</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-6">
//             <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Pending</p>
//               <h3 className="text-2xl font-bold">$13,825.05</h3>
//               <p className="text-xs text-muted-foreground">6 invoices</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-6">
//             <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Overdue</p>
//               <h3 className="text-2xl font-bold">$4,655.63</h3>
//               <p className="text-xs text-muted-foreground">2 invoices</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardContent className="flex items-center p-6">
//             <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-muted-foreground">Draft</p>
//               <h3 className="text-2xl font-bold">$4,627.13</h3>
//               <p className="text-xs text-muted-foreground">2 invoices</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setSelectedTab}>
//         <TabsList>
//           <TabsTrigger value="all">All <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">20</span></TabsTrigger>
//           <TabsTrigger value="paid">Paid <span className="ml-2 rounded-full bg-green-200 px-2 py-1 text-xs font-semibold">10</span></TabsTrigger>
//           <TabsTrigger value="pending">Pending <span className="ml-2 rounded-full bg-yellow-200 px-2 py-1 text-xs font-semibold">6</span></TabsTrigger>
//           <TabsTrigger value="overdue">Overdue <span className="ml-2 rounded-full bg-red-200 px-2 py-1 text-xs font-semibold">2</span></TabsTrigger>
//           <TabsTrigger value="draft">Draft <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">2</span></TabsTrigger>
//         </TabsList>
//       </Tabs>

//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center space-x-2">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 id="date"
//                 variant={"outline"}
//                 className={`w-[300px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {date?.from ? (
//                   date.to ? (
//                     <>
//                       {format(date.from, "LLL dd, y")} -{" "}
//                       {format(date.to, "LLL dd, y")}
//                     </>
//                   ) : (
//                     format(date.from, "LLL dd, y")
//                   )
//                 ) : (
//                   <span>Pick a date</span>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//               <Calendar
//                 initialFocus
//                 mode="range"
//                 defaultMonth={date?.from}
//                 selected={date}
//                 onSelect={setDate}
//                 numberOfMonths={2}
//               />
//             </PopoverContent>
//           </Popover>
//         </div>
//         <div className="relative">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search customer or invoice number..."
//             className="pl-8 w-[300px]"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="rounded-md border flex-grow overflow-hidden">
//         <Table>
//           <TableHeader className="bg-muted">
//             <TableRow>
//               <TableHead className="w-[50px]"></TableHead>
//               <TableHead>Customer</TableHead>
//               <TableHead>Create</TableHead>
//               <TableHead>Due</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Sent</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="w-[50px]"></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody className="overflow-y-auto">
//             {filteredInvoices.map((invoice) => (
//               <TableRow key={invoice.id}>
//                 <TableCell>
//                   <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center">
//                     <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
//                       <span className="text-primary-foreground font-semibold">{invoice.customer[0]}</span>
//                     </div>
//                     <div>
//                       <div className="font-medium">{invoice.customer}</div>
//                       <div className="text-sm text-muted-foreground">{invoice.id}</div>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   {format(invoice.createDate, 'dd MMM yyyy')}<br/>
//                   <span className="text-sm text-muted-foreground">{format(invoice.createDate, 'HH:mm')}</span>
//                 </TableCell>
//                 <TableCell>
//                   {format(invoice.dueDate, 'dd MMM yyyy')}<br/>
//                   <span className="text-sm text-muted-foreground">{format(invoice.dueDate, 'HH:mm')}</span>
//                 </TableCell>
//                 <TableCell>${invoice.amount.toFixed(2)}</TableCell>
//                 <TableCell>{invoice.sent}</TableCell>
//                 <TableCell>
//                   <span className={`px-2 py-1 rounded-full text-xs font-semibold
//                     ${invoice.status === 'Paid' ? 'bg-green-200 text-green-800' :
//                       invoice.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
//                       invoice.status === 'Overdue' ? 'bg-red-200 text-red-800' :
//                       'bg-gray-200 text-gray-800'}`}>
//                     {invoice.status}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <Button variant="ghost" size="icon">
//                     <MoreHorizontal className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           Showing {Math.min(rowsPerPage, filteredInvoices.length)} of {filteredInvoices.length} results
//         </div>
//         <div className="flex items-center space-x-6 lg:space-x-8">
//           <div className="flex items-center space-x-2">
//             <p className="text-sm font-medium">Rows per page</p>
//             <Select
//               value={rowsPerPage.toString()}
//               onValueChange={(value) => setRowsPerPage(parseInt(value))}
//             >
//               <SelectTrigger className="h-8 w-[70px]">
//                 <SelectValue placeholder={rowsPerPage} />
//               </SelectTrigger>
//               <SelectContent side="top">
//                 {[5, 10, 20, 30, 40, 50].map((pageSize) => (
//                   <SelectItem key={pageSize} value={pageSize.toString()}>
//                     {pageSize}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="flex w-[100px] items-center justify-center text-sm font-medium">
//             Page 1 of 1
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="outline"
//               className="hidden h-8 w-8 p-0 lg:flex"
//               onClick={() => {}}
//               disabled
//             >
//               <span className="sr-only">Go to first page</span>
//               <ChevronDown className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               className="h-8 w-8 p-0"
//               onClick={() => {}}
//               disabled
//             >
//               <span className="sr-only">Go to previous page</span>
//               <ChevronDown className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               className="h-8 w-8 p-0"
//               onClick={() => {}}
//               disabled
//             >
//               <span className="sr-only">Go to next page</span>
//               <ChevronUp className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               className="hidden h-8 w-8 p-0 lg:flex"
//               onClick={() => {}}
//               disabled
//             >
//               <span className="sr-only">Go to last page</span>
//               <ChevronUp className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import React, { useState } from 'react'
import { CalendarIcon, ChevronDown, ChevronUp, MoreHorizontal, Search, SlidersHorizontal } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock data
const invoices = [
  { id: 'INV-19919', customer: 'Amiah Pruitt', createDate: new Date('2024-09-08'), dueDate: new Date('2024-11-01'), amount: 2331.63, sent: 9, status: 'Paid' },
  { id: 'INV-19918', customer: 'Ariana Lang', createDate: new Date('2024-09-09'), dueDate: new Date('2024-10-31'), amount: 2372.93, sent: 4, status: 'Overdue' },
  { id: 'INV-19917', customer: 'Lawson Bass', createDate: new Date('2024-09-10'), dueDate: new Date('2024-10-30'), amount: 2283.97, sent: 9, status: 'Paid' },
  { id: 'INV-19916', customer: 'Selina Boyer', createDate: new Date('2024-09-11'), dueDate: new Date('2024-10-29'), amount: 2251.84, sent: 8, status: 'Pending' },
  { id: 'INV-19915', customer: 'Angelique Morse', createDate: new Date('2024-09-12'), dueDate: new Date('2024-10-28'), amount: 2343.51, sent: 11, status: 'Paid' },
]

export default function InvoiceManagement() {
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState(new Date(2024, 8, 1))
  const [endDate, setEndDate] = useState(new Date(2024, 8, 30))
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  const filteredInvoices = invoices.filter(invoice => {
    if (selectedTab !== 'all' && invoice.status.toLowerCase() !== selectedTab.toLowerCase()) {
      return false
    }
    if (searchTerm) {
      return (
        invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (startDate && endDate) {
      return invoice.createDate >= startDate && invoice.createDate <= endDate
    }
    return true
  })

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
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
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-6 space-x-4">
        <Card className="flex-1">
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <h3 className="text-2xl font-bold">$46,218.04</h3>
              <p className="text-xs text-muted-foreground">20 invoices</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Paid</p>
              <h3 className="text-2xl font-bold">$23,110.23</h3>
              <p className="text-xs text-muted-foreground">10 invoices</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <h3 className="text-2xl font-bold">$13,825.05</h3>
              <p className="text-xs text-muted-foreground">6 invoices</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overdue</p>
              <h3 className="text-2xl font-bold">$4,655.63</h3>
              <p className="text-xs text-muted-foreground">2 invoices</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Draft</p>
              <h3 className="text-2xl font-bold">$4,627.13</h3>
              <p className="text-xs text-muted-foreground">2 invoices</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">20</span></TabsTrigger>
          <TabsTrigger value="paid">Paid <span className="ml-2 rounded-full bg-green-200 px-2 py-1 text-xs font-semibold">10</span></TabsTrigger>
          <TabsTrigger value="pending">Pending <span className="ml-2 rounded-full bg-yellow-200 px-2 py-1 text-xs font-semibold">6</span></TabsTrigger>
          <TabsTrigger value="overdue">Overdue <span className="ml-2 rounded-full bg-red-200 px-2 py-1 text-xs font-semibold">2</span></TabsTrigger>
          <TabsTrigger value="draft">Draft <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">2</span></TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="start-date"
                variant={"outline"}
                className={`w-[180px] justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
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
                id="end-date"
                variant={"outline"}
                className={`w-[180px] justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
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
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customer or invoice number..."
              className="pl-8 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={true}>
                Customer
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={true}>
                Create Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={true}>
                Due Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={true}>
                Amount
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={true}>
                Status
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('customer')}>
                Customer {sortColumn === 'customer' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('createDate')}>
                Create Date {sortColumn === 'createDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('dueDate')}>
                Due Date {sortColumn === 'dueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('amount')}>
                Amount {sortColumn === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
                      <span className="text-primary-foreground font-semibold">{invoice.customer[0]}</span>
                    </div>
                    <div>
                      <div className="font-medium">{invoice.customer}</div>
                      <div className="text-sm text-muted-foreground">{invoice.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {format(invoice.createDate, 'dd MMM yyyy')}<br/>
                  <span className="text-sm text-muted-foreground">{format(invoice.createDate, 'HH:mm')}</span>
                </TableCell>
                <TableCell>
                  {format(invoice.dueDate, 'dd MMM yyyy')}<br/>
                  <span className="text-sm text-muted-foreground">{format(invoice.dueDate, 'HH:mm')}</span>
                </TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${invoice.status === 'Paid' ? 'bg-green-200 text-green-800' :
                      invoice.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                      invoice.status === 'Overdue' ? 'bg-red-200 text-red-800' :
                      'bg-gray-200 text-gray-800'}`}>
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {Math.min(rowsPerPage, sortedInvoices.length)} of {sortedInvoices.length} results
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
  )
}