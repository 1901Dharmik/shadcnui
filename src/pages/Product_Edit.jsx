// import Image from "next/image"
// import a from "next/a"
import React, { Fragment } from "react";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "../components/ui/badge";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Textarea } from "../components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";

const Product_Edit = () => {
  return (
    <div>
      <div className="flex min-h-screen w-full flex-col ">
        <div className="flex flex-col ">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-full flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Pro Controller
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  In stock
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm">Save Product</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 ">
                  <Card x-chunk="dashboard-07-chunk-0 ">
                    <CardHeader>
                      <CardTitle>Customer Details</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="name">Customer_Name</Label>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="Gamer Gear Pro Controller"
                            />
                          </div>
                          <div>
                            <Label htmlFor="number">Customer_No</Label>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="8490059352"
                            />
                          </div>
                          <div>
                            <Label htmlFor="alt no">Alt_No</Label>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="Alternative No"
                            />
                          </div>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="Address">Address </Label>
                          <Textarea
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                            className="min-h-24 text-md"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="Near By Area">Near By Area </Label>
                          <Textarea
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                            className="min-h-20 text-md"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="City">City</Label>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="Ahmedabad"
                            />
                          </div>
                          <div>
                            <Label htmlFor="State">State / Province</Label>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="Gujarat"
                            />
                          </div>

                          <div>
                            <Label htmlFor="ZIP">ZIP / Postal code</Label>
                            <Input
                              type="text"
                              className="w-full"
                              placeholder="382481"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Order Details</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">
                              Products Name{" "}
                            </TableHead>
                            <TableHead className="w-[100px]">
                              Quantity
                            </TableHead>
                            {/* <TableHead>Price</TableHead> */}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-semibold">
                            Icerose_Powder
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-1" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-1"
                                type="number"
                                defaultValue="0"
                              />
                            </TableCell>
                            {/* <TableCell>
                            <Label htmlFor="price-1" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-1"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell> */}
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                            Gasofine_Powder
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-2" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-2"
                                type="number"
                                defaultValue="0"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                            Refresh_Churna
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-3" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-3"
                                type="number"
                                defaultValue="0"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                            Amrutam_Teblet
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-3" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-3"
                                type="number"
                                defaultValue="0"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                            Lexolite_Teblet
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-3" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-3"
                                type="number"
                                defaultValue="0"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold">
                            Constirelex_Powder
                            </TableCell>
                            <TableCell>
                              <Label htmlFor="stock-3" className="sr-only">
                                Stock
                              </Label>
                              <Input
                                id="stock-3"
                                type="number"
                                defaultValue="0"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="justify-center border-t p-4   ">
                      {/* <Button size="sm" variant="ghost" className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        Total price
                      </Button> */}
                      <Label className='w-[100px] font-semibold text-lg'>Total price :</Label>
                      <Input className='w-[150px]' placeholder="2400" name="Total Price" />
                    </CardFooter>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle>Product Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 sm:grid-cols-3">
                        <div className="grid gap-3">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger
                              id="category"
                              aria-label="Select category"
                            >
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clothing">Clothing</SelectItem>
                              <SelectItem value="electronics">
                                Electronics
                              </SelectItem>
                              <SelectItem value="accessories">
                                Accessories
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="subcategory">
                            Subcategory (optional)
                          </Label>
                          <Select>
                            <SelectTrigger
                              id="subcategory"
                              aria-label="Select subcategory"
                            >
                              <SelectValue placeholder="Select subcategory" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="t-shirts">T-Shirts</SelectItem>
                              <SelectItem value="hoodies">Hoodies</SelectItem>
                              <SelectItem value="sweatshirts">
                                Sweatshirts
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Product Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="status">Status</Label>
                          <Select>
                            <SelectTrigger
                              id="status"
                              aria-label="Select status"
                            >
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Active</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <img
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src="/placeholder.svg"
                          width="300"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <button>
                            <img
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </button>
                          <button>
                            <img
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src="/placeholder.svg"
                              width="84"
                            />
                          </button>
                          <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-5">
                    <CardHeader>
                      <CardTitle>Archive Product</CardTitle>
                      <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div></div>
                      <Button size="sm" variant="secondary">
                        Archive Product
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Save Product</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Product_Edit;
