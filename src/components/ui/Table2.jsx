import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  //   RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  ListFilter,
  PlusCircle,
  File,
} from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const columns = [
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
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          style={{ cursor: "pointer" }}
        >
          {row.getIsExpanded() ? "👇" : "👉"}
        </button>
      ) : (
        "🔵"
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row, getValue }) => (
      <div
        style={{
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        {getValue()}
      </div>
    ),
    footer: (props) => props.column.id,
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
  },

  {
    accessorKey: "age",
    header: () => "Age",
    footer: (props) => props.column.id,
  },

  {
    accessorKey: "visits",
    header: () => <span>Visits</span>,
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "status",
    header: "Status",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "progress",
    header: "Profile Progress",
    footer: (props) => props.column.id,
  },
];
const orderData = {
  orderId: "123456",
  customer: {
    customerId: "78910",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "555-555-5555",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
  },
  orderDate: "2023-06-07T12:34:56Z",
  status: "shipped",
  items: [
    {
      itemId: "1001",
      productName: "Widget A",
      quantity: 2,
      price: 19.99,
      total: 39.98,
    },
    {
      itemId: "1002",
      productName: "Widget B",
      quantity: 1,
      price: 24.99,
      total: 24.99,
    },
  ],
  subtotal: 64.97,
  shippingCost: 5.0,
  tax: 4.55,
  total: 74.52,
  payment: {
    method: "credit card",
    transactionId: "abc123xyz",
  },
  shipping: {
    method: "Standard Shipping",
    trackingNumber: "1Z999AA10123456784",
    estimatedDelivery: "2023-06-10",
  },
};
const makeData = () =>
  Array.from({ length: 50 }, (_, index) => ({
    id: `TASK-${index + 1}`,
    amount: (Math.random() * 1000).toFixed(2),
    status: ["In Progress", "Backlog", "Todo", "Canceled", "Done"][
      Math.floor(Math.random() * 5)
    ],
    firstName: ["Ashish", "Merubhai", "RajuBhai", "Dharmik", "Deep"][
      Math.floor(Math.random() * 5)
    ],
    lastName: ["vaghela", "patel", "jadav", "raval", "sharma"][
      Math.floor(Math.random() * 5)
    ],
    email: `user${index + 1}@example.com`,
    age: (Math.random() * 130).toFixed(),
    visits: (Math.random() * 100).toFixed(),
    progress: (Math.random() * 100).toFixed(),
  }));
const TableData = ({ data, columns, renderSubComponent, getRowCanExpand }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
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
//controll footer
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlFooter = () => {
    if (window.scrollY > lastScrollY) {
      // Scroll down
      setIsVisible(false);
    } else {
      // Scroll up
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlFooter);
    return () => {
      window.removeEventListener('scroll', controlFooter);
    };
  }, [lastScrollY]);

  return (
    <div className="p-2">
      <div className="flex items-center py-4">
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
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
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
      <div className="" />
      <Table>
        <TableHeader className="px-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Fragment>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length}>
                      {renderSubComponent({ row })}
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <div className="h-2 " />
      <div className={`fixed bottom-0 left-0 z-40 grid grid-cols-5 justify-around items-center mt-4 px-12 w-full  h-16 bg-muted ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
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
        </div>
        <div className="">
          <span className="">
            | Go to page:
            <input        
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border mx-2 rounded-sm w-16 h-8 dark:bg-black bg-white px-3"
            />
          </span>
        </div>
        <div className="">
          <div className="">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2">
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
        {/* <div className=" flex-1 text-sm text-muted-foreground">
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
          <div className="flex w-[100px] items-center
                  justify-center text-sm font-medium">
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
        </div> */}
      </div>
      {/* <div>{table.getRowModel().rows.length} Rows</div> */}
    </div>
  );
};

const renderSubComponent = ({ row }) => {
  return (
    <pre style={{ fontSize: "20px" }}>
      {/* <TableRow> */}
      {/* {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
            })} */}

      {/* </TableRow> */}

      <OrderDetail order={orderData} />
      <code>{JSON.stringify(row.original, null, 2)}</code>
    </pre>
  );
};
// const renderSubComponent = ({ row }) => {
//   const data = row.original;
//   const tableRow = [];

//   for (const key in data) {
//     if (Object.prototype.hasOwnProperty.call(data, key)) {
//       tableRow.push(<td key={key}>{data[key]}</td>);
//     }
//   }

//   return (
//     <pre style={{ fontSize: '20px' }}>
//       <TableRow>{tableRow}</TableRow>
//     </pre>
//   );
// };

// const renderSubComponent = ({ row }) => {
//   const data = row.original;
//   const tableRow = [];

//   for (const key in data) {
//     if (Object.prototype.hasOwnProperty.call(data, key)) {
//       tableRow.push(
//         <TableRow key={key}>
//           <TableCell>{key}</TableCell>
//           <TableCell>{data[key]}</TableCell>
//         </TableRow>
//       );
//     }
//   }

//   return (
//     <Table style={{ fontSize: '20px' }}>
//       <TableBody>{tableRow}</TableBody>
//     </Table>
//   );
// };
export default function Tables2() {
  const [data] = React.useState(() => makeData(10));

  return (
    <TableData
      data={data}
      columns={columns}
      getRowCanExpand={() => true}
      renderSubComponent={renderSubComponent}
    />
  );
}

const OrderDetail = ({ order }) => {
  return (
    <>
      <div>
        <h1>Order Details</h1>
        <h2>Order ID: {order.orderId}</h2>
        <div>
          <h3>Customer Information</h3>
          <p>
            <strong>Name:</strong> {order.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.customer.phone}
          </p>
          <p>
            <strong>Address:</strong> {order.customer.address.street},{" "}
            {order.customer.address.city}, {order.customer.address.state}{" "}
            {order.customer.address.zip}, {order.customer.address.country}
          </p>
        </div>
        <div>
          <h3>Order Information</h3>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item) => (
              <li key={item.itemId}>
                <p>
                  <strong>Product Name:</strong> {item.productName}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </p>
                <p>
                  <strong>Total:</strong> ${item.total.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Payment Information</h3>
          <p>
            <strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Shipping Cost:</strong> ${order.shippingCost.toFixed(2)}
          </p>
          <p>
            <strong>Tax:</strong> ${order.tax.toFixed(2)}
          </p>
          <p>
            <strong>Total:</strong> ${order.total.toFixed(2)}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.payment.method}
          </p>
          <p>
            <strong>Transaction ID:</strong> {order.payment.transactionId}
          </p>
        </div>
        <div>
          <h3>Shipping Information</h3>
          <p>
            <strong>Shipping Method:</strong> {order.shipping.method}
          </p>
          <p>
            <strong>Tracking Number:</strong> {order.shipping.trackingNumber}
          </p>
          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {order.shipping.estimatedDelivery}
          </p>
        </div>
      </div>
    </>
  );
};
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};
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
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
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
