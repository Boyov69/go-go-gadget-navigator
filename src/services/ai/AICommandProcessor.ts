
import { useLanguage } from "@/contexts/LanguageContext";
import { AIMonitoringService } from "./AIMonitoringService";

// Define the supported command types
export enum CommandType {
  NAVIGATION = 'navigation',
  SEARCH = 'search',
  SETTINGS = 'settings',
  HELP = 'help',
  TAB_CONTROL = 'tab_control',
  APP_NAVIGATION = 'app_navigation',
  WEB_NAVIGATION = 'web_navigation',
  UNKNOWN = 'unknown'
}

// Command patterns for basic natural language understanding
const commandPatterns = {
  navigation: [
    /navigate to (.+)/i,
    /take me to (.+)/i,
    /directions to (.+)/i,
    /go to (.+)/i,
    /how (do|can) I get to (.+)/i
  ],
  search: [
    /find (.+)/i,
    /search for (.+)/i,
    /look up (.+)/i,
    /locate (.+)/i
  ],
  settings: [
    /change settings/i,
    /open settings/i,
    /settings/i,
    /preferences/i,
    /change (.*) preferences/i
  ],
  help: [
    /help/i,
    /how (do|can) I (.+)/i,
    /what can you do/i,
    /show me how to (.+)/i
  ],
  tab_control: [
    /open (.*) tab/i,
    /switch to (.*) tab/i,
    /show (.*) tab/i,
    /select (.*) tab/i,
    /go to (.*) tab/i,
  ],
  app_navigation: [
    /open (.*) page/i,
    /navigate to (.*) page/i,
    /show me (.*) page/i,
    /go to (.*) page/i,
    /take me to (.*) page/i
  ],
  web_navigation: [
    /search (the web|online) for (.+)/i,
    /look up (.+) online/i,
    /find information about (.+)/i,
    /search google for (.+)/i,
    /check (.*) website/i,
    /open website (.+)/i
  ]
};

// Page mapping for navigation
const pageMapping: Record<string, string> = {
  home: "/",
  index: "/",
  main: "/",
  explore: "/explore",
  navigation: "/navigate",
  navigate: "/navigate",
  public: "/public-transport",
  "public transport": "/public-transport",
  trains: "/public-transport",
  transport: "/public-transport",
  cargo: "/cargo",
  settings: "/settings",
  "saved trips": "/saved-trips",
  favorites: "/favorites",
  suppliers: "/suppliers",
  providers: "/suppliers",
  admin: "/admin/dashboard",
  "admin dashboard": "/admin/dashboard",
  "super admin": "/super-admin/dashboard",
  "super admin dashboard": "/super-admin/dashboard"
};

// Tab mapping for public transport
const tabMapping: Record<string, string> = {
  routes: "routes",
  train: "train",
  trains: "train",
  bus: "bus",
  buses: "bus",
  tram: "tram-metro",
  metro: "tram-metro",
  subway: "tram-metro",
  "tram metro": "tram-metro",
  nearby: "nearby",
  stations: "nearby",
  "nearby stations": "nearby"
};

export const AICommandProcessor = {
  /**
   * Process a voice command and determine the appropriate action
   */
  processCommand: async (command: string): Promise<string> => {
    const startTime = performance.now();
    const commandType = detectCommandType(command);
    const commandDetails = extractCommandDetails(command, commandType);
    
    try {
      // Here we could connect to a more sophisticated NLU service
      // For now, we'll use a basic pattern-matching approach
      
      let response: string;
      
      switch (commandType) {
        case CommandType.NAVIGATION:
          response = handleNavigationCommand(commandDetails);
          break;
        
        case CommandType.SEARCH:
          response = handleSearchCommand(commandDetails);
          break;
        
        case CommandType.SETTINGS:
          response = handleSettingsCommand(commandDetails);
          break;
        
        case CommandType.HELP:
          response = handleHelpCommand(commandDetails);
          break;
          
        case CommandType.TAB_CONTROL:
          response = await handleTabControlCommand(commandDetails);
          break;
          
        case CommandType.APP_NAVIGATION:
          response = await handleAppNavigationCommand(commandDetails);
          break;
          
        case CommandType.WEB_NAVIGATION:
          response = await handleWebNavigationCommand(commandDetails);
          break;
        
        default:
          response = "I'm not sure how to help with that. Try asking for directions, searching for something, or changing settings.";
      }
      
      // Log the successful interaction
      const processingTime = Math.round(performance.now() - startTime);
      AIMonitoringService.logInteraction(
        command,
        response,
        commandType,
        processingTime,
        true
      );
      
      return response;
    } catch (error) {
      // Log the failed interaction
      const processingTime = Math.round(performance.now() - startTime);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      AIMonitoringService.logInteraction(
        command,
        "Sorry, I encountered an error processing your request.",
        commandType,
        processingTime,
        false,
        errorMessage
      );
      
      throw error;
    }
  }
};

/**
 * Detect the type of command based on keywords and patterns
 */
function detectCommandType(command: string): CommandType {
  // Check tab control patterns first (higher priority)
  for (const pattern of commandPatterns.tab_control) {
    if (pattern.test(command)) {
      return CommandType.TAB_CONTROL;
    }
  }
  
  // Check app navigation patterns
  for (const pattern of commandPatterns.app_navigation) {
    if (pattern.test(command)) {
      return CommandType.APP_NAVIGATION;
    }
  }
  
  // Check web navigation patterns
  for (const pattern of commandPatterns.web_navigation) {
    if (pattern.test(command)) {
      return CommandType.WEB_NAVIGATION;
    }
  }
  
  // Check navigation patterns
  for (const pattern of commandPatterns.navigation) {
    if (pattern.test(command)) {
      return CommandType.NAVIGATION;
    }
  }
  
  // Check search patterns
  for (const pattern of commandPatterns.search) {
    if (pattern.test(command)) {
      return CommandType.SEARCH;
    }
  }
  
  // Check settings patterns
  for (const pattern of commandPatterns.settings) {
    if (pattern.test(command)) {
      return CommandType.SETTINGS;
    }
  }
  
  // Check help patterns
  for (const pattern of commandPatterns.help) {
    if (pattern.test(command)) {
      return CommandType.HELP;
    }
  }
  
  return CommandType.UNKNOWN;
}

/**
 * Extract relevant details from the command based on its type
 */
function extractCommandDetails(command: string, type: CommandType): string {
  switch (type) {
    case CommandType.NAVIGATION:
      for (const pattern of commandPatterns.navigation) {
        const match = command.match(pattern);
        if (match && match.length > 1) {
          return match[match.length - 1]; // Last capture group should be the destination
        }
      }
      break;
      
    case CommandType.SEARCH:
      for (const pattern of commandPatterns.search) {
        const match = command.match(pattern);
        if (match && match.length > 1) {
          return match[1]; // First capture group should be the search term
        }
      }
      break;
      
    case CommandType.TAB_CONTROL:
      for (const pattern of commandPatterns.tab_control) {
        const match = command.match(pattern);
        if (match && match.length > 1) {
          return match[1].toLowerCase().trim(); // Tab name
        }
      }
      break;
      
    case CommandType.APP_NAVIGATION:
      for (const pattern of commandPatterns.app_navigation) {
        const match = command.match(pattern);
        if (match && match.length > 1) {
          return match[1].toLowerCase().trim(); // Page name
        }
      }
      break;
      
    case CommandType.WEB_NAVIGATION:
      for (const pattern of commandPatterns.web_navigation) {
        const match = command.match(pattern);
        if (match && match.length > 1) {
          // Return the search term or website
          return match[match.length - 1].toLowerCase().trim();
        }
      }
      break;
  }
  
  return command; // Return the full command if no details extracted
}

/**
 * Handle navigation-related commands
 */
function handleNavigationCommand(details: string): string {
  // In a real implementation, this would interact with the navigation system
  // For now, we just return a response
  return `Planning route to ${details}. You can see the route on your map.`;
}

/**
 * Handle search-related commands
 */
function handleSearchCommand(details: string): string {
  // In a real implementation, this would trigger a search
  return `Searching for ${details} in your area.`;
}

/**
 * Handle settings-related commands
 */
function handleSettingsCommand(details: string): string {
  // In a real implementation, this would open or modify settings
  return `Opening settings. What would you like to change?`;
}

/**
 * Handle help-related commands
 */
function handleHelpCommand(details: string): string {
  return `I can help you navigate, search for places, or change settings. Try saying "navigate to the airport" or "search for restaurants nearby".`;
}

/**
 * Handle tab control commands
 */
async function handleTabControlCommand(tabName: string): Promise<string> {
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
async function handleAppNavigationCommand(pageName: string): Promise<string> {
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
async function handleWebNavigationCommand(searchTerm: string): Promise<string> {
  // For security, we'll only do Google searches rather than arbitrary website navigation
  // This opens a new tab with a Google search
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
  window.open(searchUrl, '_blank');
  
  return `I've opened a search for "${searchTerm}" in a new tab.`;
}
