import React, { useState, useEffect, Fragment } from "react";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  DollarSign,
  Activity,
  ArrowUpRight,
  CreditCard,
  Users,
  SearchIcon,
  X,
  CalendarIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Kbd } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import CommandMenu from "../ContextMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Badge } from "./badge";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Input } from "./input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./sheet";

import ModeToggle from "./ModeToggle";
const routes = [
  { name: "Home", path: "/" },
  { name: "DataTableDemo", path: "/datatabledemo" },
  { name: "Category", path: "/category" },
  { name: "Customer", path: "/customer" },
  { name: "OldDataTable", path: "/olddatatable" },
  { name: "Products", path: "/products" },
  { name: "Users", path: "/users" },
  { name: "StanStack", path: "/stack" },
  { name: "Product Edit", path: "/product-edit" },
  { name: "Product List", path: "/productlist" },
  { name: "Login", path: "/auth/login" },
  { name: "Register", path: "/auth/register" },
];
const resources = [
  {
    title: "Documentation",
    href: "/docs",
    description: "Learn how to use our product",
  },
  { title: "Guides", href: "/guides", description: "Step-by-step tutorials" },
  {
    title: "API",
    href: "/api",
    description: "API documentation and references",
  },
];
import { NavLink } from "react-router-dom";
// import { routes } from '../../router'
const Header = ({ isSidebarVisible, toggleSidebar }) => {
  const authState = useSelector((state) => state.auth.user);
  let [isOpen, setIsOpen] = useState(false);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filtered = routes.filter((route) =>
      route.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRoutes(filtered);
  };

  const handleRouteClick = (path) => {
    setQuery("");
    setFilteredRoutes([]);
    navigate(path);
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "q" && (event.ctrlKey || event.metaKey)) {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  console.log("authenticated", authState);

  return (
    <div>
      {/* className=" flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 " */}
      <div className="flex h-12 items-center my-1 lg:my-0 justify-between gap-4 px-4 lg:h-[60px] lg:px-6 ">
        <>
          <Sheet className="lg:hidden">
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                {/* <Menu className="h-6 w-6" /> */}
                <span class="icon-[solar--hamburger-menu-line-duotone] h-7 w-8 "></span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col h-screen overflow-auto"
            >
              <nav
                className="grid gap-2 text-lg font-medium 
            "
              >
                <a
                  href="#"
                  className="flex items-center gap-2 text-xl font-semibold mb-4"
                >
                  <Package2 className="h-6 w-6" />
                  Acme Inc
                  <span className="sr-only">Acme Inc</span>
                </a>
                {/* {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `mx-[-0.65rem] border-b border-dashed border-gray-200 flex items-center gap-4 px-3 py-2 text-[16px] transition-all ${
                      isActive
                        ? "bg-muted text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                  onClick={() => handleRouteClick(route.path)}
                >
                  <Home className="h-5 w-5" />
                  {route.name}
                </NavLink>
              ))} */}
                {routes.map((route) => (
                  <>
                    <SheetClose
                      key={route.name}
                      onClick={() => handleRouteClick(route.path)}
                      className="mx-[-0.65rem] border-b border-dashed border-gray-200 flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground text-[16px]
               "
                    >
                      <Home className="h-5 w-5" />
                      {route.name}
                    </SheetClose>
                    {/* <DropdownMenuSeparator /> */}
                  </>
                ))}
                {/* <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Products
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Customers
              </a>
              <a
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Analytics
              </a> */}

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that matches the other
                      components&apos; aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It&apos;s animated by default, but you can disable it
                      if you prefer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4 cursor-pointer ">
            {/* {isSidebarVisible ? (
              <span
                class="icon-[solar--logout-3-bold-duotone] h-6 w-6 text-foreground/75"
                onClick={toggleSidebar}
              ></span>
            ) : (
              <span
                class="icon-[solar--login-3-bold-duotone] h-6 w-6 text-foreground/75"
                onClick={toggleSidebar}
              ></span>
            )} */}
            <img src="/images/logo.png" alt="no image found" className="h-14" />
          </div>
          {/* <div className="w-full flex-1">
            <form onClick={() => setIsOpen(true)}>
              <div className="relative">
                <form class="max-w-[250px]">
                  <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <Input
                      // type="search"
                      // id="default-search"
                      // class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-white-500 focus:border-white-500 dark:bg-muted/40 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500"
                      placeholder="      Search Pages ..."
                      required
                    />

                    <Badge class="absolute end-1 top-1 px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-md dark:bg-black dark:text-gray-100 dark:border-gray-500 dark:bg-muted/40 hidden lg:block md:block xl:block">
                      Ctrl + Q
                    </Badge>
                  </div>
                </form>
              </div>
            </form>
          </div> */}

          {/* search Bar */}
          <div>
            <Transition show={isOpen} as={Fragment}>
              <Dialog
                className="fixed inset-0 pt-[20vh] p-4 overflow-y-auto"
                open={isOpen}
                onClose={() => setIsOpen(false)}
              >
                <TransitionChild
                  as="div"
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 "
                  enterTo="opacity-100 "
                  leave="ease-in "
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="fixed inset-0 bg-muted/40 backdrop-blur-sm" />
                </TransitionChild>
                <TransitionChild
                  as="div"
                  enter="transition ease-in-out "
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in-out "
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Combobox
                    as="div"
                    className="relative rounded-2xl shadow-2xl ring-1 ring-black/5 max-w-md mx-auto bg-white divide-y divide-gray-100 overflow-hidden"
                    value={filteredRoutes}
                    //   onChange={setSelectedPerson}
                    onClose={() => setQuery("")}
                    onChange={(route) => {
                      handleRouteClick(route.path);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center px-4">
                      <SearchIcon className="h-6 w-6 text-gray-500" />
                      <ComboboxInput
                        aria-label="Assignee"
                        // displayValue={(route) => route?.name}
                        //   onChange={(event) => setQuery(event.target.value)}

                        onChange={handleInputChange}
                        // value={quary}
                        className="w-full bg-transparent border-0 focus:ring-0 text-lg text-gray-800 placeholder:text-gray-400 h-12"
                        placeholder="search for Pages ..."
                      />
                      {/* <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-500 dark:text-gray-100 dark:border-gray-500">
                  Ctrl
                </kbd>{" "}
                <span className="text-black px-1">+</span>{" "}
                <kbd class="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-500 dark:text-gray-100 dark:border-gray-500">
                  Q
                </kbd> */}
                      <button
                        className="ml-2 dark:text-black"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    {filteredRoutes.length > 0 && (
                      <ComboboxOptions className="py-4 text-lg max-h-64 overflow-auto">
                        {filteredRoutes.map((route) => (
                          <>
                            <ComboboxOption
                              className="px-4 cursor-pointer"
                              data-active
                              key={route.path}
                              onClick={() => {
                                handleRouteClick(route.path);
                              }}
                              value={route}
                            >
                              <div
                                className="space-x-1  px-2 py-2 bg-white hover:bg-gray-100 rounded-2xl
                        hover:border-2"
                              >
                                <span className="text-md font-md text-gray-900">
                                  {route.name}
                                </span>
                                <span className="absolute mt-1 right-8 text-sm text-gray-500">
                                  {route.path}
                                </span>
                              </div>
                            </ComboboxOption>
                          </>
                        ))}
                      </ComboboxOptions>
                    )}
                    {query && filteredRoutes.length === 0 && (
                      <p className="p-4">No Result Found</p>
                    )}
                  </Combobox>
                </TransitionChild>
              </Dialog>
            </Transition>
          </div>
          <div className="flex justify-end gap-2">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </a>
              <a
                href="#"
                className="text-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </a>

              <HoverCard>
                <HoverCardTrigger>Hover</HoverCardTrigger>
                <HoverCardContent>
                  The React Framework – created and maintained by @vercel.
                </HoverCardContent>
              </HoverCard>
            </nav>

            <CommandMenu />
            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="">
                  <span className="icon-[solar--user-bold-duotone] text-2xl"></span>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-xs">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex justify-between space-x-4 py-2">
                    <Avatar className="capitalize">
                      <AvatarImage src="" />
                      <AvatarFallback className=" bg-primary text-primary-foreground">
                        {" "}
                        {authState?.firstname[0] + authState?.lastname[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium capitalize">
                        {" "}
                        {authState
                          ? authState?.firstname + " " + authState?.lastname
                          : "Admin"}
                      </h4>
                      <p className="text-xs">
                        {authState ? authState?.email : "sajivan.com"}
                      </p>
                      {/* <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div> */}
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Change Password</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  {" "}
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      </div>
    </div>
  );
};

export default Header;
