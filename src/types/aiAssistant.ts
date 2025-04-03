
/**
 * Types for AI Assistant monitoring and logging
 */

export interface AIAssistantLog {
  id: string;
  timestamp: Date;
  command: string;
  response: string;
  processingTimeMs: number;
  commandType: string;
  success: boolean;
  error?: string;
  userId?: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

export interface AIAssistantMetrics {
  totalInteractions: number;
  successfulInteractions: number;
  failedInteractions: number;
  averageProcessingTimeMs: number;
  commandTypeDistribution: Record<string, number>;
  dailyInteractions: Array<{
    date: string;
    count: number;
  }>;
}

export interface AIAssistantMonitoringState {
  logs: AIAssistantLog[];
  metrics: AIAssistantMetrics;
  isLoading: boolean;
  error: string | null;
}
