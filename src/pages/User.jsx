import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../utils/axiosconfig";
import { base_url } from "../utils/base_url"
import { toast } from "sonner";

export default function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);
  const getUserId = location.pathname.split("/")[3];
  const userState = useSelector((state) => state.auth?.user);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `${base_url}user/${getUserId}`,
        config
      );
      setUser(response.data.getaUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getUserId]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await axios.get(
        `${base_url}roles`,
        config
      );
      setAvailableRoles(response.data);
    } catch (err) {
      toast.error("Failed to fetch roles");
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, [fetchUser, fetchRoles]);

  const handleBanToggle = async (isBlocked) => {
    try {
      const url = isBlocked
        ? `${base_url}user/block-user/${getUserId}`
        : `${base_url}user/unblock-user/${getUserId}`;

      const response = await axios.put(url, {}, config);
      setUser(response.data);
      toast.success(`User ${isBlocked ? "blocked" : "unblocked"} successfully`);
    } catch (err) {
      console.error("Error toggling ban status:", err);
      toast.error("Failed to update ban status. Please try again.");
    }
  };

  const handleRoleChange = async (newRoleId) => {
    try {
      const response = await axios.put(
        `${base_url}user/change-role`,
        {
          userId: getUserId,
          newRole: newRoleId,
        },
        config
      );
      // Update the user state with the new role
      setUser((prevUser) => ({
        ...prevUser,
        role: response.data.role, // Assuming the API returns the updated role
      }));
      fetchRoles();
      toast.success("User role updated successfully");
    } catch (err) {
      console.error("Error changing user role:", err);
      toast.error("Failed to change user role. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${base_url}user/${getUserId}`, config);
      toast.success("User deleted successfully");
      // Optionally, redirect to users list or home page
      // history.push('/users');
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card className="w-full max-w-2xl bg-muted">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <Badge className="bg-primary text-primary-foreground">Active</Badge>
          <Avatar className="h-20 w-20 bg-primary">
            <AvatarImage src="/placeholder.svg" alt="User avatar" />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{user?.firstname}</AvatarFallback>
          </Avatar>
          {/* <img
            alt="Profile picture"
            className="rounded-full"
            height="100"
            src={
              user?.profilePicture || "/placeholder.svg?height=100&width=100"
            }
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
            width="100"
          /> */}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              placeholder="Full name"
              defaultValue={`${user?.firstname} ${user?.lastname}`}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              defaultValue={user?.email}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              placeholder="Phone number"
              defaultValue={user?.mobile}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={user?.role?._id} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder={user?.role?.name || "Select a role"}/>
                  
                
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role._id} value={role._id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6 space-y-4 border bg-background p-2 rounded-md">
          <div className="flex items-center justify-between mx-3">
            <div className="space-y-0.5">
              <Label htmlFor="banned">Block User</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Apply disable account
              </p>
            </div>
            <Switch
              id="blocked"
              checked={user?.isBlocked}
              onCheckedChange={handleBanToggle}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" onClick={handleDeleteUser}>
          Delete user
        </Button>
        {/* <Button disabled>Save changes</Button> */}
      </CardFooter>
    </Card>
  );
}
