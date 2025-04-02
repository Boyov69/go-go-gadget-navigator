import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettingsTab from './GeneralSettingsTab';
import ProfileSettingsTab from './ProfileSettingsTab';
import AppearanceSettingsTab from './AppearanceSettingsTab';
import NotificationsSettingsTab from './NotificationsSettingsTab';
import LanguageSettingsTab from './LanguageSettingsTab';
import LocationSettingsTab from './LocationSettingsTab';
import PaymentSettingsTab from './PaymentSettingsTab';
import PrivacySettingsTab from './PrivacySettingsTab';
import RecommendationPreferencesTab from './RecommendationPreferencesTab';

const SettingsTabs = () => {

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-4 mb-4 md:grid-cols-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="language">Language</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <GeneralSettingsTab />
      </TabsContent>
      
      <TabsContent value="profile">
        <ProfileSettingsTab />
      </TabsContent>
      
      <TabsContent value="appearance">
        <AppearanceSettingsTab />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsSettingsTab />
      </TabsContent>
      
      <TabsContent value="language">
        <LanguageSettingsTab />
      </TabsContent>
      
      <TabsContent value="location">
        <LocationSettingsTab />
      </TabsContent>
      
      <TabsContent value="payment">
        <PaymentSettingsTab />
      </TabsContent>

      <TabsContent value="recommendations">
        <RecommendationPreferencesTab />
      </TabsContent>
      
      <TabsContent value="privacy">
        <PrivacySettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
