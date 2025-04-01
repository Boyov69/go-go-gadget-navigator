
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
        id: "tech-12345",
        name: "Alex Johnson",
        photo: "/placeholder.svg",
        rating: 4.8,
        vehicle: {
          model: "Ford Transit",
          color: "White",
          licensePlate: "RA 123 SV",
        },
        eta: 9,
        distance: 3.2,
        location: {
          lat: 51.505 - 0.015, // Start a bit south
          lng: -0.11,
        },
      };
      
      setDriverInfo(newDriverInfo);
      setDriverMarker({
        position: newDriverInfo.location,
        title: `${newDriverInfo.name} - Road Assistance`
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate driver movement - move faster for road assistance
  useEffect(() => {
    if (isLoading || !driverInfo) return;

    const interval = setInterval(() => {
      // Simulate movement towards destination
      setDriverInfo(prev => {
        if (!prev) return prev;
        
        const newLat = prev.location.lat + (destination.lat - prev.location.lat) * 0.08;
        const newLng = prev.location.lng + (destination.lng - prev.location.lng) * 0.08;
        
        const newLocation = {
          lat: newLat,
          lng: newLng
        };
        
        // Update driver marker position for the map
        setDriverMarker({
          position: newLocation,
          title: `${prev.name} - Road Assistance`
        });
        
        return {
          ...prev,
          eta: Math.max(0, prev.eta - 0.3),
          distance: Math.max(0, prev.distance - 0.1),
          location: newLocation
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading, driverInfo, destination]);

  return { driverInfo, isLoading, driverMarker };
};
