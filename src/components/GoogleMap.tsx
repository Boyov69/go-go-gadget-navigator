
import React, { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Plus, Minus, Locate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define types for the Google Maps API
declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}

// Define prop types for the GoogleMap component
interface Marker {
  position: { lat: number; lng: number };
  icon?: string;
  title?: string;
  animation?: google.maps.Animation;
}

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Marker[];
  className?: string;
  height?: string;
  showControls?: boolean;
  movingMarker?: Marker;
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 51.505, lng: -0.09 },
  zoom = 14,
  markers = [],
  className = "",
  height = "400px",
  showControls = true,
  movingMarker,
  onClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapMarkers, setMapMarkers] = useState<google.maps.Marker[]>([]);
  const [movingMapMarker, setMovingMapMarker] = useState<google.maps.Marker | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (!window.google) {
      // If not loaded, create script and load it
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        if (mapRef.current) {
          initializeMap();
        }
      };
      
      document.head.appendChild(script);
      
      return () => {
        // Clean up the global callback
        delete window.initMap;
      };
    } else if (mapRef.current && !map) {
      // If API is already loaded, initialize the map
      initializeMap();
    }
  }, [mapRef.current]);

  // Initialize Google Map
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;
    
    const mapOptions = {
      center,
      zoom,
      disableDefaultUI: !showControls,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    };
    
    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
    
    // Add event listener if onClick is provided
    if (onClick) {
      newMap.addListener("click", onClick);
    }
  };
  
  // Add markers when map or markers change
  useEffect(() => {
    if (!map || !window.google) return;
    
    // Clear previous markers
    mapMarkers.forEach(marker => marker.setMap(null));
    setMapMarkers([]);
    
    // Add new markers
    const newMapMarkers = markers.map(marker => {
      return new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title,
        icon: marker.icon,
        animation: marker.animation
      });
    });
    
    setMapMarkers(newMapMarkers);
  }, [map, markers]);
  
  // Handle moving marker updates
  useEffect(() => {
    if (!map || !movingMarker || !window.google) return;
    
    if (movingMapMarker) {
      movingMapMarker.setPosition(movingMarker.position);
    } else {
      const newMarker = new window.google.maps.Marker({
        position: movingMarker.position,
        map,
        title: movingMarker.title,
        icon: movingMarker.icon,
        animation: window.google.maps.Animation.DROP
      });
      setMovingMapMarker(newMarker);
    }
  }, [map, movingMarker]);

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
    <Card className={`relative overflow-hidden rounded-lg ${className}`}>
      <div 
        ref={mapRef} 
        style={{ height, width: "100%" }}
        className="bg-blue-50"
      />
      
      {showControls && (
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
      )}
    </Card>
  );
};

export default GoogleMap;
