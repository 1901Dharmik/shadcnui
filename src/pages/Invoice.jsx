'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil, Plus, Trash, CalendarIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const dummyReceivers = [
  {
    id: '1',
    name: 'John Doe',
    address: '123 Main St, Anytown, AN 12345',
    phone: '+1 234-567-8901'
  },
  {
    id: '2',
    name: 'Jane Smith',
    address: '456 Oak Ave, Somewhere, SO 67890',
    phone: '+1 345-678-9012'
  },
  {
    id: '3',
    name: 'Acme Corp',
    address: '789 Business Blvd, Metropolis, ME 54321',
    phone: '+1 456-789-0123'
  }
]

export default function CreateInvoice() {
  const [senderAddress, setSenderAddress] = useState({
    id: '1',
    name: 'Jayvion Simon',
    address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
    phone: '+1 202-555-0143'
  })
  
  const [receiverAddresses, setReceiverAddresses] = useState(dummyReceivers)
  const [selectedReceiver, setSelectedReceiver] = useState(null)
  const [isEditingSender, setIsEditingSender] = useState(false)
  const [isAddingReceiver, setIsAddingReceiver] = useState(false)
  const [lineItems, setLineItems] = useState([{
    id: '1',
    title: '',
    description: '',
    service: '',
    quantity: 1,
    price: 0
  }])

  const [tempAddress, setTempAddress] = useState({
    id: '',
    name: '',
    address: '',
    phone: ''
  })

  const [dateCreate, setDateCreate] = useState(new Date())
  const [dueDate, setDueDate] = useState()

  const handleSenderSubmit = () => {
    setSenderAddress(tempAddress)
    setIsEditingSender(false)
  }

  const handleReceiverSubmit = () => {
    if (tempAddress.name && tempAddress.address) {
      const newAddress = { ...tempAddress, id: Date.now().toString() }
      setReceiverAddresses([...receiverAddresses, newAddress])
      setSelectedReceiver(newAddress)
      setIsAddingReceiver(false)
    }
  }

  const addLineItem = () => {
    setLineItems([...lineItems, {
      id: Date.now().toString(),
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0
    }])
  }

  const updateLineItem = (id, field, value) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const removeLineItem = (id) => {
    setLineItems(lineItems.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  }

  const AddressForm = ({ address, onChange }) => (
    <div className="space-y-4 container mx-auto">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={address.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={address.address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={address.phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Invoice</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sender Address */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">From:</h2>
                <div className="mt-2">
                  <p>{senderAddress.name}</p>
                  <p className="text-sm text-muted-foreground">{senderAddress.address}</p>
                  <p className="text-sm text-muted-foreground">{senderAddress.phone}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => {
                setTempAddress(senderAddress)
                setIsEditingSender(true)
              }}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Receiver Address */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold">To:</h2>
              <Button variant="ghost" size="icon" onClick={() => {
                setTempAddress({
                  id: '',
                  name: '',
                  address: '',
                  phone: ''
                })
                setIsAddingReceiver(true)
              }}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {selectedReceiver ? (
              <div>
                <p>{selectedReceiver.name}</p>
                <p className="text-sm text-muted-foreground">{selectedReceiver.address}</p>
                <p className="text-sm text-muted-foreground">{selectedReceiver.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select or add a receiver</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Invoice Details */}
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="invoice-number">Invoice number</Label>
          <Input id="invoice-number" defaultValue="INV-1990" />
        </div>
        <div>
          <Label>Status</Label>
          <Select defaultValue="draft">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Date create</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateCreate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateCreate ? format(dateCreate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateCreate}
                onSelect={setDateCreate}
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
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Details:</h2>
        {lineItems.map((item, index) => (
          <div key={item.id} className="grid md:grid-cols-6 gap-4 items-center">
            <Input
              placeholder="Title"
              value={item.title}
              onChange={(e) => updateLineItem(item.id, 'title', e.target.value)}
            />
            <Input
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
            />
            <Select
              value={item.service}
              onValueChange={(value) => updateLineItem(item.id, 'service', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value))}
              min="1"
            />
            <Input
              type="number"
              value={item.price}
              onChange={(e) => updateLineItem(item.id, 'price', parseFloat(e.target.value))}
              min="0"
              step="0.01"
            />
            <div className="flex items-center gap-2">
              <div className="flex-1">
                ${(item.quantity * item.price).toFixed(2)}
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeLineItem(item.id)}
                disabled={lineItems.length === 1}
              >
               <span class="icon-[solar--trash-bin-trash-bold-duotone] h-5 w-5"></span>
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addLineItem}>
          <Plus className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </div>

      {/* Totals */}
      <div className="flex flex-col items-end space-y-2">
        <div className="grid grid-cols-2 gap-8 text-sm">
          <span>Subtotal:</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
          <span>Shipping:</span>
          <Input className="w-32" type="number" min="0" step="0.01" />
          <span>Discount:</span>
          <Input className="w-32" type="number" min="0" step="0.01" />
          <span>Taxes:</span>
          <Input className="w-32" type="number" min="0" step="0.01" />
          <span className="font-bold">Total:</span>
          <span className="font-bold">${calculateSubtotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Save as draft</Button>
        <Button>Create & send</Button>
      </div>

      {/* Edit Sender Dialog */}
      <Dialog open={isEditingSender} onOpenChange={setIsEditingSender}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sender Address</DialogTitle>
          </DialogHeader>
          <AddressForm
            address={tempAddress}
            onChange={(field, value) => setTempAddress(prev => ({ ...prev, [field]: value }))}
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setIsEditingSender(false)}>
              Cancel
            </Button>
            <Button onClick={handleSenderSubmit}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Receiver Dialog */}
      <Dialog open={isAddingReceiver} onOpenChange={setIsAddingReceiver}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Receiver Address</DialogTitle>
          </DialogHeader>
          <AddressForm
            address={tempAddress}
            onChange={(field, value) => setTempAddress(prev => ({ ...prev, [field]: value }))}
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setIsAddingReceiver(false)}>
              Cancel
            </Button>
            <Button  onClick={handleReceiverSubmit}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Select Receiver Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">
            Select Existing Receiver
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Receiver</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput placeholder="Search receivers..." />
            <CommandEmpty>No receiver found.</CommandEmpty>
            <CommandGroup>
              {receiverAddresses.map((address) => (
                <CommandItem
                  key={address.id}
                  onSelect={() => {
                    setSelectedReceiver(address)
                  }}
                >
                  <span>{address.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  )
}