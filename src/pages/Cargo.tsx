
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";
import CargoCalculator from "@/components/CargoCalculator";
import CargoServiceTypes from "@/components/CargoServiceTypes";
import CargoRequestForm from "@/components/CargoRequestForm";
import LiveDriverTracking from "@/components/LiveDriverTracking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Cargo: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="container px-4 py-6 md:py-8 mx-auto animate-fade-in">
          <h1 className="text-2xl font-bold mb-6">Light Cargo Transportation</h1>
          
          <Tabs defaultValue="request">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="request" className="flex-1">Request Delivery</TabsTrigger>
              <TabsTrigger value="tracking" className="flex-1">Live Tracking</TabsTrigger>
            </TabsList>
            
            <TabsContent value="request">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content - 2 columns wide */}
                <div className="lg:col-span-2 space-y-6">
                  <CargoCalculator />
                  <CargoRequestForm />
                </div>
                
                {/* Side panel - 1 column wide */}
                <div className="space-y-6">
                  <CargoServiceTypes />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tracking">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content - 2 columns wide */}
                <div className="lg:col-span-2 space-y-6">
                  <LiveDriverTracking />
                </div>
                
                {/* Side panel - 1 column wide */}
                <div className="space-y-6">
                  <CargoServiceTypes />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Cargo;
