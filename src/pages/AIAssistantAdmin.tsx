
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import AdminGuard from "@/components/guards/AdminGuard";
import { UserRole } from "@/services/auth";
import AIAssistantMonitoring from "@/components/admin/AIAssistantMonitoring";

const AIAssistantAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6">
          <AIAssistantMonitoring />
        </main>
      </div>
    </div>
  );
};

const AIAssistantAdminPage: React.FC = () => (
  <AdminGuard requiredRole={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
    <AIAssistantAdmin />
  </AdminGuard>
);

export default AIAssistantAdminPage;
