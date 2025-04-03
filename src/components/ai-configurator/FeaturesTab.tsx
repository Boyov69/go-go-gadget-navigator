
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Mic, MessageSquare } from "lucide-react";
import { AIAssistantConfig } from "@/types/aiAssistant";
import { UseFormReturn } from "react-hook-form";

interface FeaturesTabProps {
  form: UseFormReturn<AIAssistantConfig>;
}

const FeaturesTab: React.FC<FeaturesTabProps> = ({ form }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default FeaturesTab;
