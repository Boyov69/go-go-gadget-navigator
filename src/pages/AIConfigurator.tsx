
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AdminGuard from "@/components/guards/AdminGuard";
import { UserRole } from "@/services/auth";
import AIConfiguratorContent from "@/components/ai-configurator/AIConfiguratorContent";
import { AIConfigProvider } from "@/contexts/AIConfigContext";

const AIConfigurator: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AIConfigProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} />
          <AIConfiguratorContent sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </AIConfigProvider>
  );
};

const AIConfiguratorPage: React.FC = () => (
  <AdminGuard requiredRole={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
    <AIConfigurator />
  </AdminGuard>
);

export default AIConfiguratorPage;
