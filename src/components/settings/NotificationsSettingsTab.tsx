
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const NotificationsSettingsTab: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: t("settings.savePreferences"),
      description: "Your notification preferences have been updated",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("settings.notifications.title")}</CardTitle>
        <CardDescription>
          {t("settings.notifications.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="emailNotifications" 
            checked={emailNotifications} 
            onCheckedChange={setEmailNotifications}
          />
          <Label htmlFor="emailNotifications">{t("settings.notifications.email")}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="pushNotifications" 
            checked={pushNotifications} 
            onCheckedChange={setPushNotifications}
          />
          <Label htmlFor="pushNotifications">{t("settings.notifications.push")}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="marketingEmails" 
            checked={marketingEmails} 
            onCheckedChange={setMarketingEmails}
          />
          <Label htmlFor="marketingEmails">{t("settings.notifications.marketing")}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>{t("settings.savePreferences")}</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsSettingsTab;
