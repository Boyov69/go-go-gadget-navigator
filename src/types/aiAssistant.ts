
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

export type AIModelType = 
  | "gpt-4o-mini" 
  | "gpt-4o" 
  | "gpt-4.5-preview" 
  | "claude-3-opus" 
  | "claude-3-sonnet" 
  | "claude-3-haiku" 
  | "llama-3-70b" 
  | "llama-3-8b" 
  | "gemini-pro" 
  | "gemini-ultra" 
  | "mistral-large" 
  | "mistral-medium" 
  | "mixtral-8x7b";

export interface AIAssistantConfig {
  enabled: boolean;
  model: AIModelType;
  temperature: number;
  maxTokens: number;
  enableLogs: boolean;
  enableVoice: boolean;
  enableSuggestions: boolean;
  responseTone: "professional" | "friendly" | "concise";
  allowedCommands: string[];
  apiThrottleLimit: number;
  defaultPrompt: string;
}
