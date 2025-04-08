
// Secure Google Maps initialization with improved type safety

// Type definitions for map creation options
interface MapCreationOptions {
  center: { lat: number; lng: number };
  zoom: number;
  showControls: boolean;
  mapStyle?: any;
}

// API key should have domain restrictions in Google Cloud Console
const apiKey = "AIzaSyALuCNNPFkcBqo6mC2QAzT7PSJZs44RNHU";

// Check if Google Maps API is already loaded
const isGoogleMapsLoaded = (): boolean => {
  return !!(window.google && window.google.maps);
};

// Create a type-safe map instance
export const createMapInstance = (
  mapElement: HTMLElement,
  options: MapCreationOptions,
  onClick?: (e: google.maps.MapMouseEvent) => void
): google.maps.Map => {
  // Create map with proper type definitions
  const mapOptions: google.maps.MapOptions = {
    center: options.center,
    zoom: options.zoom,
    mapTypeControl: options.showControls,
    fullscreenControl: options.showControls,
    disableDefaultUI: !options.showControls,
    styles: options.mapStyle || [],
  };
  
  const map = new google.maps.Map(mapElement, mapOptions);
  
  // Add click event listener if provided
  if (onClick && typeof onClick === 'function') {
    map.addListener('click', onClick);
  }
  
  return map;
};

// Load Google Maps API securely
export const loadGoogleMapsApi = (callback: () => void): void => {
  // Return early if API is already loaded
  if (isGoogleMapsLoaded()) {
    callback();
    return;
  }
  
  // Create a global callback function
  window.initMap = callback;
  
  // Load script with security best practices
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&loading=async`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

// Initialize Google Maps API (alias for backward compatibility)
export const initializeGoogleMapsScript = (callback: () => void): void => {
  loadGoogleMapsApi(callback);
};

// Initialize map functionality (for backward compatibility)
export const initMap = (): void => {
  try {
    if (!isGoogleMapsLoaded()) {
      console.error("Google Maps API not loaded");
      return;
    }
    
    console.log("Google Maps API initialized successfully");
  } catch (error) {
    console.error("Error initializing Google Maps:", error);
  }
};
