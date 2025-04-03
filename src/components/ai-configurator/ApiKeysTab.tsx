
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Key, AlertCircle } from "lucide-react";
import { AIAssistantConfig, AIProviderType } from "@/types/aiAssistant";
import { UseFormReturn } from "react-hook-form";
import { AIConfigService } from "@/services/ai/AIConfigService";

interface ApiKeysTabProps {
  form: UseFormReturn<AIAssistantConfig>;
  selectedProvider: AIProviderType;
}

const ApiKeysTab: React.FC<ApiKeysTabProps> = ({ form, selectedProvider }) => {
  const availableProviders = AIConfigService.getAvailableProviders();
  
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ApiKeysTab;
