import React, {  useState, useEffect, useReducer, useMemo  } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";
import {
  //   RankingInfo,
    rankItem,
    compareItems,
    
  } from '@tanstack/match-sorter-utils';
  
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { ArrowUpDown, ChevronDown, MoreHorizontal, ListFilter,PlusCircle,File, } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
// 
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

// 
// const data = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     email: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     email: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     amount: 874,
//     status: "success",
//     email: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },
//   {
//     id: "bhqeuj4p",
//     amount: 791,
//     status: "failed",
//     email: "cahuihda@hotmail.com",
//   },
// ];
// const data = Array.from({ length: 50 }, (_, index) => ({
//   id: `TASK-${index + 1}`,
//   amount: (Math.random() * 1000).toFixed(2),
//   status: ['In Progress', 'Backlog', 'Todo', 'Canceled', 'Done'][Math.floor(Math.random() * 5)],
//   firstName: ['Ashish', 'Merubhai', 'RajuBhai', 'Dharmik', 'Deep'][Math.floor(Math.random() * 5)],
//     lastName: ['vaghela', 'patel', 'jadav', 'raval', 'sharma'][Math.floor(Math.random() * 5)],
//   email: `user${index + 1}@example.com`,
// }));

export default function OldDataTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [notes, setNotes] = useState(null);
  const [originalRows, setOriginalRows] = useState('not added ');
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    // Fetch the notes
    const res = await axios.get("http://localhost:8000/notes");
   

    // Set to state
    // setNotes(res.data.notes);
    setOriginalRows(res.data.notes);
    console.log(res.data.notes)
  };


  const columns = useMemo(
    () =>[
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
       
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  
  
    {
      accessorKey: "Customer_Name",
      header: "Customer_Name",
      cell: ({ row }) => (
        <div className="capitalize px-2 py-1 rounded bg-green-100 text-green-800">{row.getValue("Customer_Name")}</div>
      ),
    },
    {
      accessorKey: "Customer_No",
      header: "Customer_No",
      cell: ({ row }) => (
        <div className="capitalize px-2 py-1 rounded bg-green-100 text-green-800">{row.getValue("Customer_No")}</div>
      ),
    },
    
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize px-2 py-1 rounded bg-green-100 text-green-800">{row.getValue("Status")}</div>
      ),
    },
    {
      accessorKey: "Time",
      header: "Time",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Time")}</div>
      ),
    },
    {
      accessorKey: "Type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Type")}</div>
      ),
    },
    {
      accessorKey: "Method",
      header: "Method",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Method")}</div>
      ),
    },
    {
      accessorKey: "Date",
      header: "Date",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Date")}</div>
      ),
    },
    {
      accessorKey: "Agent",
      header: "Agent",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Agent")}</div>
      ),
    },
  
    {
      accessorKey: "Alt_No",
      header: "Alt_No",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Alt_No")}</div>
      ),
    },
    {
      accessorKey: "Address",
      header: "Address",
      cell: ({ row }) => (
        <div className="capitalize ">{row.getValue("Address")}</div>
      ),
    },
    {
      accessorKey: "Area",
      header: "Area",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Area")}</div>
      ),
    },
    {
      accessorKey: "State",
      header: "State",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("State")}</div>
      ),
    },
    {
      accessorKey: "Pincode",
      header: "Pincode",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Pincode")}</div>
      ),
    },
    {
      accessorKey: "City",
      header: "City",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("City")}</div>
      ),
    },
    {
      accessorKey: "Price",
      header: "Price",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Price")}</div>
      ),
    },
    {
      accessorKey: "Disease",
      header: "Disease",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Disease")}</div>
      ),
    },
    {
      accessorKey: "Gasofine_Powder",
      header: "Gasofine_Powder",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Gasofine_Powder")}</div>
      ),
    },
    {
      accessorKey: "Refresh_Churna",
      header: "Refresh_Churna",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Refresh_Churna")}</div>
      ),
    },
    {
      accessorKey: "Constirelex_Powder",
      header: "Constirelex_Powder",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Constirelex_Powder")}</div>
      ),
    },
    {
      accessorKey: "Icerose_Powder",
      header: "Icerose_Powder",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Icerose_Powder")}</div>
      ),
    },
    {
      accessorKey: "Lexolite_Teblet",
      header: "Lexolite_Teblet",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Lexolite_Teblet")}</div>
      ),
    },
    {
      accessorKey: "Amrutam_Teblet",
      header: "Amrutam_Teblet",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Amrutam_Teblet")}</div>
      ),
    },
    {
      accessorKey: "Courier",
      header: "Courier",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Courier")}</div>
      ),
    },
    {
      accessorKey: "Tracking_id",
      header: "Tracking_id",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Tracking_id")}</div>
      ),
    },
    {
      accessorKey: "Agent1",
      header: "Agent1",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Agent1")}</div>
      ),
    },
    {
      accessorKey: "Remarks1",
      header: "Remarks1",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Remarks1")}</div>
      ),
    },
    {
      accessorKey: "Date1",
      header: "Date1",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("Date1")}</div>
      ),
    },
   
  
    {
      accessorKey: "Prepaid_amount",
      header: () => <div className="text-right">Prepaid_amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("Prepaid_amount"));
  
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "INR",
        }).format(amount);
  
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    // {
    //   accessorKey: 'id',
    //   filterFn: 'equalsString',
    // },
    // {
    //   accessorKey: 'firstName',
    //   cell: info => info.getValue(),
    //   filterFn: 'includesStringSensitive',
    // },
    // {
    //   accessorFn: row => row.lastName,
    //   id: 'lastName',
    //   cell: info => info.getValue(),
    //   header: () => <span>Last Name</span>,
    //   filterFn: 'includesString',
    // },
    // {
    //   accessorFn: row => `${row.firstName} ${row.lastName}`,
    //   id: 'fullName',
    //   header: 'Full Name',
    //   cell: info => info.getValue(),
    //   filterFn: 'fuzzy',
    //   sortingFn: fuzzySort,
    // },
  ],
  []
  )
  
  const table = useReactTable({
    // data:notes,
    data: originalRows || [],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy',
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <div>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="p-2 ml-2 font-lg  border rounded-lg bg-white dark:bg-black border-block"
          placeholder="Search all columns..."
        />
        
      </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-4 flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-10 gap-1">
                      <ListFilter className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-10 gap-1">
                  <File className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-10 gap-1">
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button>
              </div>
      </div>
      
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                           {/* {header.isPlaceholder ? null : (
                    <>
                      <div
                        className={
                          header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' up',
                          desc: ' down',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} />

                        </div>
                      ) : null}
                    </>
                  )} */}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    
        <div className="flex items-center justify-between mt-4 px-2 ">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[ 5,10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="flex items-center gap-1">
          | Go to page:
         
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border rounded-sm w-16 dark:bg-black bg-white px-3"
          />
        </span>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    
    </div>
  );
}
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input  {...props} value={value} onChange={e => setValue(e.target.value)} />
  );
}
// function Filter({ column }) {
//   const columnFilterValue = column.getFilterValue();

//   return (
//     <DebouncedInput
//       type="text"
//       value={(columnFilterValue ?? '')}
//       onChange={value => column.setFilterValue(value)}
//       placeholder={`Search...`}
//       className="w-28 rounded-lg border dark:bg-black mt-2 bg-white"
//     />
//   );
// }