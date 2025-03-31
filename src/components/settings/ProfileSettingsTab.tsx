
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const ProfileSettingsTab: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+1 123 456 7890");

  const handleSaveSettings = () => {
    toast({
      title: t("settings.updateProfile"),
      description: "Your profile has been updated successfully",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("settings.profile.title")}</CardTitle>
        <CardDescription>
          {t("settings.profile.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("settings.profile.fullName")}</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("settings.profile.email")}</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("settings.profile.phone")}</Label>
          <Input 
            id="phone" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>{t("settings.updateProfile")}</Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSettingsTab;
