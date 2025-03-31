
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const LocationSettingsTab: React.FC = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Save Changes",
      description: "Your location settings have been updated",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location</CardTitle>
        <CardDescription>
          Manage your location settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="defaultLocation">Default Location</Label>
          <Input 
            id="defaultLocation" 
            placeholder="Enter your default location"
            defaultValue="New York, NY"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="locationTracking" defaultChecked />
          <Label htmlFor="locationTracking">Enable location tracking</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="locationHistory" defaultChecked />
          <Label htmlFor="locationHistory">Save location history</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default LocationSettingsTab;
