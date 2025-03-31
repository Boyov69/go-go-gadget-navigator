
import { useState, useEffect } from "react";

export interface DriverDetails {
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

interface UseDriverSimulationProps {
  destination: { lat: number; lng: number };
}

export const useDriverSimulation = ({ destination }: UseDriverSimulationProps) => {
  const [driverInfo, setDriverInfo] = useState<DriverDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [driverMarker, setDriverMarker] = useState<{ 
    position: { lat: number; lng: number };
    title: string;
  } | null>(null);

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
        
        const newLat = prev.location.lat + (destination.lat - prev.location.lat) * 0.05;
        const newLng = prev.location.lng + (destination.lng - prev.location.lng) * 0.05;
        
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
  }, [isLoading, driverInfo, destination]);

  return { driverInfo, isLoading, driverMarker };
};
