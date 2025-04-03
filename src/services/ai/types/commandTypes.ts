
/**
 * Command types and interfaces for the AI Assistant
 */

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

// Map of command patterns for pattern matching
export interface CommandPatterns {
  [key: string]: RegExp[];
}
