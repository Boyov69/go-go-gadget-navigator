
// Replace direct API key exposure with a more secure approach
// This file should be modified to get the API key from a more secure source
// or implement proper key restrictions in Google Cloud Console

// API key should have domain restrictions in Google Cloud Console
const apiKey = "AIzaSyALuCNNPFkcBqo6mC2QAzT7PSJZs44RNHU";

// Initialize map functionality once the API is loaded
export const initMap = () => {
  try {
    // The API key should have proper domain restrictions set in Google Cloud Console
    // to prevent unauthorized usage
    if (!window.google) {
      console.error("Google Maps API not loaded");
      return;
    }
    
    // Initialize map functionality once the API is loaded
    // This just handles initialization, the actual map creation happens in components
    console.log("Google Maps API initialized successfully");
  } catch (error) {
    console.error("Error initializing Google Maps:", error);
  }
};

// Secure loader function that can be called to load the API
export const loadGoogleMapsApi = (callback: () => void) => {
  // Check if API is already loaded
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  
  // Create a global callback function
  window.initMap = callback;
  
  // Load script with async attribute for better performance
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&loading=async`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

// New function to initialize the Google Maps script - this is what useMapInitializer.ts is trying to import
export const initializeGoogleMapsScript = (callback: () => void) => {
  // This is essentially an alias for loadGoogleMapsApi to match the expected function name
  loadGoogleMapsApi(callback);
};

// New function to create a map instance - this is what useMapInitializer.ts is trying to import
export const createMapInstance = (
  mapElement: HTMLElement,
  options: {
    center: { lat: number; lng: number };
    zoom: number;
    showControls: boolean;
    mapStyle?: any;
  },
  onClick?: (e: google.maps.MapMouseEvent) => void
): google.maps.Map => {
  // Create a new map instance
  const mapOptions: google.maps.MapOptions = {
    center: options.center,
    zoom: options.zoom,
    mapTypeControl: options.showControls,
    fullscreenControl: options.showControls,
    styles: options.mapStyle || [],
    // Use correct property for Street View controls
    streetViewControlOptions: {
      position: options.showControls ? google.maps.ControlPosition.RIGHT_TOP : undefined
    }
  };
  
  const map = new google.maps.Map(mapElement, mapOptions);
  
  // Add click event listener if provided
  if (onClick && typeof onClick === 'function') {
    map.addListener('click', onClick);
  }
  
  return map;
};
