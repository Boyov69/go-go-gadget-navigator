
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs";
import { BrainCircuit } from "lucide-react";
import { AIAssistantConfig, AIProviderType } from "@/types/aiAssistant";
import { AIConfigService } from "@/services/ai/AIConfigService";
import { useToast } from "@/hooks/use-toast";
import { useAIConfig } from "@/contexts/AIConfigContext";

import ConfiguratorHeader from "./ConfiguratorHeader";
import ConfiguratorFooter from "./ConfiguratorFooter";
import GeneralSettingsTab from "./GeneralSettingsTab";
import ModelSettingsTab from "./ModelSettingsTab";
import ApiKeysTab from "./ApiKeysTab";
import FeaturesTab from "./FeaturesTab";
import AdvancedSettingsTab from "./AdvancedSettingsTab";
import ConfigurationTester from "./ConfigurationTester";

interface AIConfiguratorContentProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AIConfiguratorContent: React.FC<AIConfiguratorContentProps> = ({ sidebarOpen, toggleSidebar }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { config: contextConfig, updateConfig: updateContextConfig, saveConfig: saveContextConfig } = useAIConfig();
  
  // Initialize form with React Hook Form
  const form = useForm<AIAssistantConfig>({
    defaultValues: contextConfig
  });
  
  // Track selected model to show appropriate provider API key
  const [selectedProvider, setSelectedProvider] = useState<AIProviderType>(
    AIConfigService.getProviderForModel(form.getValues().model)
  );

  // Update the form when context config changes
  useEffect(() => {
    form.reset(contextConfig);
  }, [contextConfig, form]);

  // Update selected provider when model changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'model' && value.model) {
        const provider = AIConfigService.getProviderForModel(value.model);
        setSelectedProvider(provider);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);
  
  // Handle form submission
  const onSubmit = async (data: AIAssistantConfig) => {
    setSaving(true);
    try {
      // Update the context with form data
      updateContextConfig(data);
      // Save to storage
      saveContextConfig(data);
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast({
        title: "Error Saving Configuration",
        description: "There was a problem saving your configuration. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };
  
  // Reset configuration to defaults
  const handleReset = () => {
    const defaultConfig = AIConfigService.resetConfig();
    form.reset(defaultConfig);
    updateContextConfig(defaultConfig);
    toast({
      title: "Configuration Reset",
      description: "AI Assistant configuration has been reset to defaults.",
      duration: 3000,
    });
  };

  return (
    <main className="flex-1 p-6">
      <ConfiguratorHeader handleReset={handleReset} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5" />
                AI Assistant Settings
              </CardTitle>
              <CardDescription>
                Configure how the AI Assistant behaves and interacts with users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="model">Model Settings</TabsTrigger>
                  <TabsTrigger value="api">API Keys</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  <TabsTrigger value="testing">Testing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                  <GeneralSettingsTab form={form} />
                </TabsContent>
                
                <TabsContent value="model">
                  <ModelSettingsTab form={form} />
                </TabsContent>
                
                <TabsContent value="api">
                  <ApiKeysTab form={form} selectedProvider={selectedProvider} />
                </TabsContent>
                
                <TabsContent value="features">
                  <FeaturesTab form={form} />
                </TabsContent>
                
                <TabsContent value="advanced">
                  <AdvancedSettingsTab form={form} />
                </TabsContent>

                <TabsContent value="testing">
                  <ConfigurationTester config={form.getValues()} />
                </TabsContent>
              </Tabs>
            </CardContent>
            <ConfiguratorFooter 
              onCancel={() => form.reset(contextConfig)} 
              saving={saving} 
              formIsDirty={form.formState.isDirty} 
            />
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default AIConfiguratorContent;
