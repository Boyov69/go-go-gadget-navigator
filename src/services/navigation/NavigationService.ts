
import { pageMapping } from '../ai/utils/navigationMappings';
import { useNavigate } from 'react-router-dom';

export class NavigationService {
  /**
   * Navigate to a specific page in the application
   */
  static navigateToPage(pageName: string): string {
    const normalized = pageName.toLowerCase().trim();
    const path = pageMapping[normalized];
    
    if (path) {
      // Use React Router for navigation instead of direct window.location
      // This function should be called from a component using useNavigate
      return path;
    } else {
      return '';
    }
  }
  
  /**
   * Start navigation to a specific destination on the map
   */
  static getNavigationUrl(destination: string): string {
    return `/navigate?destination=${encodeURIComponent(destination)}`;
  }
  
  /**
   * Search for a location on external maps service
   */
  static searchLocation(location: string): string {
    // This is an external link, so window.open is appropriate
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(location)}`, '_blank');
    return `Searching for ${location} on Google Maps`;
  }
}

// Custom hook for navigation that properly uses React Router
export const useNavigationService = () => {
  const navigate = useNavigate();
  
  return {
    navigateToPage: (pageName: string) => {
      const path = NavigationService.navigateToPage(pageName);
      if (path) {
        navigate(path);
        return `Navigating to ${pageName} page`;
      }
      return `Sorry, I couldn't find a page called "${pageName}"`;
    },
    
    startNavigation: (destination: string) => {
      const path = NavigationService.getNavigationUrl(destination);
      navigate(path);
      return `Starting navigation to ${destination}`;
    },
    
    searchLocation: NavigationService.searchLocation
  };
};
