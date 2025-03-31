
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "lucide-react";
import GoogleMap from "./GoogleMap";
import DriverInfoCard, { DriverInfoProps } from "./tracking/DriverInfoCard";
import TrackingStats from "./tracking/TrackingStats";
import DriverActions from "./tracking/DriverActions";
import LoadingState from "./tracking/LoadingState";

interface DriverDetails extends DriverInfoProps {
  eta: number; // minutes
  distance: number; // kilometers
  location: {
    lat: number;
    lng: number;
  };
}

const LiveDriverTracking: React.FC = () => {
  const [driverInfo, setDriverInfo] = useState<DriverDetails | null>(null);
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

  if (isLoading) {
    return <LoadingState />;
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
            <DriverInfoCard driverInfo={driverInfo} />

            <div className="h-40 overflow-hidden rounded-md">
              <GoogleMap
                center={driverMarker?.position || { lat: 51.505, lng: -0.1 }}
                markers={allMarkers}
                movingMarker={driverMarker || undefined}
                height="160px"
                showControls={false}
              />
            </div>

            <TrackingStats eta={driverInfo.eta} distance={driverInfo.distance} />
            <DriverActions />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveDriverTracking;
