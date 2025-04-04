
import { pageMapping } from '../ai/utils/navigationMappings';

export class NavigationService {
  /**
   * Navigate to a specific page in the application
   */
  static navigateToPage(pageName: string): string {
    const normalized = pageName.toLowerCase().trim();
    const path = pageMapping[normalized];
    
    if (path) {
      // Use window.location for navigation
      window.location.href = path;
      return `Navigating to ${pageName} page`;
    } else {
      return `Sorry, I couldn't find a page called "${pageName}"`;
    }
  }
  
  /**
   * Start navigation to a specific destination on the map
   */
  static startNavigation(destination: string): string {
    // For now, just redirect to the navigate page
    // with the destination as a query parameter
    window.location.href = `/navigate?destination=${encodeURIComponent(destination)}`;
    return `Starting navigation to ${destination}`;
  }
  
  /**
   * Search for a location on external maps service
   */
  static searchLocation(location: string): string {
    // Open Google Maps in a new tab
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(location)}`, '_blank');
    return `Searching for ${location} on Google Maps`;
  }
}
