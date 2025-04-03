
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { AIAssistantConfig } from "@/types/aiAssistant";
import { UseFormReturn } from "react-hook-form";

interface AdvancedSettingsTabProps {
  form: UseFormReturn<AIAssistantConfig>;
}

const AdvancedSettingsTab: React.FC<AdvancedSettingsTabProps> = ({ form }) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default AdvancedSettingsTab;
