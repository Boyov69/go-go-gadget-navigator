
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PlanTripCard from "@/components/PlanTripCard";
import RideBooking from "@/components/RideBooking";
import MapSection from "@/components/MapSection";
import QuickTools from "@/components/QuickTools";
import RecentTrips from "@/components/RecentTrips";
import PopularDestinations from "@/components/PopularDestinations";
import EmergencyButton from "@/components/EmergencyButton";
import SavedAddresses from "@/components/SavedAddresses";
import BelgianTaxiServices from "@/components/BelgianTaxiServices";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="container px-4 py-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            
            {/* First column */}
            <div className="flex flex-col gap-6">
              <PlanTripCard />
              <SavedAddresses />
              <RecentTrips />
            </div>
            
            {/* Second column */}
            <div className="flex flex-col gap-6">
              <RideBooking />
              <EmergencyButton />
              <BelgianTaxiServices />
            </div>
            
            {/* Third column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <MapSection />
              <QuickTools />
              <PopularDestinations />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
