
import { AIAssistantMetrics } from "@/types/aiAssistant";
import { AILoggingService } from "./AILoggingService";

/**
 * Service for generating metrics and analytics from AI Assistant logs
 */
export class AIMetricsService {
  /**
   * Generate metrics from logs
   */
  static getMetrics(timeframeInDays = 7): AIAssistantMetrics {
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - timeframeInDays);
    
    const relevantLogs = AILoggingService.getLogs().filter(log => log.timestamp >= startDate);
    
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
}
