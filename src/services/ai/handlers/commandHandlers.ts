
import { pageMapping, tabMapping } from '../utils/navigationMappings';

/**
 * Handle navigation-related commands
 */
export function handleNavigationCommand(details: string): string {
  // In a real implementation, this would interact with the navigation system
  // For now, we just return a response
  return `Planning route to ${details}. You can see the route on your map.`;
}

/**
 * Handle search-related commands
 */
export function handleSearchCommand(details: string): string {
  // In a real implementation, this would trigger a search
  return `Searching for ${details} in your area.`;
}

/**
 * Handle settings-related commands
 */
export function handleSettingsCommand(details: string): string {
  // In a real implementation, this would open or modify settings
  return `Opening settings. What would you like to change?`;
}

/**
 * Handle help-related commands
 */
export function handleHelpCommand(details: string): string {
  return `I can help you navigate, search for places, or change settings. Try saying "navigate to the airport" or "search for restaurants nearby".`;
}

/**
 * Handle tab control commands
 */
export async function handleTabControlCommand(tabName: string): Promise<string> {
  // Normalize tab name input
  const normalizedTabName = tabName.toLowerCase().trim();
  
  // Check if we're on the public transport page
  const currentPath = window.location.pathname;
  if (currentPath === "/public-transport" || currentPath.includes("/public-transport")) {
    // Try to find the tab
    const targetTab = tabMapping[normalizedTabName];
    
    if (targetTab) {
      // Find tab element and click it
      const tabElement = document.querySelector(`[value="${targetTab}"]`) as HTMLElement;
      if (tabElement) {
        tabElement.click();
        return `Switched to the ${normalizedTabName} tab.`;
      }
    }
  }
  
  // If not on the right page or tab not found
  if (pageMapping["public-transport"]) {
    // Navigate to public transport page
    window.location.href = pageMapping["public-transport"];
    return `Navigating to public transport page to show ${normalizedTabName} tab.`;
  }
  
  return `I couldn't find the ${normalizedTabName} tab. Please try again with a valid tab name.`;
}

/**
 * Handle app navigation commands
 */
export async function handleAppNavigationCommand(pageName: string): Promise<string> {
  // Normalize page name input
  const normalizedPageName = pageName.toLowerCase().trim();
  
  // Check if page exists in our mapping
  const targetPath = pageMapping[normalizedPageName];
  
  if (targetPath) {
    // Navigate to the page
    window.location.href = targetPath;
    return `Navigating to ${pageName} page.`;
  }
  
  return `I couldn't find a page called "${pageName}". Please try again with a valid page name.`;
}

/**
 * Handle web navigation commands
 */
export async function handleWebNavigationCommand(searchTerm: string): Promise<string> {
  // For security, we'll only do Google searches rather than arbitrary website navigation
  // This opens a new tab with a Google search
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
  window.open(searchUrl, '_blank');
  
  return `I've opened a search for "${searchTerm}" in a new tab.`;
}
