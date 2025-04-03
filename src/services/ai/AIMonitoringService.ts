import { AIAssistantLog, AIAssistantMetrics } from "@/types/aiAssistant";
import { CommandType } from "./AICommandProcessor";

/**
 * Service for monitoring and collecting metrics about AI Assistant usage
 */
export class AIMonitoringService {
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
    return this.logs.filter(log => {
      if (filters.commandType !== undefined && log.commandType !== filters.commandType) return false;
      if (filters.success !== undefined && log.success !== filters.success) return false;
      if (filters.startDate && log.timestamp < filters.startDate) return false;
      if (filters.endDate && log.timestamp > filters.endDate) return false;
      if (filters.userId && log.userId !== filters.userId) return false;
      return true;
    });
  }
  
  /**
   * Generate metrics from logs
   */
  static getMetrics(timeframeInDays = 7): AIAssistantMetrics {
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - timeframeInDays);
    
    const relevantLogs = this.getLogs().filter(log => log.timestamp >= startDate);
    
    // Basic metrics
    const totalInteractions = relevantLogs.length;
    const successfulInteractions = relevantLogs.filter(log => log.success).length;
    const failedInteractions = totalInteractions - successfulInteractions;
    
    // Processing time
    const totalProcessingTime = relevantLogs.reduce((sum, log) => sum + log.processingTimeMs, 0);
    const averageProcessingTimeMs = totalInteractions > 0 
      ? Math.round(totalProcessingTime / totalInteractions) 
      : 0;
    
    // Command type distribution
    const commandTypeDistribution: Record<string, number> = {};
    relevantLogs.forEach(log => {
      const type = log.commandType;
      commandTypeDistribution[type] = (commandTypeDistribution[type] || 0) + 1;
    });
    
    // Daily interaction counts
    const dailyInteractionMap = new Map<string, number>();
    for (let i = 0; i < timeframeInDays; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      dailyInteractionMap.set(dateString, 0);
    }
    
    relevantLogs.forEach(log => {
      const dateString = log.timestamp.toISOString().split('T')[0];
      if (dailyInteractionMap.has(dateString)) {
        dailyInteractionMap.set(dateString, dailyInteractionMap.get(dateString)! + 1);
      }
    });
    
    const dailyInteractions = Array.from(dailyInteractionMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    return {
      totalInteractions,
      successfulInteractions,
      failedInteractions,
      averageProcessingTimeMs,
      commandTypeDistribution,
      dailyInteractions
    };
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
