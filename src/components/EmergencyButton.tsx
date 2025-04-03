
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, X, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const EmergencyButton: React.FC = () => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleEmergencyCall = () => {
    toast({
      title: t("emergency.emergencyCall"),
      description: t("emergency.connecting"),
      variant: "destructive",
      duration: 5000,
      role: "alert", // Add ARIA role for screen readers
    });
  };

  const handleSupportCall = () => {
    toast({
      title: t("emergency.contactSupport"),
      description: t("emergency.supportConnecting"),
      duration: 3000,
      role: "status", // Add ARIA role for screen readers
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && expanded) {
      setExpanded(false);
    }
  };

  if (!expanded) {
    return (
      <Button
        onClick={toggleExpanded}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-destructive hover:bg-destructive/80 flex items-center justify-center p-0"
        aria-label={t("emergency.open")}
        aria-expanded={expanded}
        title={t("emergency.open")}
        onKeyDown={handleKeyPress}
      >
        <AlertCircle className="h-6 w-6" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <div 
      className="fixed bottom-6 right-6 bg-card shadow-lg rounded-lg p-4 border animate-in fade-in slide-in-from-bottom-5 z-50"
      role="dialog"
      aria-label={t("emergency.title")}
      onKeyDown={handleKeyPress}
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">{t("emergency.title")}</h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleExpanded}
          aria-label={t("emergency.close")}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
      <div className="space-y-2">
        <Button 
          variant="destructive" 
          className="w-full gap-2"
          onClick={handleEmergencyCall}
          aria-label={t("emergency.emergencyCall")}
        >
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {t("emergency.emergencyCall")}
        </Button>
        <Button 
          variant="outline" 
          className="w-full gap-2"
          onClick={handleSupportCall}
          aria-label={t("emergency.contactSupport")}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {t("emergency.contactSupport")}
        </Button>
      </div>
    </div>
  );
};

export default EmergencyButton;
