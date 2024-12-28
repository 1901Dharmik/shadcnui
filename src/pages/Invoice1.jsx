import * as React from "react"
import { Plus, Pencil, Trash2, CalendarIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Component() {
  const [fromAddress, setFromAddress] = React.useState({
    name: "Jayvion Simon",
    address: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    phone: "+1 202-555-0143",
  })
  const [toAddress, setToAddress] = React.useState({
    name: "",
    address: "",
    phone: "",
  })
  const [invoiceDetails, setInvoiceDetails] = React.useState({
    number: "INV-1990",
    status: "Draft",
    dateCreated: new Date(),
    dueDate: new Date(),
  })
  const [items, setItems] = React.useState([
    { title: "", description: "", service: "", quantity: 1, price: 0, total: 0 },
  ])
  const [shipping, setShipping] = React.useState(0)
  const [discount, setDiscount] = React.useState(0)
  const [tax, setTax] = React.useState(0)
  const [isEditingFrom, setIsEditingFrom] = React.useState(false)
  const [isEditingTo, setIsEditingTo] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  // Mock user addresses for demonstration
  const userAddresses = [
    { id: 1, name: "John Doe", address: "123 Main St, Anytown, USA", phone: "+1 555-1234" },
    { id: 2, name: "Jane Smith", address: "456 Elm St, Othertown, USA", phone: "+1 555-5678" },
    { id: 3, name: "Alice Johnson", address: "789 Oak Rd, Somewhere, USA", phone: "+1 555-9012" },
    { id: 4, name: "Bob Williams", address: "321 Pine Ave, Nowhere, USA", phone: "+1 555-3456" },
  ]

  const filteredAddresses = userAddresses.filter(addr =>
    addr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    addr.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    addr.phone.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addItem = () => {
    setItems([...items, { title: "", description: "", service: "", quantity: 1, price: 0, total: 0 }])
  }

  const updateItem = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = value
    if (field === "quantity" || field === "price") {
      newItems[index].total = newItems[index].quantity * newItems[index].price
    }
    setItems(newItems)
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const total = subtotal + shipping - discount + tax
    return { subtotal, total }
  }

  const { subtotal, total } = calculateTotal()

  const AddressEditor = ({ address, setAddress, isEditing, setIsEditing, title }) => (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">{title}:</h2>
      {isEditing ? (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {title} Address</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor={`${title.toLowerCase()}-name`}>Name</Label>
                <Input
                  id={`${title.toLowerCase()}-name`}
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor={`${title.toLowerCase()}-address`}>Address</Label>
                <Textarea
                  id={`${title.toLowerCase()}-address`}
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor={`${title.toLowerCase()}-phone`}>Phone</Label>
                <Input
                  id={`${title.toLowerCase()}-phone`}
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                />
              </div>
              {title === "To" && (
                <div>
                  <Label htmlFor="search-address">Search Address</Label>
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Search for a user..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        {userAddresses.map((addr) => (
                          <CommandItem
                            key={addr.id}
                            onSelect={() => {
                              setAddress(addr)
                              setIsEditing(false)
                            }}
                          >
                            <span>{addr.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <div>{address.name}</div>
          <div>{address.address}</div>
          <div>{address.phone}</div>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsEditing(true)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </>
      )}
    </div>
  )

  return (
   
    <Card className="container mx-auto p-4 space-y-8">
      <CardHeader>
        <h2 className="text-2xl font-bold">Invoice Creator</h2>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <AddressEditor
            address={fromAddress}
            setAddress={setFromAddress}
            isEditing={isEditingFrom}
            setIsEditing={setIsEditingFrom}
            title="From"
          />
          <AddressEditor
            address={toAddress}
            setAddress={setToAddress}
            isEditing={isEditingTo}
            setIsEditing={setIsEditingTo}
            title="To"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <Label htmlFor="invoice-number">Invoice number</Label>
            <Input
              id="invoice-number"
              value={invoiceDetails.number}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, number: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={invoiceDetails.status}
              onValueChange={(value) => setInvoiceDetails({ ...invoiceDetails, status: value })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Date created</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {invoiceDetails.dateCreated ? format(invoiceDetails.dateCreated, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={invoiceDetails.dateCreated}
                  onSelect={(date) => setInvoiceDetails({ ...invoiceDetails, dateCreated: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Due date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {invoiceDetails.dueDate ? format(invoiceDetails.dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={invoiceDetails.dueDate}
                  onSelect={(date) => setInvoiceDetails({ ...invoiceDetails, dueDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem(index, "title", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.service}
                    onChange={(e) => updateItem(index, "service", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", parseFloat(e.target.value))}
                  />
                </TableCell>
                <TableCell>${item.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => removeItem(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button onClick={addItem}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="shipping">Shipping</Label>
            <Input
              id="shipping"
              type="number"
              value={shipping}
              onChange={(e) => setShipping(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="tax">Tax</Label>
            <Input
              id="tax"
              type="number"
              value={tax}
              onChange={(e) => setTax(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center">
          <div>
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div>Shipping: ${shipping.toFixed(2)}</div>
            <div>Discount: ${discount.toFixed(2)}</div>
            <div>Tax: ${tax.toFixed(2)}</div>
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
          </div>
          <div className="space-x-2">
            <Button variant="outline">Save as draft</Button>
            <Button>Create & send</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}