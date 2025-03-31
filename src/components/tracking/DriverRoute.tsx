
import React from "react";
import GoogleMap from "../GoogleMap";
import { Card } from "@/components/ui/card";

interface DriverRouteProps {
  driverLocation: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number };
  startingPoint: { lat: number; lng: number };
}

const DriverRoute: React.FC<DriverRouteProps> = ({
  driverLocation,
  destination,
  startingPoint,
}) => {
  const destinationMarker = {
    position: destination,
    title: "Destination"
  };
  
  const startingMarker = {
    position: startingPoint,
    title: "Pick-up Location"
  };

  const driverMarker = driverLocation 
    ? {
        position: driverLocation,
        title: "Driver"
      }
    : undefined;

  const allMarkers = [startingMarker, destinationMarker].filter(Boolean);

  return (
    <Card className="h-40 overflow-hidden rounded-md">
      <GoogleMap
        center={driverLocation || startingPoint}
        markers={allMarkers}
        movingMarker={driverMarker}
        height="160px"
        showControls={false}
        mapStyle="silver"
      />
    </Card>
  );
};

export default DriverRoute;
