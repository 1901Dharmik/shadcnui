import React, { useState, useEffect, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem, compareItems } from "@tanstack/match-sorter-utils";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { ChevronDown, ArrowUpDown, Star } from "lucide-react";
import { Checkbox } from "../components/ui/checkbox";
import CSVExportButton from "../components/CSVExportButton";
// import { Button, Checkbox, Input, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Modal } from "@/components/ui";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  X,
} from "lucide-react";

import { Badge } from "../components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  //   Breadcrumba,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  deleteAProduct,
  getProducts,
  resetState,
} from "../features/product/productSlice";
import CustomModel from "../components/ui/alert-dialog";

import { TrashIcon } from "@radix-ui/react-icons";
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
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

export default function Products() {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state?.product?.products);

  const data = useMemo(
    () =>
      productState &&
      productState?.map((product, index) => ({
        id: product._id,
        key: index + 1,
        index: index + 1,
        quantity: product.quantity, // Total quantity
        sold: product.sold || 0, // Sold items
        stock: product.quantity - (product.sold || 0), // Calculated stock
        category: product.category,
        rating: product.totalrating,
        title: product.title,
        description: product.description,
        price: `₹ ${product.price}`,
        image: product?.images[0]?.url,
      })),
    [productState]
  );
  const prepareExportData = () => {
    return data?.map((item) => ({
      Index: item.index,
      Title: item.title,
      Category: item.category,
      Price: item.price.replace("₹ ", ""),
      Rating: item.rating,
      "Total Quantity": item.quantity,
      "Sold Items": item.sold,
      "In Stock": item.stock,
    }));
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: ({ column }) => <Button variant="ghost">Index</Button>,
        cell: ({ row }) => <div>{row.getValue("index")}</div>,
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <img
                  src={row.getValue("image")}
                  alt="product"
                  className="w-[45px] h-[45px] rounded-sm object-cover cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                /> */}
                <Avatar className="rounded-sm">
                  <AvatarImage src={row.getValue("image")} />
                  <AvatarFallback className="rounded-sm"><span class="icon-[solar--hanger-2-bold-duotone] text-2xl text-muted-foreground"></span></AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="top" className="p-0 border-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={row.getValue("image")}
                    alt={"product"}
                    onError={(e) => (e.currentTarget.src = fallbackImage)}
                    className="w-[200px] h-[200px] object-cover"
                  />

                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col space-y-1 ">
            <div className="font-medium truncate">{row.getValue("title")}</div>
            <div className="flex items-center">
              <Badge
                variant="secondary"
                className="text-xs font-normal truncate"
              >
                {row.original.category}
              </Badge>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "rating",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ratings
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex justify-center text-lg">
            {row.getValue("rating")}{" "}
            <Star className="ml-2 h-6 w-6 fill-yellow-400 text-yellow-400" />
          </div>
        ),
      },

      {
        accessorKey: "stock",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const currentQuantity = row.original.quantity || 0;
          const sold = row.original.sold || 0;
          const totalQuantity = currentQuantity + sold;
          const percentage = (currentQuantity / totalQuantity) * 100;

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-[130px] space-y-1 cursor-pointer">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {currentQuantity} left out of {totalQuantity}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-green-200">
                      <div
                        className={`h-full rounded-full transition-all ${
                          percentage > 50
                            ? "bg-primary"
                            : percentage > 20
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="w-[200px]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total:</span>
                      <Badge variant="outline">{totalQuantity}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-500">Sold:</span>
                      <Badge variant="destructive">{sold}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-500">In Stock:</span>
                      <Badge variant="success" className="bg-primary">
                        {currentQuantity}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span>Remaining:</span>
                      <span
                        className={`font-bold ${
                          percentage > 50
                            ? "text-green-500"
                            : percentage > 20
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("price")}</div>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-2 flex items-center justify-center hover:text-primary transition-colors">
                  <span className="icon-[solar--eye-bold-duotone] text-xl bg-yellow-600 mr-1" />
                  View
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {row.getValue("title")}
                  </DialogTitle>
                  <DialogDescription>Product Details</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-5 gap-6 mt-6">
                  {/* Product Image */}
                  <div className="col-span-2">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={row.getValue("image")}
                        alt={row.getValue("title")}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="col-span-3 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge>{row.original.category}</Badge>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {row.original.rating}
                          </span>
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">
                        {row.getValue("title")}
                      </h3>
                      <p className="text-2xl font-bold text-primary">
                        {row.getValue("price")}
                      </p>
                    </div>

                    {/* Stock Info */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Stock Information</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-secondary/50">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-2xl font-bold">
                            {row.original.quantity + (row.original.sold || 0)}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-red-100">
                          <p className="text-sm text-red-600">Sold</p>
                          <p className="text-2xl font-bold text-red-600">
                            {row.original.sold || 0}
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-green-100">
                          <p className="text-sm text-green-600">In Stock</p>
                          <p className="text-2xl font-bold text-green-600">
                            {row.original.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Stock Level
                          </span>
                          <span className="font-medium">
                            {(
                              (row.original.quantity /
                                (row.original.quantity +
                                  (row.original.sold || 0))) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{
                              width: `${
                                (row.original.quantity /
                                  (row.original.quantity +
                                    (row.original.sold || 0))) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                      <Button variant="outline" className="w-full">
                        <Link
                          to={`/admin/product/${row.original.id}`}
                          className="flex items-center"
                        >
                          <span className="icon-[solar--pen-bold-duotone] text-xl mr-2" />
                          Edit Product
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => showModal(row.original.id)}
                      >
                        <span className="icon-[solar--trash-bin-minimalistic-bold-duotone] text-xl mr-2" />
                        Delete Product
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Link
              to={`/admin/product/${row.original.id}`}
              className="px-2 flex items-center justify-center"
            >
              <span class="icon-[solar--pen-bold-duotone] text-xl text-primary mr-1"></span>
              Edit
            </Link>

            <button
              className="ms-3 fs-3 text-danger border-0 bg-transparent px-2 flex items-center justify-center"
              onClick={() => showModal(row.original.id)}
            >
              <span class="icon-[solar--trash-bin-minimalistic-bold-duotone] text-xl text-red-500 mr-1"></span>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteProduct = (id) => {
    dispatch(deleteAProduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 300);
  };

  return (
    <>
      <div className="">
        <h3 className="mb-3 title text-2xl font-semibold">Products</h3>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter products..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            className="max-w-sm"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CSVExportButton
            data={prepareExportData()}
            filename="products-export.csv"
          />
          <Button onClick={() => navigate("/admin/product")} className="mx-4">
            <span class="icon-[solar--add-circle-linear] text-xl texte-muted mr-2"></span>
            Add Product
          </Button>
        </div>
        <div className="border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CustomModel
          title="Are you sure want to delete this product?"
          hideModal={hideModal}
          open={open}
          performAction={() => deleteProduct(productId)}
        />
      </div>
    </>
  );
}
