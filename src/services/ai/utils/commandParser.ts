
import { CommandType } from '../types/commandTypes';
import { commandPatterns } from './commandPatterns';

/**
 * Detect the type of command based on keywords and patterns
 */
export function detectCommandType(command: string): CommandType {
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
export function extractCommandDetails(command: string, type: CommandType): string {
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
