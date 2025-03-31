
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DriverInfoCard from "./tracking/DriverInfoCard";
import TrackingStats from "./tracking/TrackingStats";
import DriverActions from "./tracking/DriverActions";
import LoadingState from "./tracking/LoadingState";
import DriverRoute from "./tracking/DriverRoute";
import TrackingHeader from "./tracking/TrackingHeader";
import { useDriverSimulation } from "@/hooks/useDriverSimulation";

const LiveDriverTracking: React.FC = () => {
  // Fixed locations
  const destinationLocation = { lat: 51.515, lng: -0.09 };
  const startingLocation = { lat: 51.495, lng: -0.11 };
  
  const { driverInfo, isLoading, driverMarker } = useDriverSimulation({
    destination: destinationLocation
  });

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="w-full">
      <TrackingHeader />
      <CardContent className="space-y-4">
        {driverInfo && (
          <>
            <DriverInfoCard driverInfo={driverInfo} />

            <DriverRoute 
              driverLocation={driverMarker?.position || null}
              destination={destinationLocation}
              startingPoint={startingLocation}
            />

            <TrackingStats eta={driverInfo.eta} distance={driverInfo.distance} />
            <DriverActions />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveDriverTracking;
