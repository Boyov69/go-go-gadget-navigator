
import React, { useEffect, useRef } from 'react';
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
  const tabsRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for tabs
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    const tabElements = tabsRef.current?.querySelectorAll('[role="tab"]');
    if (!tabElements) return;
    
    const tabCount = tabElements.length;
    
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (index + 1) % tabCount;
        (tabElements[nextIndex] as HTMLElement).focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (index - 1 + tabCount) % tabCount;
        (tabElements[prevIndex] as HTMLElement).focus();
        break;
      default:
        break;
    }
  };

  return (
    <Tabs defaultValue="general" className="w-full" ref={tabsRef}>
      <TabsList 
        className="grid grid-cols-4 mb-4 md:grid-cols-8"
        aria-label="Settings categories"
      >
        {[
          { id: "general", label: "General" },
          { id: "profile", label: "Profile" },
          { id: "appearance", label: "Appearance" },
          { id: "notifications", label: "Notifications" },
          { id: "language", label: "Language" },
          { id: "location", label: "Location" },
          { id: "payment", label: "Payment" },
          { id: "recommendations", label: "Recommendations" },
          { id: "privacy", label: "Privacy" }
        ].map((tab, index) => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-controls={`${tab.id}-tab`}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="general" id="general-tab" role="tabpanel" tabIndex={0}>
        <GeneralSettingsTab />
      </TabsContent>
      
      <TabsContent value="profile" id="profile-tab" role="tabpanel" tabIndex={0}>
        <ProfileSettingsTab />
      </TabsContent>
      
      <TabsContent value="appearance" id="appearance-tab" role="tabpanel" tabIndex={0}>
        <AppearanceSettingsTab />
      </TabsContent>
      
      <TabsContent value="notifications" id="notifications-tab" role="tabpanel" tabIndex={0}>
        <NotificationsSettingsTab />
      </TabsContent>
      
      <TabsContent value="language" id="language-tab" role="tabpanel" tabIndex={0}>
        <LanguageSettingsTab />
      </TabsContent>
      
      <TabsContent value="location" id="location-tab" role="tabpanel" tabIndex={0}>
        <LocationSettingsTab />
      </TabsContent>
      
      <TabsContent value="payment" id="payment-tab" role="tabpanel" tabIndex={0}>
        <PaymentSettingsTab />
      </TabsContent>

      <TabsContent value="recommendations" id="recommendations-tab" role="tabpanel" tabIndex={0}>
        <RecommendationPreferencesTab />
      </TabsContent>
      
      <TabsContent value="privacy" id="privacy-tab" role="tabpanel" tabIndex={0}>
        <PrivacySettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
