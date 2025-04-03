
import { AIAssistantLog, AIAssistantMetrics } from "@/types/aiAssistant";
import { CommandType } from "./AICommandProcessor";
import { AILoggingService } from "./AILoggingService";
import { AIDataService } from "./AIDataService";
import { AIMetricsService } from "./AIMetricsService";

/**
 * Facade service for AI Assistant monitoring
 * Provides a unified interface to the more specialized services
 */
export class AIMonitoringService {
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
    return AILoggingService.logInteraction(
      command,
      response,
      commandType,
      processingTimeMs,
      success,
      error,
      metadata
    );
  }
  
  /**
   * Get all logs
   */
  static getLogs(): AIAssistantLog[] {
    return AILoggingService.getLogs();
  }
  
  /**
   * Get logs with filtering
   */
  static getFilteredLogs(
    filters: {
      commandType?: CommandType | string;
      success?: boolean;
      startDate?: Date;
      endDate?: Date;
      userId?: string;
    }
  ): AIAssistantLog[] {
    return AIDataService.getFilteredLogs(filters);
  }
  
  /**
   * Generate metrics from logs
   */
  static getMetrics(timeframeInDays = 7): AIAssistantMetrics {
    return AIMetricsService.getMetrics(timeframeInDays);
  }
  
  /**
   * Clear all logs (mainly for testing)
   */
  static clearLogs(): void {
    AILoggingService.clearLogs();
  }
}
