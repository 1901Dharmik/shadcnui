import * as React from "react"
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

const dummyData = [
  { id: 1, name: "Calendar", icon: Calendar, shortcut: "⌘C" },
  { id: 2, name: "Search Emoji", icon: Smile, shortcut: "⌘E" },
  { id: 3, name: "Calculator", icon: Calculator, shortcut: "⌘K" },
  { id: 4, name: "Settings", icon: Settings, shortcut: "⌘S" },
  { id: 5, name: "Profile", icon: User, group: "Profile" },
  { id: 6, name: "Billing", icon: CreditCard, group: "Profile" },
]

export default function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const [searchTerm, setSearchTerm] = React.useState("")
  const filteredData = dummyData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Button
      variants="outline"
        onClick={() => setOpen(true)}
        className="relative w-20 justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 bg-muted/30 hover:bg-muted border"
      >
        <span className="hidden lg:inline-flex ">Search ...</span>
        <span className="inline-flex lg:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput style={{outline:"none"}} className="outline-none border-0 focus:ring-0 focus:outline-none"
          placeholder="Type a command or search..." 
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
         
          <ScrollArea className="h-72">
          <CommandEmpty>No Results Found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {filteredData.filter(item => !item.group).map((item) => (
              <CommandItem key={item.id}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
                {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Profile">
            {filteredData.filter(item => item.group === "Profile").map((item) => (
              <CommandItem key={item.id}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          </ScrollArea>
        </CommandList>
      </CommandDialog>
    </>
  )
}