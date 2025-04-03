
import { AIAssistantConfig } from "@/types/aiAssistant";

/**
 * Service for managing AI Assistant configuration
 */
export class AIConfigService {
  private static readonly CONFIG_KEY = "ai_assistant_config";
  
  // Default configuration
  private static readonly DEFAULT_CONFIG: AIAssistantConfig = {
    enabled: true,
    model: "gpt-4o-mini",
    temperature: 0.7,
    maxTokens: 1024,
    enableLogs: true,
    enableVoice: true,
    enableSuggestions: true,
    responseTone: "professional",
    allowedCommands: ["navigation", "search", "information", "action"],
    apiThrottleLimit: 10,
    defaultPrompt: "You are a helpful assistant for a transportation and logistics platform."
  };
  
  /**
   * Get the current AI Assistant configuration
   */
  static getConfig(): AIAssistantConfig {
    try {
      const storedConfig = localStorage.getItem(this.CONFIG_KEY);
      if (storedConfig) {
        return { ...this.DEFAULT_CONFIG, ...JSON.parse(storedConfig) };
      }
    } catch (error) {
      console.error("Error retrieving AI config:", error);
    }
    
    return { ...this.DEFAULT_CONFIG };
  }
  
  /**
   * Save AI Assistant configuration
   */
  static saveConfig(config: Partial<AIAssistantConfig>): AIAssistantConfig {
    try {
      const currentConfig = this.getConfig();
      const updatedConfig = { ...currentConfig, ...config };
      
      localStorage.setItem(this.CONFIG_KEY, JSON.stringify(updatedConfig));
      console.info("AI Assistant configuration saved successfully");
      
      return updatedConfig;
    } catch (error) {
      console.error("Error saving AI config:", error);
      return this.getConfig();
    }
  }
  
  /**
   * Reset configuration to defaults
   */
  static resetConfig(): AIAssistantConfig {
    localStorage.removeItem(this.CONFIG_KEY);
    return { ...this.DEFAULT_CONFIG };
  }
}
