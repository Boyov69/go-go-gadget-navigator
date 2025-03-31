
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, X, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyButton: React.FC = () => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleEmergencyCall = () => {
    toast({
      title: "Emergency Call",
      description: "Connecting to emergency services...",
      variant: "destructive",
      duration: 5000,
    });
  };

  const handleSupportCall = () => {
    toast({
      title: "Support Call",
      description: "Connecting to customer support...",
      duration: 3000,
    });
  };

  if (!expanded) {
    return (
      <Button
        onClick={toggleExpanded}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-destructive hover:bg-destructive/80 flex items-center justify-center p-0"
      >
        <AlertCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-card shadow-lg rounded-lg p-4 border animate-in fade-in slide-in-from-bottom-5 z-50">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">Emergency Options</h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleExpanded}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <Button 
          variant="destructive" 
          className="w-full gap-2"
          onClick={handleEmergencyCall}
        >
          <AlertCircle className="h-4 w-4" />
          Emergency Call
        </Button>
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={handleSupportCall}
        >
          <Phone className="h-4 w-4" />
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default EmergencyButton;
