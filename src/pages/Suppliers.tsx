
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SupplierRegistration from "@/components/SupplierRegistration";
import SupplierDashboard from "@/components/SupplierDashboard";
import ProviderSearch from "@/components/ProviderSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Suppliers: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="container px-4 py-6 md:py-8 mx-auto animate-fade-in pb-20 md:pb-6">
          <h1 className="text-2xl font-bold mb-6">Transportation Service Providers</h1>
          
          <Tabs defaultValue="search" className="w-full mb-6">
            <TabsList>
              <TabsTrigger value="search">Find Providers</TabsTrigger>
              <TabsTrigger value="register">Register as Provider</TabsTrigger>
            </TabsList>
            <TabsContent value="search" className="mt-6">
              <ProviderSearch />
            </TabsContent>
            <TabsContent value="register" className="mt-6">
              {isRegistered ? (
                <SupplierDashboard />
              ) : (
                <SupplierRegistration onRegistered={() => setIsRegistered(true)} />
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Suppliers;
