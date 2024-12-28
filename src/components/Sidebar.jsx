import React, { useState } from "react";
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
  PackageIcon,
  ChevronRightIcon,
  LayoutDashboard,
  FileText,
  Settings,
  ChevronRight,
  ChevronDown,
  User,
  List,
  PlusCircle,
  Edit,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation , useNavigate} from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";
import logo1 from "/images/logo1.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";

const CollapsibleSection = ({ title, icon, children, pathMatch }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(pathMatch);

  return (
    <Collapsible className="grid gap-4 my-4">
      <CollapsibleTrigger
        className={cn(
          "flex items-center rounded-lg gap-4 py-2.5 px-2 text-muted-foreground",
          "[&[data-state=open]>svg]:rotate-90",
          isActive && "bg-primary/10 text-primary"
        )}
      >
        {icon}
        {title}
        <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="-mx-6 grid gap-6 bg-muted p-8">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const CollapsibleLink = ({ to, title, description }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "group grid h-auto w-full justify-start gap-1 p-3 rounded-lg transition-all",
        isActive ? "bg-primary/10" : "hover:bg-primary/5"
      )}
      prefetch={false}
    >
      <div
        className={cn(
          "text-sm font-medium leading-none",
          isActive
            ? "text-primary"
            : "text-muted-foreground group-hover:text-primary group-hover:underline"
        )}
      >
        {title}
      </div>
      <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("Profile");
  const authState = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  console.log(authState, "authState");

  const permissions = authState?.role?.permissions || [];

  // Helper function to check if the user has a specific permission for a resource
  const hasPermission = (resource, action) => {
    const resourcePermissions = permissions.find(
      (perm) => perm.resource === resource
    );
    return resourcePermissions
      ? resourcePermissions.actions.includes(action)
      : false;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.history.replaceState(null, null, "/");
    window.location.href = "/";
  };

  // Function to check if a link is active
  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  // Common link styles
  const getLinkStyles = (path) => {
    return cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
      isLinkActive(path)
        ? "bg-primary/10 text-primary font-medium"
        : "text-muted-foreground hover:bg-muted hover:text-primary"
    );
  };

  return (
    <div className="mb-6">
      <div className="sticky top-0 flex h-14 items-center border-b px-4 lg:h-[61px] z-40 bg-opacity-50 backdrop-blur-sm  lg:px-6">
        {/* <a to="/admin" className="flex items-center gap-2 font-semibold ">
          <img src={logo1} className="h-full w-6 bg-muted z-40" alt="" />
          <span className="tex-bg ">SAJIVAN AYURVEDA</span>
          <br />
        </a> */}
        <div class="flex items-center space-x-2 ">
          <div class="flex items-center justify-center">
            <img src={logo1} alt="Logo" class="h-full w-6" />
          </div>

          <div class="flex flex-col text-center">
            <span class="text-lg font-bold tex-bg ">SAJIVAN</span>
            <Separator className="text-muted-foreground" />
            <span class="text-[10px] tracking-wide truncate">
              Ocean Of Ayurveda
            </span>
          </div>
        </div>
        <Button onClick={() => navigate("/admin/maintain")} variant="outline" size="icon" className="ml-auto bg-muted h-8 w-8">
        <span class="icon-[solar--settings-bold-duotone] text-xl bg-muted-foreground animate-spin-slow"></span>
          {/* <span class="icon-[solar--notification-unread-lines-bold-duotone] text-xl bg-gray-700"></span> */}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>

      <nav className="grid items-start px-2 text-md font-medium lg:px-4 space-y-2 mt-2 mb-12">
        <Link
          to="/admin/dashboard"
          className={getLinkStyles("/admin/dashboard")}
        >
          <span className="icon-[solar--window-frame-bold-duotone] text-2xl"></span>
          Dashboard
        </Link>

        <Link to="/admin" className={getLinkStyles("/admin")}>
          <span className="icon-[solar--chart-2-bold-duotone] text-2xl"></span>
          Analytics
        </Link>

        <Link
          to="/admin/order-list"
          className={getLinkStyles("/admin/order-list")}
        >
          <span className="icon-[solar--document-add-bold-duotone] text-2xl"></span>
          Orders
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </Link>

        <Link
          to="/admin/product-list"
          className={getLinkStyles("/admin/product-list")}
        >
          <span className="icon-[solar--card-2-bold-duotone] text-2xl"></span>
          Products
        </Link>

        <Link
          to="/admin/user-list"
          className={getLinkStyles("/admin/user-list")}
        >
          <span className="icon-[solar--user-bold-duotone] text-2xl"></span>
          Customers
        </Link>

        <Link
          to="/admin/category-list"
          className={getLinkStyles("/admin/category-list")}
        >
          <span className="icon-[solar--widget-2-bold-duotone] text-2xl"></span>
          Category
        </Link>

        <Link
          to="/admin/enquiries"
          className={getLinkStyles("/admin/enquiries")}
        >
          {/* <span className="icon-[solar--chat-line-bold-duotone] text-2xl"></span> */}
          <span class="icon-[duo-icons--info] text-2xl"></span>
          Enquiries
        </Link>

        <Link to="/admin/calender" className={getLinkStyles("/admin/calender")}>
          <span className="icon-[solar--calendar-bold-duotone] text-2xl"></span>
          Events
        </Link>

        <Link to="/admin/invoice" className={getLinkStyles("/admin/invoice")}>
          <span className="icon-[solar--bill-list-bold-duotone] text-2xl"></span>
          Invoice
        </Link>

        <Link
          to="/admin/role-management"
          className={getLinkStyles("/admin/role-management")}
        >
          <span className="icon-[solar--user-block-bold-duotone] text-2xl"></span>
          Roles & Permissions
        </Link>
        <Link
          to="/admin/brand-list"
          className={getLinkStyles("/admin/brand-list")}
        >
          {" "}
          <span className="icon-[solar--text-bold-square-bold-duotone] text-2xl "></span>
          Brand
        </Link>
        <Link
          to="/admin/activity-logs"
          className={getLinkStyles("/admin/activity-logs")}
        >
          {" "}
          <span className="icon-[solar--clock-circle-bold-duotone] text-2xl "></span>
          Activity Logs
        </Link>
        <Link to="/admin/delivery" className={getLinkStyles("/admin/delivery")}>
          {/* <span className="icon-[solar--delivery-bold-duotone] text-2xl "></span> */}
          <span class="icon-[solar--box-bold-duotone] text-2xl"></span>
          Curier Services
        </Link>
        <Link to="/admin/maintain" className={getLinkStyles("/admin/maintain")}>
          {/* <span className="icon-[solar--delivery-bold-duotone] text-2xl "></span> */}
          <span class="icon-[solar--settings-bold-duotone] text-2xl"></span>
          Maintainance
        </Link>
        {/* Brand */}
        {/* {hasPermission(authState, "brands", ["menuVisible"]) ? (
          <Link
            to="/admin/brand-list"
            className={getLinkStyles("/admin/brand-list")}
          >
            Brand
          </Link>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link to="#" className={getLinkStyles("/admin/brand-list")}>
                  <span className="icon-[solar--text-bold-bold-duotone] text-2xl "></span>
                  Brand
                  <div className="ml-auto flex  items-center justify-center bg-primary/10 p-[6px] rounded-full">
                  <span class="icon-[solar--lock-keyhole-bold-duotone] text-xl text-primary"></span>
                   
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="ml-8">
                You do not have permission to access this route.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )} */}

        {/* Coupon Section */}
        <CollapsibleSection
          title="Coupon"
          icon={
            <span className="icon-[solar--ticket-sale-bold-duotone] text-2xl"></span>
          }
          pathMatch="/admin/coupon"
        >
          <CollapsibleLink
            to="/admin/coupon"
            title="Add Coupon"
            description="View our full product catalog."
          />
          <CollapsibleLink
            to="/admin/coupon-list"
            title="Coupon List"
            description="Check out our latest product releases."
          />
        </CollapsibleSection>

        {/* Products Section */}
        <CollapsibleSection
          title="Products"
          icon={
            <span className="icon-[solar--card-2-bold-duotone] text-2xl"></span>
          }
          pathMatch="/admin/product"
        >
          <CollapsibleLink
            to="/admin/product-list"
            title="List"
            description="View our full product catalog."
          />
          <CollapsibleLink
            to="/admin/product/create"
            title="Create"
            description="Create a new product."
          />
          <CollapsibleLink
            to="/admin/product/edit"
            title="Edit"
            description="Edit existing products."
          />
          <CollapsibleLink
            to="/admin/product/details"
            title="Details"
            description="View product details."
          />
          <CollapsibleLink
            to="/admin/product/category"
            title="Category"
            description="Manage product categories."
          />
          <CollapsibleLink
            to="/admin/product/category-list"
            title="Category List"
            description="View all product categories."
          />
        </CollapsibleSection>

        {/* Blogs Section */}
        <CollapsibleSection
          title="Blogs"
          icon={
            <span className="icon-[solar--list-heart-minimalistic-bold-duotone] text-2xl"></span>
          }
          pathMatch="/admin/blog"
        >
          <CollapsibleLink
            to="/admin/addblog"
            title="Add Blog"
            description="Create a new blog post."
          />
          <CollapsibleLink
            to="/admin/blogs"
            title="Blog List"
            description="View all blog posts."
          />
          <CollapsibleLink
            to="/admin/addblogcat"
            title="Add Blog Category"
            description="Create a new blog category."
          />
          <CollapsibleLink
            to="/admin/blogcategory"
            title="Blog Category List"
            description="View all blog categories."
          />
        </CollapsibleSection>

        {/* Human Resources Section */}
        <CollapsibleSection
          title="Human Resources"
          icon={
            <span className="icon-[solar--users-group-two-rounded-bold-duotone] text-2xl"></span>
          }
          pathMatch="/admin/blog"
        >
          <CollapsibleLink
            to="/admin/blog/create"
            title="Add Blog"
            description="Create a new blog post."
          />
          <CollapsibleLink
            to="/admin/blogs"
            title="Employee List"
            description="View all blog posts."
          />
          <CollapsibleLink
            to="/admin/blog/category/create"
            title="Add Blog Category"
            description="Create a new blog category."
          />
          <CollapsibleLink
            to="/admin/blog/category/list"
            title="Blog Category List"
            description="View all blog categories."
          />
        </CollapsibleSection>

        {/* Lead Management */}
        <CollapsibleSection
          title=" Lead Management"
          icon={
            <span className="icon-[solar--document-text-bold-duotone] text-2xl"></span>
          }
          pathMatch="/admin/blog"
        >
          <CollapsibleLink
            to="/admin/blog/create"
            title="Add Blog"
            description="Create a new blog post."
          />
          <CollapsibleLink
            to="/admin/blogs"
            title="Employee List"
            description="View all blog posts."
          />
          <CollapsibleLink
            to="/admin/blog/category/create"
            title="Add Blog Category"
            description="Create a new blog category."
          />
          <CollapsibleLink
            to="/admin/blog/category/list"
            title="Blog Category List"
            description="View all blog categories."
          />
        </CollapsibleSection>

        {/* <Card className="text-muted-foreground bg-background w-64 mx-auto">
          <CardContent className="flex flex-col items-center pt-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt={authState?.firstname || "User"}
                  className="bg-green-100"
                />
                <AvatarFallback className="capitalize text-2xl">
                  {authState
                    ? authState.firstname.charAt(0) +
                      authState.lastname.charAt(0)
                    : "A"}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="mt-4 text-xl font-semibold capitalize text-center">
              {authState
                ? authState.firstname + " " + authState.lastname
                : "Admin"}
            </h2>
            <p className="text-xs text-muted-foreground text-center mt-1 w-full overflow-hidden">
              <span className="inline-block max-w-full truncate">
                {authState ? authState.email : "sajivan.com"}
              </span>
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogout} className="w-full" variant="outline">
              Logout
            </Button>
          </CardFooter>
        </Card> */}
      </nav>
    </div>
  );
};

export default Sidebar;
