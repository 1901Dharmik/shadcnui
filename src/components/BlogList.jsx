import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  ChevronDown,
  MessageSquare,
  Eye,
  Share2,
  MoreHorizontal,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { deleteABlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Bloglist() {
  // State management
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [publishStatus, setPublishStatus] = useState(searchParams.get("publish") || "all");
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [itemsPerPage] = useState(3);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get blogs with filters
  useEffect(() => {
    const filters = {
      page: currentPage,
      limit: itemsPerPage,
      publish: publishStatus !== "all" ? publishStatus : undefined,
      search: searchTerm || undefined,
    };

    // Update URL params
    setSearchParams({
      page: currentPage.toString(),
      ...(publishStatus !== "all" && { publish: publishStatus }),
      ...(searchTerm && { search: searchTerm }),
    });

    dispatch(resetState());
    dispatch(getBlogs(filters));
  }, [dispatch, currentPage, publishStatus, searchTerm, itemsPerPage]);

  const getBlogState = useSelector((state) => state.blog.blogs);
  const totalBlogs = useSelector((state) => state.blog.totalBlogs) || 0;
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  // Search handler with debounce
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter handler
  const handleFilterChange = (value) => {
    setPublishStatus(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Modal handlers
  const showModal = (id) => {
    setOpen(true);
    setBlogId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteBlog = async () => {
    await dispatch(deleteABlog(blogId));
    dispatch(getBlogs());
    setOpen(false);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Blog List</h1>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="mr-2 h-4 w-4" /> New post
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <Input
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-64"
        />
        <Tabs value={publishStatus} onValueChange={handleFilterChange}>
          <TabsList>
            <TabsTrigger value="all">All </TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getBlogState?.map((post) => (
          <Card key={post._id} className="flex flex-col h-full">
            {/* Card content remains the same */}
            <CardHeader className="relative pb-0">
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    post.publish === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.publish === "published" ? "Published" : "Draft"}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={post.author?.avatar || "/placeholder.svg"}
                    alt={post.author?.name || "Author"}
                  />
                  <AvatarFallback>{post.author?.name?.[0]}</AvatarFallback>
                </Avatar>
              </div>
              <img
                src={post?.images[0]?.url}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground my-2">
                {post?.createdAt && format(new Date(post.createdAt), "MMMM dd, yyyy")}
              </div>
              <h2 className="text-xl font-semibold mb-2">{post?.title}</h2>
              <p className="text-muted-foreground">{post?.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {post?.comments || 0}
                </span>
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {post?.views || 0}
                </span>
                <span className="flex items-center">
                  <Share2 className="h-4 w-4 mr-1" />
                  {post?.shares || 0}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/admin/addblog/" + post._id)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => showModal(post._id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Delete Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog category?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={hideModal}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteBlog}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}