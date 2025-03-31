
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Map, 
  Navigation2, 
  MapPin, 
  Search, 
  Heart, 
  Share2 
} from "lucide-react";

const QuickTools: React.FC = () => {
  const { toast } = useToast();
  
  const tools = [
    { icon: Navigation2, label: "Navigate", color: "bg-blue-100", action: "Navigation started" },
    { icon: Map, label: "Explore Map", color: "bg-teal-100", action: "Exploring map" },
    { icon: MapPin, label: "Saved Places", color: "bg-blue-100", action: "Viewing saved places" },
    { icon: Search, label: "Search", color: "bg-teal-100", action: "Search activated" },
  ];

  const handleToolClick = (toolName: string, action: string) => {
    toast({
      title: toolName,
      description: action,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Quick Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <Button
            key={index}
            variant="outline"
            className={`h-auto flex-col gap-2 py-6 ${tool.color} hover:bg-accent border-2`}
            onClick={() => handleToolClick(tool.label, tool.action)}
          >
            <tool.icon className="h-6 w-6" />
            <span>{tool.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickTools;
