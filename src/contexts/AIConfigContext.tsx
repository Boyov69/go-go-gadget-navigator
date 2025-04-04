
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AIAssistantConfig } from '@/types/aiAssistant';
import { AIConfigService } from '@/services/ai/AIConfigService';
import { useToast } from '@/hooks/use-toast';

interface AIConfigContextType {
  config: AIAssistantConfig;
  updateConfig: (newConfig: Partial<AIAssistantConfig>) => void;
  resetConfig: () => void;
  isConfigValid: boolean;
  saveConfig: (config: AIAssistantConfig) => void;
}

const AIConfigContext = createContext<AIConfigContextType | undefined>(undefined);

export const AIConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AIAssistantConfig>(AIConfigService.getConfig());
  const [isConfigValid, setIsConfigValid] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Simple validation check - could be enhanced
      setIsConfigValid(!!config.model && config.enabled !== undefined);
    } catch (error) {
      setIsConfigValid(false);
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<AIAssistantConfig>) => {
    const updatedConfig = { ...config, ...newConfig } as AIAssistantConfig;
    setConfig(updatedConfig);
  };

  const saveConfig = (configToSave: AIAssistantConfig) => {
    try {
      AIConfigService.saveConfig(configToSave);
      toast({
        title: "Configuration Saved",
        description: "AI Assistant configuration has been updated successfully.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: "Error Saving Configuration",
        description: "There was a problem saving your configuration.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const resetConfig = () => {
    const defaultConfig = AIConfigService.resetConfig();
    setConfig(defaultConfig);
    toast({
      title: "Configuration Reset",
      description: "AI Assistant configuration has been reset to defaults.",
      duration: 3000,
    });
  };

  return (
    <AIConfigContext.Provider value={{ 
      config, 
      updateConfig, 
      resetConfig, 
      isConfigValid,
      saveConfig
    }}>
      {children}
    </AIConfigContext.Provider>
  );
};

export const useAIConfig = () => {
  const context = useContext(AIConfigContext);
  if (context === undefined) {
    throw new Error('useAIConfig must be used within an AIConfigProvider');
  }
  return context;
};
