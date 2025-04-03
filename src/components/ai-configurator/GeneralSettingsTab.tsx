
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AIAssistantConfig } from "@/types/aiAssistant";
import { UseFormReturn } from "react-hook-form";

interface GeneralSettingsTabProps {
  form: UseFormReturn<AIAssistantConfig>;
}

const GeneralSettingsTab: React.FC<GeneralSettingsTabProps> = ({ form }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default GeneralSettingsTab;
