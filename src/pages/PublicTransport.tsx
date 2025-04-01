
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PublicTransportTabs from "@/components/public-transport/PublicTransportTabs";
import { useLanguage } from "@/contexts/LanguageContext";

const PublicTransportPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{t("publicTransport.title")}</h1>
            <p className="text-muted-foreground">{t("publicTransport.subtitle")}</p>
          </div>
          
          <PublicTransportTabs />
        </main>
      </div>
    </div>
  );
};

export default PublicTransportPage;
