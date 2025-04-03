
import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ConfiguratorHeaderProps {
  handleReset: () => void;
}

const ConfiguratorHeader: React.FC<ConfiguratorHeaderProps> = ({ handleReset }) => {
  return (
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
  );
};

export default ConfiguratorHeader;
