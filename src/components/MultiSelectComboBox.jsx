// import React, { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// const MultiSelectCombobox = ({
//   label = "Select",
//   items = [],
//   placeholder = "Search...",
//   emptyText = "No results found.",
//   clearText = "Clear filters",
//   buttonText = "+ Select",
//   side = "right",
//   align = "start",
//   showCount = true,
//   showClearFilters = true,
//   onSelectionChange = () => {},
// }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);

//   const toggleItem = (item) => {
//     const newSelection = selectedItems.some((i) => i.value === item.value)
//       ? selectedItems.filter((i) => i.value !== item.value)
//       : [...selectedItems, item];

//     setSelectedItems(newSelection);
//     onSelectionChange(newSelection);
//   };

//   const clearFilters = () => {
//     setSelectedItems([]);
//     onSelectionChange([]);
//   };

//   return (
//     <div className="flex flex-col space-y-4">
//       <div className="flex items-center space-x-4">
//         {label && <p className="text-sm text-muted-foreground">{label}</p>}
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               size="sm"
//               className="flex mx-2 justify-start"
//             >
//               {selectedItems.length > 0 ? (
//                 <div className="flex gap-2 flex-wrap">
//                   {selectedItems.map((item) => (
//                     <div
//                       key={item.value}
//                       className="flex items-center space-x-1"
//                     >
//                       {item.icon && (
//                         <item.icon className="h-4 w-4 shrink-0" />
//                       )}
//                       <span className="border-r pr-2">{item.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <>{buttonText}</>
//               )}
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="p-0" side={side} align={align}>
//             <Command>
//               <CommandInput placeholder={placeholder} className="outline-none border-0 focus:ring-0 focus:outline-none" />
//               <CommandList>
//                 <CommandEmpty>{emptyText}</CommandEmpty>
//                 <CommandGroup>
//                   {items.map((item) => (
//                     <CommandItem
//                       key={item.value}
//                       onSelect={() => toggleItem(item)}
//                     >
//                       {item.icon && (
//                         <item.icon
//                           className={cn(
//                             "mr-2 h-4 w-4",
//                             selectedItems.some((i) => i.value === item.value)
//                               ? "opacity-100"
//                               : "opacity-40"
//                           )}
//                         />
//                       )}
//                       <span className="flex-1 ">{item.label}</span>
//                       {showCount && item.count !== undefined && (
//                         <span className="text-muted-foreground">
//                           {item.count}
//                         </span>
//                       )}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//                 {showClearFilters && selectedItems.length > 0 && (
//                   <CommandGroup>
//                     <CommandItem
//                       className="text-red-600"
//                       onSelect={clearFilters}
//                     >
//                       {clearText}
//                     </CommandItem>
//                   </CommandGroup>
//                 )}
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>
//     </div>
//   );
// }

// export default MultiSelectCombobox;
'use client'

import * as React from "react"
import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"


export default function MultiSelectCombobox({
  label = "Select ",
  items = [],
  placeholder = "Search...",
  emptyText = "No results found.",
  clearText = "Clear filters",
  buttonText = "+ Select",
  side = "bottom",
  align = "start",
  showCount = true,
  showClearFilters = true,
  onSelectionChange = () => {},
}) {
  const [open, setOpen] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState([])

  const toggleItem = (item) => {
    const newSelection = selectedItems.some((i) => i.value === item.value)
      ? selectedItems.filter((i) => i.value !== item.value)
      : [...selectedItems, item]

    setSelectedItems(newSelection)
    onSelectionChange(newSelection)
  }

  const clearFilters = () => {
    setSelectedItems([])
    onSelectionChange([])
  }

  return (
    <div className="flex flex-col space-y-2">
      {label && <p className="text-sm font-medium text-muted-foreground">{label}</p>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedItems.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedItems.map((item) => (
                  <Badge variant="secondary" className="p-1.5 rounded-xl" key={item.value}>
                    {item.label}
                  </Badge>
                ))}
              </div>
            ) : (
              buttonText
            )}
            <span className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" side={side} align={align}>
          <Command>
            <CommandInput placeholder={placeholder}  className="outline-none border-0 focus:ring-0 focus:outline-none" />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => {
                  const isSelected = selectedItems.some((i) => i.value === item.value)
                  return (
                    <CommandItem
                      key={item.value}
                      onSelect={() => toggleItem(item)}
                      className={cn(
                        "flex items-center gap-2",
                        isSelected && "opacity-50"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.icon && (
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{item.label}</span>
                      {showCount && item.count !== undefined && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {item.count}
                        </span>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {showClearFilters && selectedItems.length > 0 && (
                <CommandGroup>
                  <CommandItem
                    onSelect={clearFilters}
                    className="justify-center text-sm text-red-600"
                  >
                    {clearText}
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

