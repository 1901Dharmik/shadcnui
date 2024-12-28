import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "../components/ui/pagination";
import Tables from "../components/ui/Tables";
import Tables2 from "../components/ui/Table2";
import Tables3 from "../components/ui/Tables3";
import DashChart from "../components/ui/DashCharts";
import Params from "../components/ui/Params";
import NewPage from "../components/ui/NewPage";
import { DataTableSkeleton } from "../data-table/data-table-skeleton";

import { routes } from "../router";
import CustomSelect from "../components/ui/CustomSelect";
import Objects from "../components/ui/Objects";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../components/ui/command";
import NewChart from "../components/ui/NewChart";
import { MultiSelectFilter } from "@/components/ui/MultiSelectFilter";
import { List } from "../components/List";

//
export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRoutes = useMemo(() => {
    if (!searchQuery.trim()) return []; // If search query is empty, return empty array

    const query = searchQuery.trim().toLowerCase();
    return routes
      .flatMap((route) => route.children || [])
      .filter((route) => route.name.toLowerCase().includes(query))
      .map((route) => ({
        name: route.name,
        path: route.path,
      }));
  }, [searchQuery]);

  const Users = [
    {
      id: 1,
      name: "Neil Sims",
      avatar: "neil-sims.png",
      email: "neil.sims@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Front-end developer",
      country: "United States",
      status: "Active",
    },
    {
      id: 2,
      name: "Roberta Casas",
      avatar: "roberta-casas.png",
      email: "roberta.casas@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Designer",
      country: "Spain",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Gough",
      avatar: "michael-gough.png",
      email: "michael.gough@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "React developer",
      country: "United Kingdom",
      status: "Active",
    },
    {
      id: 4,
      name: "Jese Leos",
      avatar: "jese-leos.png",
      email: "jese.leos@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Marketing",
      country: "United States",
      status: "Active",
    },
    {
      id: 5,
      name: "Bonnie Green",
      avatar: "bonnie-green.png",
      email: "bonnie.green@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "UI/UX Engineer",
      country: "Australia",
      status: "Offline",
    },
    {
      id: 6,
      name: "Thomas Lean",
      avatar: "thomas-lean.png",
      email: "thomas.lean@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Vue developer",
      country: "Germany",
      status: "Active",
    },
    {
      id: 7,
      name: "Helene Engels",
      avatar: "helene-engels.png",
      email: "helene.engels@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Product owner",
      country: "Canada",
      status: "Active",
    },
    {
      id: 8,
      name: "Lana Byrd",
      avatar: "lana-byrd.png",
      email: "lana.byrd@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Designer",
      country: "United States",
      status: "Active",
    },
    {
      id: 9,
      name: "Leslie Livingston",
      avatar: "leslie-livingston.png",
      email: "leslie.livingston@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Web developer",
      country: "France",
      status: "Offline",
    },
    {
      id: 10,
      name: "Robert Brown",
      avatar: "robert-brown.png",
      email: "robert.brown@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Laravel developer",
      country: "Russia",
      status: "Active",
    },
    {
      id: 11,
      name: "Neil Sims",
      avatar: "neil-sims.png",
      email: "neil.sims@flowbite.com",
      position: "Front-end developer",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      country: "United States",
      status: "Active",
    },
    {
      id: 12,
      name: "Roberta Casas",
      avatar: "roberta-casas.png",
      email: "roberta.casas@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Designer",
      country: "Spain",
      status: "Active",
    },
    {
      id: 13,
      name: "Michael Gough",
      avatar: "michael-gough.png",
      email: "michael.gough@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "React developer",
      country: "United Kingdom",
      status: "Active",
    },
    {
      id: 14,
      name: "Jese Leos",
      avatar: "jese-leos.png",
      email: "jese.leos@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Marketing",
      country: "United States",
      status: "Active",
    },
    {
      id: 15,
      name: "Bonnie Green",
      avatar: "bonnie-green.png",
      email: "bonnie.green@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "UI/UX Engineer",
      country: "Australia",
      status: "Offline",
    },
    {
      id: 16,
      name: "Thomas Lean",
      avatar: "thomas-lean.png",
      email: "thomas.lean@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Vue developer",
      country: "Germany",
      status: "Active",
    },
    {
      id: 17,
      name: "Helene Engels",
      avatar: "helene-engels.png",
      email: "helene.engels@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Product owner",
      country: "Canada",
      status: "Active",
    },
    {
      id: 18,
      name: "Lana Byrd",
      avatar: "lana-byrd.png",
      email: "lana.byrd@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Designer",
      country: "United States",
      status: "Active",
    },
    {
      id: 19,
      name: "Leslie Livingston",
      avatar: "leslie-livingston.png",
      email: "leslie.livingston@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Web developer",
      country: "France",
      status: "Offline",
    },
    {
      id: 20,
      name: "Robert Brown",
      avatar: "robert-brown.png",
      email: "robert.brown@flowbite.com",
      biography:
        "I love working with React and Flowbites to create efficient and user-friendly interfaces. In my spare time, I enjoys baking, hiking, and spending time with my family.",
      position: "Laravel developer",
      country: "Russia",
      status: "Active",
    },
  ];
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // --------------------- multi select option
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleFilterChange = (selectedOptions) => {
    console.log("Selected options:", selectedOptions);
    // You can apply the filter logic here
  };

  return (
    <>
      <>
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Type a command or search..."
            className="border-none focus:outline-none"
          />
          <CommandList>
            {/* <CommandEmpty>No results found.</CommandEmpty> */}
            {filteredRoutes.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Suggestions">
                {filteredRoutes.map((route, index) => (
                  <CommandItem key={index}>
                    <span>{route.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {route.path}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandSeparator />
            <CommandGroup heading="Settings">
              {Users.map((item) => (
                <CommandItem key={item.id}>{item.name}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>

      <div className="grid grid-cols-5 gap-2">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          reprehenderit magnam enim.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          reprehenderit magnam enim.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          reprehenderit magnam enim.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          reprehenderit magnam enim.
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
          reprehenderit magnam enim.
        </div>
      </div>
      <Params />

      {/* <NewPage/> */}
      {/* <SearchParams/> */}
      <List />

      <CustomSelect />
      <Objects />
      <DataTableSkeleton />

      <Tables />
      <Tables2 />
      <Tables3 />
      {/* <DashChart /> */}
      <NewChart />
     
    </>
  );
}
