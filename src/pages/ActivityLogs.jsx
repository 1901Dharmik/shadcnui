import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import Activity from "@/components/Activity";
import { base_url } from "../utils/base_url";
export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalLogs: 0,
    logsPerPage: 10,
  });
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const fetchLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: pagination.logsPerPage.toString(),
      });
      if (startDate) params.append("startDate", startDate.toISOString());
      if (endDate) params.append("endDate", endDate.toISOString());

      const response = await fetch(
        `${base_url}activity-logs?${params}`
      );
      if (!response.ok) throw new Error("Failed to fetch logs");
      const data = await response.json();
      setLogs(data.logs);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };


  // Function to delete logs older than 3 months
  const openDeleteDialog = () => {
    setIsDialogOpen(true)
  }

  const closeDeleteDialog = () => {
    setIsDialogOpen(false)
  }
  const performDeletion = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(
        `${base_url}activity-logs/delete-old-logs`,
        {
          method: "DELETE",
        }
      )
      if (!response.ok) throw new Error("Failed to delete old logs")
      const data = await response.json()
      toast({
        title: "Logs Deleted",
        description: `Successfully deleted ${data.deletedCount} old logs.`,
      })
      fetchLogs() // Assuming this function exists to refresh the logs
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      closeDeleteDialog()
    }
  }


  useEffect(() => {
    fetchLogs();
  }, [pagination.currentPage, startDate, endDate]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <>
    <div className="">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-semibold mb-4">Activity Logs</h1>

        <div className="flex space-x-4 ">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Start Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "End Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="destructive"
            onClick={openDeleteDialog} disabled={isDeleting}
            // onClick={deleteOldLogs}
            // disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Old Logs"}
          </Button>
        </div>
      </div>
      <Alert className="my-4">
        <AlertTitle>Please Note !</AlertTitle>
        <AlertDescription>
         Activity Logs Will Be Delete After 2 Month Older
        </AlertDescription>
      </Alert>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!isLoading && !error && (
        <TooltipProvider>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Details</TableHead>{" "}
                {/* Add more columns as needed */}
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell className="capitalize ">{log?.action}</TableCell>
                  <TableCell className="capitalize">{log?.modelName}</TableCell>
                  <TableCell className="capitalize">{`${log?.userId?.firstname} ${log?.userId?.lastname}`}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-pointer underline">
                          View Details
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="start">
                        <pre className="max-w-sm max-h-96 overflow-auto text-xs whitespace-pre-wrap">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {format(new Date(log.createdAt), "dd-MM-yyyy hh:mm a")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      )}

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                handlePageChange(Math.max(1, pagination.currentPage - 1))
              }
              disabled={pagination.currentPage === 1}
            />
          </PaginationItem>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={pagination.currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(
                  Math.min(pagination.totalPages, pagination.currentPage + 1)
                )
              }
              disabled={pagination.currentPage === pagination.totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Full Screen Modal</Button>
      </DialogTrigger>
      <DialogContent className="max-w-full w-full h-screen p-0 m-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-6 border-b fixed top-0 left-0 right-0 bg-background z-50">
            <div className="flex items-center justify-between">
              <DialogTitle>Full Screen Modal</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              This is a full screen modal using shadcn/ui components with fixed header and footer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow p-6 overflow-auto mt-[105px] mb-[81px]">
            <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
            <p className="mb-4">
              This is where you would put your main content. The modal takes up the full width and height of the screen.
            </p>
            <p className="mb-4">
              You can add any components or content here. The content area is scrollable if it exceeds the available space.
            </p>
            {Array(20).fill(0).map((_, i) => (
              <p key={i} className="mb-4">
                This is paragraph {i + 1}. It's here to demonstrate scrolling within the modal.
              </p>
            ))}
          </div>
          <div className="p-6 border-t fixed bottom-0 left-0 right-0 bg-background">
            <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Old Logs</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete all logs older than 3 months? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancel
            </Button>
            <Button onClick={performDeletion} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <Activity/>
    </>
  );
}
