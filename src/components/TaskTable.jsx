import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, ChevronDown, ArrowUpDown } from "lucide-react";

const TaskTable = () => {
  const initialTasks = [
    { id: "TASK-7878", type: "Documentation", title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog", priority: "Medium" },
    { id: "TASK-5562", type: "Feature", title: "The SAS interface is down, bypass the open-source pixel so we can back", status: "Backlog", priority: "Medium" },
    { id: "TASK-7184", type: "Feature", title: "We need to program the back-end THX pixel!", status: "Todo", priority: "Low" },
    { id: "TASK-6699", type: "Documentation", title: "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD", status: "Backlog", priority: "Medium" },
    { id: "TASK-2858", type: "Bug", title: "We need to override the online UDP bus!", status: "Backlog", priority: "Medium" },
    { id: "TASK-7878", type: "Documentation", title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog", priority: "Medium" },
    { id: "TASK-5562", type: "Feature", title: "The SAS interface is down, bypass the open-source pixel so we can back", status: "Backlog", priority: "Medium" },
    { id: "TASK-7184", type: "Feature", title: "We need to program the back-end THX pixel!", status: "Todo", priority: "Low" },
    { id: "TASK-6699", type: "Documentation", title: "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD", status: "Backlog", priority: "Medium" },
    { id: "TASK-2858", type: "Bug", title: "We need to override the online UDP bus!", status: "Backlog", priority: "Medium" }
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Filter tasks based on search query and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === "all" || task.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-gray-500">Here's a list of your tasks for this month!</p>
        
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Filter tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="todo">Todo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" onClick={resetFilters} className="px-2 py-1">
            Reset
          </Button>
        </div>

        {/* Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{task.id}</span>
                      <Badge variant="outline">{task.type}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{task.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredTasks.length} total tasks
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;