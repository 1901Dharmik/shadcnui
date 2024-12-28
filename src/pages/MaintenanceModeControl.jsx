import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { base_url } from "../utils/base_url";
const MaintenanceSettings = () => {
  const [settings, setSettings] = useState({
    _id: "", // Added _id field
    isMaintenanceModeActive: false,
    maintenanceMessage: "",
    estimatedDowntime: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get(`${base_url}admin/maintenance/settings`);
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch maintenance settings",
        });
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setSettings(prev => ({
      ...prev,
      isMaintenanceModeActive: !prev.isMaintenanceModeActive,
    }));
  };
const token = localStorage.getItem("token");
  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ensure _id is included in the payload
      const { data } = await axios.put(
        `${base_url}admin/maintenance/settings`, 
        { 
          _id: settings._id, // Include _id when saving
          isMaintenanceModeActive: settings.isMaintenanceModeActive,
          maintenanceMessage: settings.maintenanceMessage,
          estimatedDowntime: settings.estimatedDowntime
        },{
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }

      );

      // Update settings with the response data to ensure consistency
      setSettings(data);

      toast({
        title: "Success",
        description: "Maintenance settings updated successfully",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      
      // Set specific error message
      setError(error.response?.data?.message || "Failed to update settings");
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to update settings",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Settings</CardTitle>
          <CardDescription>Configure system maintenance mode and messaging</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <Switch
                id="maintenance-mode"
                checked={settings.isMaintenanceModeActive}
                onCheckedChange={handleToggle}
              />
            </div>

            <div>
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <Textarea
                id="maintenance-message"
                name="maintenanceMessage"
                value={settings.maintenanceMessage}
                onChange={handleChange}
                placeholder="Enter maintenance message"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="estimated-downtime">Estimated Downtime</Label>
              <Input
                id="estimated-downtime"
                type="datetime-local"
                name="estimatedDowntime"
                value={settings.estimatedDowntime || ""}
                onChange={handleChange}
                className="mt-2"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceSettings;