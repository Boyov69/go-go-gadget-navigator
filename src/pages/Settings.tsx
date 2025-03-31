
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LanguageSelector from "@/components/LanguageSelector";
import SettingsTabs from "@/components/settings/SettingsTabs";
import { useLanguage } from "@/contexts/LanguageContext";

const SettingsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar}>
          <LanguageSelector />
        </Navbar>
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">{t("settings.title")}</h1>
            </div>
            
            <SettingsTabs />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
