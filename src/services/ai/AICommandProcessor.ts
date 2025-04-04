
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
import { NavigationService } from '../navigation/NavigationService';

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
          // Use NavigationService for app navigation
          NavigationService.navigateToPage(commandDetails);
          break;
          
        case CommandType.WEB_NAVIGATION:
          response = await handleWebNavigationCommand(commandDetails);
          break;
        
        default:
          // Try to process with OpenAI if available
          if (typeof import.meta.env.VITE_OPENAI_API_KEY === 'string' && 
              import.meta.env.VITE_OPENAI_API_KEY.length > 0) {
            try {
              response = await processWithOpenAI(command);
            } catch (error) {
              console.error("OpenAI processing failed:", error);
              response = "I'm not sure how to help with that. Try asking for directions, searching for something, or changing settings.";
            }
          } else {
            response = "I'm not sure how to help with that. Try asking for directions, searching for something, or changing settings.";
          }
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
 * Process commands using OpenAI API when available
 * Note: This requires VITE_OPENAI_API_KEY to be set in .env
 */
async function processWithOpenAI(command: string): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error("OpenAI API key is not configured");
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a navigation assistant. Help users with directions, transport info, and local services. Give brief, helpful responses in 1-2 sentences."
          },
          {
            role: "user",
            content: command
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.choices[0]?.message?.content || "I couldn't process that request.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to process with AI");
  }
}
