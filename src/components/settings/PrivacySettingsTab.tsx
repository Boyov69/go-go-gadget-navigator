
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const PrivacySettingsTab: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: t("settings.savePreferences"),
      description: "Your privacy settings have been updated",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("settings.privacy.title")}</CardTitle>
        <CardDescription>
          {t("settings.privacy.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="locationSharing" defaultChecked />
          <Label htmlFor="locationSharing">{t("settings.privacy.location")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="dataCollection" defaultChecked />
          <Label htmlFor="dataCollection">{t("settings.privacy.data")}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>{t("settings.savePreferences")}</Button>
      </CardFooter>
    </Card>
  );
};

export default PrivacySettingsTab;
