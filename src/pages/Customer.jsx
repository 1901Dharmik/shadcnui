import React from "react"
import { X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Customer = () => {
  return (
    <div 
    // className="min-h-screen bg-gray-50 p-4 lg:p-8"
    >
      <div className="">
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Left Column */}
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg" alt="User avatar" />
                  <AvatarFallback>JF</AvatarFallback>
                </Avatar>
                <div className="text-center text-sm text-muted-foreground">
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br />
                  max size of 3 Mb
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="public-profile">Public profile</Label>
                  <Switch id="public-profile" />
                </div>

                <Button variant="destructive" className="w-full">
                  Delete user
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <Card>
            <CardHeader>
              <CardTitle>Edit User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Jaydon Frankie" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" defaultValue="demo@minimals.cc" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="CA">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">🇨🇦 +1</SelectItem>
                        <SelectItem value="US">🇺🇸 +1</SelectItem>
                        <SelectItem value="UK">🇬🇧 +44</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Input defaultValue="(416) 555-0198" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="90210 Broadway Blvd" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select defaultValue="CA">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                      <SelectItem value="US">🇺🇸 United States</SelectItem>
                      <SelectItem value="UK">🇬🇧 United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/region</Label>
                  <Input id="state" defaultValue="California" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/code</Label>
                  <Input id="zip" defaultValue="94116" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  className="min-h-[100px]"
                  defaultValue="Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus."
                />
              </div>

              <div className="flex justify-end">
                <Button size="lg">Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Customer

