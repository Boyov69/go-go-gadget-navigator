
import { AIAssistantConfig, AIModelType } from "@/types/aiAssistant";

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

  /**
   * Get all available AI models
   */
  static getAvailableModels(): {id: AIModelType; name: string; provider: string}[] {
    return [
      { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
      { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
      { id: "gpt-4.5-preview", name: "GPT-4.5 Preview", provider: "OpenAI" },
      { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
      { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic" },
      { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic" },
      { id: "llama-3-70b", name: "Llama 3 (70B)", provider: "Meta" },
      { id: "llama-3-8b", name: "Llama 3 (8B)", provider: "Meta" },
      { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
      { id: "gemini-ultra", name: "Gemini Ultra", provider: "Google" },
      { id: "mistral-large", name: "Mistral Large", provider: "Mistral AI" },
      { id: "mistral-medium", name: "Mistral Medium", provider: "Mistral AI" },
      { id: "mixtral-8x7b", name: "Mixtral 8x7B", provider: "Mistral AI" }
    ];
  }
}
