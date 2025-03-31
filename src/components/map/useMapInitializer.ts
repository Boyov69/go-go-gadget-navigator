
import { useState, useEffect, MutableRefObject } from 'react';

interface MapInitializerOptions {
  center: { lat: number; lng: number };
  zoom: number;
  showControls: boolean;
}

export const useMapInitializer = (
  mapRef: MutableRefObject<HTMLDivElement | null>,
  options: MapInitializerOptions,
  onClick?: (e: google.maps.MapMouseEvent) => void
) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Store API key securely
  const apiKey = 'AIzaSyALuCNNPFkcBqo6mC2QAzT7PSJZs44RNHU';

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;
    
    const mapOptions = {
      center: options.center,
      zoom: options.zoom,
      disableDefaultUI: !options.showControls,
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

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (!window.google) {
      // If not loaded, create script and load it
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

  return { map };
};
