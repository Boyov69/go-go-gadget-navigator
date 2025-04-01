
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield, MapPin, Moon, Globe, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import all tab components
import GeneralSettingsTab from "./GeneralSettingsTab";
import ProfileSettingsTab from "./ProfileSettingsTab";
import NotificationsSettingsTab from "./NotificationsSettingsTab";
import PrivacySettingsTab from "./PrivacySettingsTab";
import LocationSettingsTab from "./LocationSettingsTab";
import AppearanceSettingsTab from "./AppearanceSettingsTab";
import LanguageSettingsTab from "./LanguageSettingsTab";
import PaymentSettingsTab from "./PaymentSettingsTab";
import { ScrollArea } from "@/components/ui/scroll-area";

const SettingsTabs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="general">
      <div className="flex flex-col sm:flex-row gap-4">
        <ScrollArea className="h-full sm:max-h-[500px]">
          <TabsList className="h-full flex flex-row sm:flex-col justify-start mb-0 sm:mb-4 w-full sm:w-48 lg:w-56 p-1 sm:p-2">
            <TabsTrigger value="general" className="w-full justify-start gap-2 pl-2 lg:pl-3">
              <Settings className="h-4 w-4" />
              <span>{t("settings.general.title")}</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="w-full justify-start gap-2 pl-2 lg:pl-3">
              <User className="h-4 w-4" />
              <span>{t("settings.profile.title")}</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start gap-2 pl-2 lg:pl-3">
              <Bell className="h-4 w-4" />
              <span>{t("settings.notifications.title")}</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="w-full justify-start gap-2 pl-2 lg:pl-3">
              <Shield className="h-4 w-4" />
              <span>{t("settings.privacy.title")}</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="w-full justify-start gap-2 pl-2 lg:pl-3">
              <MapPin className="h-4 w-4" />
              <span>{t("settings.location.title")}</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="w-full justify-start gap-2 pl-2 lg:pl-3">
              <Moon className="h-4 w-4" />
              <span>{t("settings.appearance.title")}</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="w-full justify-start gap-2 pl-2 lg:pl-3">
              <Globe className="h-4 w-4" />
              <span>{t("settings.language.title")}</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="w-full justify-start gap-2 pl-2 lg:pl-3">
              <CreditCard className="h-4 w-4" />
              <span>{t("settings.payment.title")}</span>
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
        
        <div className="flex-1">
          <TabsContent value="general" className="mt-0">
            <GeneralSettingsTab />
          </TabsContent>
          
          <TabsContent value="profile" className="mt-0">
            <ProfileSettingsTab />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <NotificationsSettingsTab />
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0">
            <PrivacySettingsTab />
          </TabsContent>
          
          <TabsContent value="location" className="mt-0">
            <LocationSettingsTab />
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-0">
            <AppearanceSettingsTab />
          </TabsContent>
          
          <TabsContent value="language" className="mt-0">
            <LanguageSettingsTab />
          </TabsContent>
          
          <TabsContent value="payment" className="mt-0">
            <PaymentSettingsTab />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export default SettingsTabs;
