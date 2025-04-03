
import { useLanguage } from "@/contexts/LanguageContext";
import { AIMonitoringService } from "./AIMonitoringService";

// Define the supported command types
export enum CommandType {
  NAVIGATION = 'navigation',
  SEARCH = 'search',
  SETTINGS = 'settings',
  HELP = 'help',
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
  ]
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
