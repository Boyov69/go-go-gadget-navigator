
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AIAssistantConfig, AIModelType } from "@/types/aiAssistant";
import { UseFormReturn } from "react-hook-form";
import { AIConfigService } from "@/services/ai/AIConfigService";

interface ModelSettingsTabProps {
  form: UseFormReturn<AIAssistantConfig>;
}

const ModelSettingsTab: React.FC<ModelSettingsTabProps> = ({ form }) => {
  const availableModels = AIConfigService.getAvailableModels();
  
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ModelSettingsTab;
