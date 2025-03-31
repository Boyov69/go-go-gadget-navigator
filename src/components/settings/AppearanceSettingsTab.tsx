
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const AppearanceSettingsTab: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: t("settings.savePreferences"),
      description: "Your appearance settings have been updated",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("settings.appearance.title")}</CardTitle>
        <CardDescription>
          {t("settings.appearance.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch 
            id="darkMode" 
            checked={darkMode} 
            onCheckedChange={setDarkMode}
          />
          <Label htmlFor="darkMode">{t("settings.appearance.darkMode")}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>{t("settings.savePreferences")}</Button>
      </CardFooter>
    </Card>
  );
};

export default AppearanceSettingsTab;
