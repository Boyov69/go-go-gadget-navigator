
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MapSection from "@/components/MapSection";
import PopularDestinations from "@/components/PopularDestinations";
import RecentTrips from "@/components/RecentTrips";
import QuickTools from "@/components/QuickTools";
import PlanTripCard from "@/components/PlanTripCard";

const Index: React.FC = () => {
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content - 2 columns wide */}
            <div className="lg:col-span-2 space-y-6">
              <MapSection />
              <QuickTools />
              <PopularDestinations />
            </div>
            
            {/* Side panel - 1 column wide */}
            <div className="space-y-6">
              <PlanTripCard />
              <RecentTrips />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
