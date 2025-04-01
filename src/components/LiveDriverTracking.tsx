
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import DriverInfoCard from "./tracking/DriverInfoCard";
import TrackingStats from "./tracking/TrackingStats";
import DriverActions from "./tracking/DriverActions";
import LoadingState from "./tracking/LoadingState";
import DriverRoute from "./tracking/DriverRoute";
import TrackingHeader from "./tracking/TrackingHeader";
import AssistanceProviderInfo from "./tracking/AssistanceProviderInfo";
import { useDriverSimulation } from "@/hooks/useDriverSimulation";

const LiveDriverTracking: React.FC = () => {
  // Fixed locations
  const destinationLocation = { lat: 51.515, lng: -0.09 };
  const startingLocation = { lat: 51.495, lng: -0.11 };
  
  const { driverInfo, isLoading, driverMarker } = useDriverSimulation({
    destination: destinationLocation
  });

  const [assistanceProvider, setAssistanceProvider] = useState<any>(null);

  useEffect(() => {
    // Simulate loading assistance provider data
    const timer = setTimeout(() => {
      setAssistanceProvider({
        id: "prov-12345",
        name: "Robert Smith",
        logo: "/placeholder.svg",
        rating: 4.9,
        vehicle: {
          model: "Ford Transit",
          color: "White",
          licensePlate: "RA 247 XY",
        },
        company: {
          name: "RoadStar Assistance",
          established: "2008",
          certified: true,
        },
        eta: 8,
        distance: 2.5,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      {assistanceProvider && (
        <AssistanceProviderInfo providerInfo={assistanceProvider} />
      )}
      
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
    </div>
  );
};

export default LiveDriverTracking;
