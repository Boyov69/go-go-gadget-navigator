
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLanguage, SupportedLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const LanguageSettingsTab: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as SupportedLanguage);
  };

  const handleSaveSettings = () => {
    toast({
      title: t("settings.saveLanguage"),
      description: "Your language settings have been updated",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("settings.language.title")}</CardTitle>
        <CardDescription>
          {t("settings.language.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="language">{t("settings.language.appLanguage")}</Label>
          <select 
            id="language"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="nl">Nederlands</option>
            <option value="it">Italiano</option>
          </select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>{t("settings.saveLanguage")}</Button>
      </CardFooter>
    </Card>
  );
};

export default LanguageSettingsTab;
