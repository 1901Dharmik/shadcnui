import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { config } from "../utils/axiosconfig";
import { base_url } from "../utils/base_url"
import { Badge } from "@/components/ui/badge";

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [fullName, setFullName] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchUsers();
  }, [page, limit, fullName, sortField, sortOrder]);

  const fetchUsers = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: sortField,
        order: sortOrder,
      });

      if (fullName) queryParams.append("fullname", fullName);
      // if (mobile) queryParams.append("mobile", mobile);
      const response = await fetch(
        `${base_url}user/all-users?${queryParams}`,
        config
      );
      const data = await response.json();
      console.log("Fetched data:", data);

      if (data.users && Array.isArray(data.users)) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers || 0);
        setTotalPages(data.totalPages || 1);
      } else {
        console.error("Invalid data structure:", data);
        setUsers([]);
        setTotalUsers(0);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  return (
    <div className="space-y-2">
      <Breadcrumb className="hidden md:flex mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="#" className="text-xl">
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl">Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-end items-center w-80 space-x-4">
        <Input
          placeholder="Search by Full Name"
          value={fullName}
          onChange={handleFullNameChange}
        />
      </div>
      <div className="border">
        <Table className="relative ">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              {/* <TableHead className="w-[50px]"></TableHead> */}
              <TableHead className="">Index</TableHead>
              <TableHead
                className="lext-left"
                onClick={() => handleSort("firstname")}
              >
                Name
              </TableHead>
              <TableHead
                className="text-left"
                onClick={() => handleSort("email")}
              >
                Email
              </TableHead>
              <TableHead
                className="text-right"
                onClick={() => handleSort("role")}
              >
                Role
              </TableHead>
              <TableHead
                className="text-right"
                onClick={() => handleSort("createdAt")}
              >
                Created At
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>

              {/* <TableHead className="w-[50px]"></TableHead> */}
            </TableRow>
          </TableHeader>
        </Table>
        <div className="overflow-auto max-h-[560px]">
          <Table>
            <TableBody>
              {users
               
                ?.map((user, index) => (
                  <TableRow key={user._id}>
                    {/* <TableCell>{index + 1}</TableCell> */}
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center">
                        <div className="w-8 h-8 capitalize rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center mr-2">
                          {user.firstname?.[0] || ""}
                        </div>
                        <div>
                          <div
                            className="font-medium"
                            onClick={() => navigate(`/admin/user/${user?._id}`)}
                          >
                            <span className="text-md font-medium capitalize">
                              {user?.firstname} {user?.lastname}
                            </span>
                            <br />
                            <span className="text-md text-gray-500">
                              {user?.mobile}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Badge className="capitalize ">{user?.role?.name}</Badge></TableCell>

                    {/* <TableCell>
                      {user.createdAt
                        ? format(new Date(user.createdAt), "dd MMM yyyy")
                        : "N/A"}
                    </TableCell> */}
                    <TableCell>
                      <span className="text-md font-medium">
                        {format(user?.createdAt, "dd MMM yyyy")}
                      </span>
                      <br />
                      <span className="text-md text-gray-500">
                        {format(user?.createdAt, "hh:mm:ss a")}
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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => navigate(`/admin/user/${user?._id}`)}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit user</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Delete user</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span>
            Showing {(page - 1) * limit + 1} to{" "}
            {/* {Math.min(page * limit, totalUsers)} of {totalUsers} users */}
            {Math.min(page * limit)} users
          </span>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setPage(1)} disabled={page === 1}>
            First
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
          <Button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}
