
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Save, RotateCcw, Settings, AlertCircle, BrainCircuit, Mic, MessageSquare, Key } from "lucide-react";
import { AIAssistantConfig, AIProviderType } from "@/types/aiAssistant";
import { AIConfigService } from "@/services/ai/AIConfigService";
import AdminGuard from "@/components/guards/AdminGuard";
import { UserRole } from "@/services/auth";
import { useToast } from "@/hooks/use-toast";

const AIConfigurator: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  
  // Initialize form with React Hook Form
  const form = useForm<AIAssistantConfig>({
    defaultValues: AIConfigService.getConfig()
  });
  
  // Track selected model to show appropriate provider API key
  const [selectedProvider, setSelectedProvider] = useState<AIProviderType>(
    AIConfigService.getProviderForModel(form.getValues().model)
  );

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
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Handle form submission
  const onSubmit = async (data: AIAssistantConfig) => {
    setSaving(true);
    try {
      const savedConfig = AIConfigService.saveConfig(data);
      toast({
        title: "Configuration Saved",
        description: "AI Assistant configuration has been updated successfully.",
        duration: 3000,
      });
      // Update form with saved values
      form.reset(savedConfig);
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
    toast({
      title: "Configuration Reset",
      description: "AI Assistant configuration has been reset to defaults.",
      duration: 3000,
    });
  };

  // Get all available models
  const availableModels = AIConfigService.getAvailableModels();
  
  // Get all available providers
  const availableProviders = AIConfigService.getAvailableProviders();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">AI Assistant Configuration</h1>
              <p className="text-muted-foreground">Manage settings and behavior of the AI Assistant</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset to Defaults
              </Button>
            </div>
          </div>
          
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
                    </TabsList>
                    
                    <TabsContent value="general" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="enabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Enable AI Assistant</FormLabel>
                              <FormDescription>
                                Turn the AI Assistant on or off globally
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="responseTone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Response Tone</FormLabel>
                            <FormControl>
                              <Select 
                                value={field.value} 
                                onValueChange={(value) => field.onChange(value as AIAssistantConfig['responseTone'])}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a tone" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="professional">Professional</SelectItem>
                                  <SelectItem value="friendly">Friendly</SelectItem>
                                  <SelectItem value="concise">Concise</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Set the conversational style of AI responses
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="defaultPrompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default System Prompt</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter the default system prompt for the AI"
                                {...field}
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormDescription>
                              This prompt helps define the AI's personality and knowledge base
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="model" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AI Model</FormLabel>
                            <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an AI model" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                  {availableModels.map((model) => (
                                    <SelectItem key={model.id} value={model.id}>
                                      <div className="flex flex-col">
                                        <span>{model.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {model.provider}
                                        </span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Select which language model powers the AI Assistant
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="temperature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Temperature: {field.value.toFixed(1)}</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={1}
                                step={0.1}
                                value={[field.value]}
                                onValueChange={(values) => field.onChange(values[0])}
                              />
                            </FormControl>
                            <FormDescription>
                              Controls randomness: lower values are more focused, higher values more creative
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxTokens"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Tokens</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={100}
                                max={8192}
                                step={1}
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum length of AI responses (100-8192)
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="api" className="space-y-4">
                      <div className="p-3 border rounded-md bg-blue-50 dark:bg-blue-950/30 mb-4">
                        <div className="flex items-start gap-3">
                          <Key className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">API Key Configuration</h4>
                            <p className="text-sm mt-1 text-blue-700 dark:text-blue-300">
                              Add API keys for each model provider to connect to real AI models. 
                              Keys are stored securely in your browser's local storage.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {availableProviders.map((provider) => (
                        <div key={provider} className="space-y-4 border-b pb-4 last:border-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{provider}</h3>
                            <FormField
                              control={form.control}
                              name={`providers.${provider}.enabled`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-2">
                                  <FormLabel>Enabled</FormLabel>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`providers.${provider}.apiKey`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>API Key</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder={`Enter your ${provider} API key`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  {provider === "OpenAI" && "Get your API key from https://platform.openai.com/account/api-keys"}
                                  {provider === "Anthropic" && "Get your API key from https://console.anthropic.com/account/keys"}
                                  {provider === "Meta" && "Contact Meta to obtain your Llama API credentials"}
                                  {provider === "Google" && "Get your API key from Google AI Studio"}
                                  {provider === "Mistral AI" && "Get your API key from https://console.mistral.ai/api-keys/"}
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          
                          {provider === "OpenAI" && (
                            <FormField
                              control={form.control}
                              name={`providers.${provider}.organizationId`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Organization ID (Optional)</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your OpenAI Organization ID"
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Only required if you're using an organization in OpenAI
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          )}
                          
                          <FormField
                            control={form.control}
                            name={`providers.${provider}.endpoint`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Custom API Endpoint (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={`Enter custom ${provider} API endpoint`}
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Only required if you're using a custom deployment or proxy
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                      
                      {selectedProvider && (
                        <div className="p-3 border rounded-md bg-green-50 dark:bg-green-950/30 mt-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-green-800 dark:text-green-200">Current Model Provider</h4>
                              <p className="text-sm mt-1 text-green-700 dark:text-green-300">
                                The currently selected model ({form.getValues().model}) requires a valid {selectedProvider} API key.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="features" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="enableVoice"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="flex items-center gap-2">
                                <Mic className="h-4 w-4" />
                                Voice Interaction
                              </FormLabel>
                              <FormDescription>
                                Allow users to interact with the AI using voice commands
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="enableSuggestions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Smart Suggestions
                              </FormLabel>
                              <FormDescription>
                                Show contextual suggestion chips during conversations
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="enableLogs"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Enable Logging</FormLabel>
                              <FormDescription>
                                Record AI interactions for analytics and improvements
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                    
                    <TabsContent value="advanced" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="allowedCommands"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allowed Command Types</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="navigation,search,information,action"
                                value={field.value.join(",")}
                                onChange={(e) => field.onChange(e.target.value.split(",").map(item => item.trim()))}
                              />
                            </FormControl>
                            <FormDescription>
                              Comma-separated list of allowed command types
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiThrottleLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Rate Limit</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={100}
                                step={1}
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum requests per minute allowed (1-100)
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <div className="p-3 border rounded-md bg-amber-50 dark:bg-amber-950/30">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">Advanced Settings Warning</h4>
                            <p className="text-sm mt-1 text-amber-700 dark:text-amber-300">
                              Changing these settings may affect the performance and reliability of the AI Assistant.
                              Consider testing changes thoroughly before deploying to production.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => form.reset()} 
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={saving || !form.formState.isDirty}
                    className="gap-2"
                  >
                    {saving && <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                    <Save className="h-4 w-4" />
                    Save Configuration
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </main>
      </div>
    </div>
  );
};

const AIConfiguratorPage: React.FC = () => (
  <AdminGuard requiredRole={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
    <AIConfigurator />
  </AdminGuard>
);

export default AIConfiguratorPage;
