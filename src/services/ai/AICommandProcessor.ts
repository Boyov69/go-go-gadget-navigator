
import { CommandType } from './types/commandTypes';
import { detectCommandType, extractCommandDetails } from './utils/commandParser';
import { 
  handleNavigationCommand,
  handleSearchCommand,
  handleSettingsCommand,
  handleHelpCommand,
  handleTabControlCommand,
  handleAppNavigationCommand,
  handleWebNavigationCommand
} from './handlers/commandHandlers';
import { AIMonitoringService } from './AIMonitoringService';

export { CommandType };

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
