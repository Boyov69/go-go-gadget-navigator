
import { mapStyles, MapStyleName } from './mapStyles';

// Store API key securely
const apiKey = 'AIzaSyALuCNNPFkcBqo6mC2QAzT7PSJZs44RNHU';

export const initializeGoogleMapsScript = (callback: () => void): void => {
  // Check if Google Maps API is already loaded
  if (!window.google) {
    // If not loaded, create script and load it
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    window.initMap = callback;
    
    document.head.appendChild(script);
  } else {
    // If API is already loaded, call the callback directly
    callback();
  }
};

export const createMapInstance = (
  mapElement: HTMLDivElement, 
  options: {
    center: { lat: number; lng: number };
    zoom: number;
    showControls: boolean;
    mapStyle?: MapStyleName;
  },
  onClick?: (e: google.maps.MapMouseEvent) => void
): google.maps.Map => {
  const mapOptions = {
    center: options.center,
    zoom: options.zoom,
    disableDefaultUI: !options.showControls,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: options.mapStyle ? mapStyles[options.mapStyle] : [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  };
  
  const map = new window.google.maps.Map(mapElement, mapOptions);
  
  // Add event listener if onClick is provided
  if (onClick) {
    map.addListener("click", onClick);
  }
  
  return map;
};
