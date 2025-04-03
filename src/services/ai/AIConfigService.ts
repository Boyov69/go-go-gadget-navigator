import { AIAssistantConfig, AIModelType, AIProviderType } from "@/types/aiAssistant";

/**
 * Service for managing AI Assistant configuration
 */
export class AIConfigService {
  private static readonly CONFIG_KEY = "ai_assistant_config";
  private static readonly PROVIDER_KEYS_KEY = "ai_provider_keys";
  private static readonly TRANSPORT_API_KEYS_KEY = "transport_api_keys";
  
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
    allowedCommands: ["navigation", "search", "information", "action", "transport"],
    apiThrottleLimit: 10,
    defaultPrompt: "You are a helpful assistant for a transportation and logistics platform.",
    providers: {
      "OpenAI": { enabled: true, apiKey: "" },
      "Anthropic": { enabled: false, apiKey: "" },
      "Meta": { enabled: false, apiKey: "" },
      "Google": { enabled: false, apiKey: "" },
      "Mistral AI": { enabled: false, apiKey: "" }
    },
    transportApis: {
      "iRail": { enabled: true, apiKey: "" },
      "STIB/MIVB": { enabled: false, apiKey: "" },
      "DeLijn": { enabled: false, apiKey: "" },
      "TEC": { enabled: false, apiKey: "" }
    }
  };
  
  /**
   * Get the current AI Assistant configuration
   */
  static getConfig(): AIAssistantConfig {
    try {
      const storedConfig = localStorage.getItem(this.CONFIG_KEY);
      const storedProviderKeys = localStorage.getItem(this.PROVIDER_KEYS_KEY);
      const storedTransportKeys = localStorage.getItem(this.TRANSPORT_API_KEYS_KEY);
      
      let config = { ...this.DEFAULT_CONFIG };
      
      if (storedConfig) {
        config = { ...config, ...JSON.parse(storedConfig) };
      }
      
      // Load provider API keys separately for better security
      if (storedProviderKeys) {
        const providerKeys = JSON.parse(storedProviderKeys);
        Object.keys(providerKeys).forEach(provider => {
          if (config.providers[provider as AIProviderType]) {
            config.providers[provider as AIProviderType].apiKey = providerKeys[provider];
          }
        });
      }
      
      // Load transport API keys separately
      if (storedTransportKeys && config.transportApis) {
        const transportKeys = JSON.parse(storedTransportKeys);
        Object.keys(transportKeys).forEach(api => {
          if (config.transportApis && config.transportApis[api]) {
            config.transportApis[api].apiKey = transportKeys[api];
          }
        });
      }
      
      return config;
    } catch (error) {
      console.error("Error retrieving AI config:", error);
      return { ...this.DEFAULT_CONFIG };
    }
  }
  
  /**
   * Save AI Assistant configuration
   */
  static saveConfig(config: Partial<AIAssistantConfig>): AIAssistantConfig {
    try {
      const currentConfig = this.getConfig();
      const updatedConfig = { ...currentConfig, ...config };
      
      // Store API keys separately
      const providerKeys: Record<string, string> = {};
      const transportKeys: Record<string, string> = {};
      
      Object.entries(updatedConfig.providers).forEach(([provider, providerConfig]) => {
        if (providerConfig.apiKey) {
          providerKeys[provider] = providerConfig.apiKey;
        }
      });
      
      // Store transport API keys separately
      if (updatedConfig.transportApis) {
        Object.entries(updatedConfig.transportApis).forEach(([api, apiConfig]) => {
          if (apiConfig.apiKey) {
            transportKeys[api] = apiConfig.apiKey;
          }
        });
      }
      
      // Store the configuration without API keys
      const configToStore = { ...updatedConfig };
      Object.keys(configToStore.providers).forEach(provider => {
        configToStore.providers[provider as AIProviderType].apiKey = "";
      });
      
      if (configToStore.transportApis) {
        Object.keys(configToStore.transportApis).forEach(api => {
          configToStore.transportApis[api].apiKey = "";
        });
      }
      
      localStorage.setItem(this.CONFIG_KEY, JSON.stringify(configToStore));
      localStorage.setItem(this.PROVIDER_KEYS_KEY, JSON.stringify(providerKeys));
      localStorage.setItem(this.TRANSPORT_API_KEYS_KEY, JSON.stringify(transportKeys));
      
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
    localStorage.removeItem(this.PROVIDER_KEYS_KEY);
    localStorage.removeItem(this.TRANSPORT_API_KEYS_KEY);
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

  /**
   * Get all available AI providers
   */
  static getAvailableProviders(): AIProviderType[] {
    return ["OpenAI", "Anthropic", "Meta", "Google", "Mistral AI"];
  }

  /**
   * Get the provider for a specific model
   */
  static getProviderForModel(modelId: AIModelType): AIProviderType {
    const model = this.getAvailableModels().find(m => m.id === modelId);
    return model ? model.provider as AIProviderType : "OpenAI";
  }

  /**
   * Get all available transport APIs
   */
  static getAvailableTransportAPIs(): string[] {
    return ["iRail", "STIB/MIVB", "DeLijn", "TEC"];
  }
}
