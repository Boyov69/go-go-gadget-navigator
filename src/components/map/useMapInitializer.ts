
import { useState, useEffect, MutableRefObject } from 'react';
import { mapStyles, MapStyleName } from './mapStyles';
import { initializeGoogleMapsScript, createMapInstance } from './mapInitializer';

export { MapStyleName } from './mapStyles';

interface MapInitializerOptions {
  center: { lat: number; lng: number };
  zoom: number;
  showControls: boolean;
  mapStyle?: MapStyleName;
}

export const useMapInitializer = (
  mapRef: MutableRefObject<HTMLDivElement | null>,
  options: MapInitializerOptions,
  onClick?: (e: google.maps.MapMouseEvent) => void
) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;
    
    const newMap = createMapInstance(
      mapRef.current,
      options,
      onClick
    );
    
    setMap(newMap);
  };

  useEffect(() => {
    // Initialize Google Maps
    if (!window.google) {
      initializeGoogleMapsScript(() => {
        if (mapRef.current) {
          initializeMap();
        }
      });
      
      return () => {
        // Clean up the global callback
        delete window.initMap;
      };
    } else if (mapRef.current && !map) {
      // If API is already loaded, initialize the map
      initializeMap();
    }
  }, [mapRef.current]);

  useEffect(() => {
    // Update map style when options change
    if (map && options.mapStyle) {
      map.setOptions({
        styles: options.mapStyle ? mapStyles[options.mapStyle] : []
      });
    }
  }, [options.mapStyle, map]);

  return { map };
};

// Re-export mapStyles for direct access
export { mapStyles } from './mapStyles';
