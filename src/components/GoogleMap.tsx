
import React, { useRef } from 'react';
import { Card } from "@/components/ui/card";
import { useMapInitializer } from './map/useMapInitializer';
import { useMapMarkers, useMovingMarker, MarkerProps } from './map/MapMarker';
import { MapControls } from './map/MapControls';

// Define prop types for the GoogleMap component
interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: MarkerProps[];
  className?: string;
  height?: string;
  showControls?: boolean;
  movingMarker?: MarkerProps;
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

  // Initialize map
  const { map } = useMapInitializer(
    mapRef,
    { center, zoom, showControls },
    onClick
  );
  
  // Set up map markers
  useMapMarkers(map, markers);
  
  // Set up moving marker if provided
  useMovingMarker(map, movingMarker);

  return (
    <Card className={`relative overflow-hidden rounded-lg ${className}`}>
      <div 
        ref={mapRef} 
        style={{ height, width: "100%" }}
        className="bg-blue-50"
      />
      
      <MapControls map={map} showControls={showControls} />
    </Card>
  );
};

export default GoogleMap;
