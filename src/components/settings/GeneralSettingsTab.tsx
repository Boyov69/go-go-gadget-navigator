
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const GeneralSettingsTab: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [distanceUnit, setDistanceUnit] = useState("km");

  const handleSaveSettings = () => {
    toast({
      title: t("settings.saveChanges"),
      description: "Your settings have been updated successfully",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("settings.general.title")}</CardTitle>
        <CardDescription>
          {t("settings.general.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="distanceUnit">{t("settings.general.distanceUnit")}</Label>
          <select 
            id="distanceUnit"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
          >
            <option value="km">{t("settings.general.kilometers")}</option>
            <option value="mi">{t("settings.general.miles")}</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="autoSave" 
            checked={true} 
            onCheckedChange={() => {}}
          />
          <Label htmlFor="autoSave">{t("settings.general.autoSave")}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="offlineMode" 
            checked={false} 
            onCheckedChange={() => {}}
          />
          <Label htmlFor="offlineMode">{t("settings.general.offline")}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>{t("settings.saveChanges")}</Button>
      </CardFooter>
    </Card>
  );
};

export default GeneralSettingsTab;
