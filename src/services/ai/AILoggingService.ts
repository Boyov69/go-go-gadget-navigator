
import { AIAssistantLog } from "@/types/aiAssistant";
import { CommandType } from "./AICommandProcessor";

/**
 * Service for logging AI Assistant interactions
 */
export class AILoggingService {
  private static logs: AIAssistantLog[] = [];
  private static readonly MAX_LOGS = 1000; // Keep only the last 1000 logs in memory

  /**
   * Log an AI assistant interaction
   */
  static logInteraction(
    command: string, 
    response: string, 
    commandType: CommandType | string,
    processingTimeMs: number,
    success: boolean,
    error?: string,
    metadata?: Record<string, any>
  ): AIAssistantLog {
    const log: AIAssistantLog = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      command,
      response,
      commandType,
      processingTimeMs,
      success,
      error,
      sessionId: this.getOrCreateSessionId(),
      userId: this.getCurrentUserId(),
      metadata
    };
    
    // Add log to the beginning of the array
    this.logs.unshift(log);
    
    // Trim logs if they exceed max size
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(0, this.MAX_LOGS);
    }
    
    console.info(`AI Assistant: [${commandType}] "${command}" -> ${success ? 'SUCCESS' : 'FAILED'}${error ? ` (${error})` : ''} (${processingTimeMs}ms)`);
    
    return log;
  }
  
  /**
   * Get all logs
   */
  static getLogs(): AIAssistantLog[] {
    return [...this.logs];
  }
  
  /**
   * Clear all logs (mainly for testing)
   */
  static clearLogs(): void {
    this.logs = [];
  }
  
  /**
   * Get or create a session ID
   */
  private static getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('ai_assistant_session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('ai_assistant_session_id', sessionId);
    }
    return sessionId;
  }
  
  /**
   * Get current user ID if available
   */
  private static getCurrentUserId(): string | undefined {
    // This would normally come from your authentication system
    // For now, return undefined or a sample value
    return undefined;
  }
}
