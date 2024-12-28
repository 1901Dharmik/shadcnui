import React, { useState, useEffect, useReducer, useMemo } from "react";
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
} from "@tanstack/match-sorter-utils";
import { Label } from "@/components/ui/label";
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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal, TextInput } from "flowbite-react";
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
//   lastName: ['vaghela', 'patel', 'jadav', 'raval', 'sharma'][Math.floor(Math.random() * 5)],
//   email: `user${index + 1}@example.com`,
// }));

const data = [
  {
    id: "1",
    firstName: "Elenora",
    lastName: "Wilkinson",
    company: "Feest - Reilly",
    city: "Hertaland",
    country: "Qatar",

    email: "dharmikvaghlela2003@gmail.com ",
    phone: "8490059352",
  },
  {
    id: "2",
    firstName: "Berneice",
    lastName: "Feil",
    company: "Deckow, Leuschke and Jaskolski",
    city: "Millcreek",
    country: "Nepal",

    email: "botor77714@kernuo.com",
    phone: "673492692898",
  },
  {
    id: "3",
    firstName: "Frieda",
    lastName: "Baumbach",
    company: "Heidenreich, Grady and Durgan",
    city: "Volkmanside",
    country: "Croatia",

    email: "kon@gmail.com",
    phone: "78294738897",
  },
  {
    id: "6",
    firstName: "Lysanne",
    lastName: "Fisher",
    company: "Schmidt LLC",
    city: "Malachitown",
    country: "Costa Rica",

    email: "pitamber@gmail.com",
    phone: "7843627489",
  },
  {
    id: "8",
    firstName: "Hollis",
    lastName: "Medhurst",
    company: "Quitzon Group",
    city: "West Sienna",
    country: "Papua New Guinea",

    email: "konta@gmail.com",
    phone: "8490059352",
  },
  {
    id: "9",
    firstName: "Arlo",
    lastName: "Buckridge",
    company: "Konopelski - Spinka",
    city: "Chino",
    country: "Congo",

    email: "hakunama@gmail.com",
    phone: "9662802050",
  },
  {
    id: "10",
    firstName: "Rickie",
    lastName: "Auer",
    company: "Lehner - Walsh",
    city: "Nyahfield",
    country: "Sudan",

    email: "tata@gmail.com",
    phone: "8490059352",
  },
  {
    id: "11",
    firstName: "Elenora",
    lastName: "Wilkinson",
    company: "Feest - Reilly",
    city: "Hertaland",
    country: "Qatar",

    email: "birla@gmail.com",
    phone: "9925845870",
  },
  {
    id: "12",
    firstName: "Berneice",
    lastName: "Feil",
    company: "Deckow, Leuschke and Jaskolski",
    city: "Millcreek",
    country: "Nepal",

    email: "nayka@gmail.com",
    phone: "9099776139",
  },
  {
    id: "14",
    firstName: "Zachery",
    lastName: "Brown",
    company: "Cormier - Skiles",
    city: "Faychester",
    country: "Saint Pierre and Miquelon",

    email: "foxcon@gmail.com",
    phone: "9723515939",
  },
  {
    id: "18",
    firstName: "Hollis",
    lastName: "Medhurst",
    company: "Quitzon Group",
    city: "West Sienna",
    country: "Papua New Guinea",

    email: "deepo@gmail.com",
    phone: "9988776655",
  },
  {
    id: "19",
    firstName: "Arlo",
    lastName: "Buckridge",
    company: "Konopelski - Spinka",
    city: "Chino",
    country: "Congo",

    email: "sahil@gmail.com",
    phone: "9987658765",
  },
  {
    id: "21",
    firstName: "Elenora",
    lastName: "Wilkinson",
    company: "Feest - Reilly",
    city: "Hertaland",
    country: "Qatar",

    email: "dharmikvaghlela2003@gmail.com ",
    phone: "8490059352",
  },
  {
    id: "22",
    firstName: "Berneice",
    lastName: "Feil",
    company: "Deckow, Leuschke and Jaskolski",
    city: "Millcreek",
    country: "Nepal",

    email: "botor77714@kernuo.com",
    phone: "673492692898",
  },
  {
    id: "23",
    firstName: "Frieda",
    lastName: "Baumbach",
    company: "Heidenreich, Grady and Durgan",
    city: "Volkmanside",
    country: "Croatia",

    email: "kon@gmail.com",
    phone: "78294738897",
  },
  {
    id: "62",
    firstName: "Lysanne",
    lastName: "Fisher",
    company: "Schmidt LLC",
    city: "Malachitown",
    country: "Costa Rica",

    email: "pitamber@gmail.com",
    phone: "7843627489",
  },
  {
    id: "82",
    firstName: "Hollis",
    lastName: "Medhurst",
    company: "Quitzon Group",
    city: "West Sienna",
    country: "Papua New Guinea",

    email: "konta@gmail.com",
    phone: "8490059352",
  },
  {
    id: "92",
    firstName: "Arlo",
    lastName: "Buckridge",
    company: "Konopelski - Spinka",
    city: "Chino",
    country: "Congo",

    email: "hakunama@gmail.com",
    phone: "9662802050",
  },
  {
    id: "102",
    firstName: "Rickie",
    lastName: "Auer",
    company: "Lehner - Walsh",
    city: "Nyahfield",
    country: "Sudan",

    email: "tata@gmail.com",
    phone: "8490059352",
  },
  {
    id: "222",
    firstName: "Elenora",
    lastName: "Wilkinson",
    company: "Feest - Reilly",
    city: "Hertaland",
    country: "Qatar",

    email: "birla@gmail.com",
    phone: "9925845870",
  },
  {
    id: "132",
    firstName: "Berneice",
    lastName: "Feil",
    company: "Deckow, Leuschke and Jaskolski",
    city: "Millcreek",
    country: "Nepal",

    email: "nayka@gmail.com",
    phone: "9099776139",
  },
  {
    id: "134",
    firstName: "Zachery",
    lastName: "Brown",
    company: "Cormier - Skiles",
    city: "Faychester",
    country: "Saint Pierre and Miquelon",

    email: "foxcon@gmail.com",
    phone: "9723515939",
  },
  {
    id: "138",
    firstName: "Hollis",
    lastName: "Medhurst",
    company: "Quitzon Group",
    city: "West Sienna",
    country: "Papua New Guinea",

    email: "deepo@gmail.com",
    phone: "9988776655",
  },
  {
    id: "193",
    firstName: "Arlo",
    lastName: "Buckridge",
    company: "Konopelski - Spinka",
    city: "Chino",
    country: "Congo",

    email: "sahil@gmail.com",
    phone: "9987658765",
  },
];
export default function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // model
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
  }

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
      // {
      //   accessorKey: "phone",
      //   header: "Phone No.",
      //   cell: ({ row }) => (
      //     <div className="capitalize">{row.getValue("phone")}</div>
      //   ),
      // },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
           phone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("phone")}</div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },

      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"));

          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
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
                // onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  {/* Copy payment ID */}
                  <Eye className="mr-3 h-5 w-5" />
                  Read
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setOpenModal(true)}>
                  <Pencil className="mr-3 h-5 w-5" />
                  Update
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <Trash2 className="mr-3 h-5 w-5" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
      {
        accessorKey: "id",
        filterFn: "equalsString",
      },
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        filterFn: "includesStringSensitive",
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        filterFn: "includesString",
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: "fullName",
        header: "Full Name",
        cell: (info) => info.getValue(),
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
    ],
    []
  );
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
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
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);
  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div>
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
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
        </div>
        <div className="rounded-md border">
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
                          asc: ' 🔼',
                          desc: ' 🔽',
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
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                // value={5}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
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
                onChange={(e) => {
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
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="#"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
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
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
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
