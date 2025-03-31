
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus, Locate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MapControlsProps {
  map: google.maps.Map | null;
  showControls?: boolean;
}

export const MapControls: React.FC<MapControlsProps> = ({
  map,
  showControls = true
}) => {
  const { toast } = useToast();

  if (!showControls) return null;

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom()! + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom()! - 1);
    }
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          if (map && window.google) {
            map.setCenter(userLocation);
            map.setZoom(15);
            
            // Add a marker at the user's location
            new window.google.maps.Marker({
              position: userLocation,
              map,
              title: "Your Location",
              animation: window.google.maps.Animation.DROP
            });
          }
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to access your location."
          });
        }
      );
    } else {
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by your browser."
      });
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="bg-white shadow-sm" onClick={handleZoomIn}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white shadow-sm" onClick={handleZoomOut}>
          <Minus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="absolute bottom-4 right-4 z-10 shadow-sm flex gap-2"
        onClick={handleMyLocation}
      >
        <Locate className="h-4 w-4" /> My Location
      </Button>
    </>
  );
};
