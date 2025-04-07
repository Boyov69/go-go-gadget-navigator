
// Replace direct API key exposure with a more secure approach
// This file should be modified to get the API key from a more secure source
// or implement proper key restrictions in Google Cloud Console

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
  
  // API key should have domain restrictions in Google Cloud Console
  const apiKey = "AIzaSyALuCNNPFkcBqo6mC2QAzT7PSJZs44RNHU";
  
  // Load script with async attribute for better performance
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&loading=async`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};
