
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, Navigation, Star, Phone, MessageSquare, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import GoogleMap from "./GoogleMap";

interface DriverInfo {
  id: string;
  name: string;
  photo: string;
  rating: number;
  vehicle: {
    model: string;
    color: string;
    licensePlate: string;
  };
  eta: number; // minutes
  distance: number; // kilometers
  location: {
    lat: number;
    lng: number;
  };
}

const LiveDriverTracking: React.FC = () => {
  const { toast } = useToast();
  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [driverMarker, setDriverMarker] = useState<{ 
    position: { lat: number; lng: number };
    title: string;
  } | null>(null);
  
  // Destination marker is fixed
  const destinationMarker = {
    position: { lat: 51.515, lng: -0.09 },
    title: "Destination"
  };
  
  // Starting point marker is fixed
  const startingMarker = {
    position: { lat: 51.495, lng: -0.11 },
    title: "Pick-up Location"
  };

  // Simulate fetching driver data
  useEffect(() => {
    const timer = setTimeout(() => {
      const newDriverInfo = {
        id: "drv-12345",
        name: "Alex Johnson",
        photo: "/placeholder.svg",
        rating: 4.8,
        vehicle: {
          model: "Toyota Hiace",
          color: "White",
          licensePlate: "AB 123 CD",
        },
        eta: 7,
        distance: 2.3,
        location: {
          lat: 51.505,
          lng: -0.11,
        },
      };
      
      setDriverInfo(newDriverInfo);
      setDriverMarker({
        position: newDriverInfo.location,
        title: `${newDriverInfo.name} - ${newDriverInfo.vehicle.model}`
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate driver movement
  useEffect(() => {
    if (isLoading || !driverInfo) return;

    const interval = setInterval(() => {
      // Simulate movement towards destination
      setDriverInfo(prev => {
        if (!prev) return prev;
        
        const newLat = prev.location.lat + (destinationMarker.position.lat - prev.location.lat) * 0.05;
        const newLng = prev.location.lng + (destinationMarker.position.lng - prev.location.lng) * 0.05;
        
        const newLocation = {
          lat: newLat,
          lng: newLng
        };
        
        // Update driver marker position for the map
        setDriverMarker({
          position: newLocation,
          title: `${prev.name} - ${prev.vehicle.model}`
        });
        
        return {
          ...prev,
          eta: Math.max(0, prev.eta - 0.2),
          distance: Math.max(0, prev.distance - 0.05),
          location: newLocation
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading, driverInfo]);

  const handleCallDriver = () => {
    toast({
      title: "Calling driver",
      description: "Connecting you with Alex Johnson",
    });
  };

  const handleMessageDriver = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent to the driver",
    });
  };

  const handleShareLocation = () => {
    toast({
      title: "Location shared",
      description: "Your live location is being shared with the driver",
    });
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Finding Your Driver
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-60">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-primary border-b-primary/20 border-l-primary/20 animate-spin" />
            <p className="text-muted-foreground">Connecting with nearby drivers...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const allMarkers = [startingMarker, destinationMarker].filter(Boolean);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Live Driver Tracking
          </div>
          <Badge variant="outline" className="bg-green-100">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {driverInfo && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <img src={driverInfo.photo} alt={driverInfo.name} />
                </Avatar>
                <div>
                  <h3 className="font-medium">{driverInfo.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    {driverInfo.rating}
                    <span className="mx-2">•</span>
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{driverInfo.vehicle.model}</div>
                <div className="text-sm text-muted-foreground">
                  {driverInfo.vehicle.color} • {driverInfo.vehicle.licensePlate}
                </div>
              </div>
            </div>

            <div className="h-40 overflow-hidden rounded-md">
              <GoogleMap
                center={driverMarker?.position || { lat: 51.505, lng: -0.1 }}
                markers={allMarkers}
                movingMarker={driverMarker || undefined}
                height="160px"
                showControls={false}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-muted-foreground">ETA</div>
                <div className="flex items-center justify-center gap-1 font-medium">
                  <Clock className="h-4 w-4" />
                  {Math.ceil(driverInfo.eta)} mins
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-muted-foreground">Distance</div>
                <div className="flex items-center justify-center gap-1 font-medium">
                  <Navigation className="h-4 w-4" />
                  {driverInfo.distance.toFixed(1)} km
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="flex-1 gap-1"
                onClick={handleCallDriver}
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button
                variant="secondary"
                className="flex-1 gap-1"
                onClick={handleMessageDriver}
              >
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
              <Button
                variant="outline"
                className="gap-1"
                onClick={handleShareLocation}
              >
                <MapPin className="h-4 w-4" />
                Share Location
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveDriverTracking;
