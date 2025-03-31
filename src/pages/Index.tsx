
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
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
  const [hiddenPageOpen, setHiddenPageOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleHiddenPage = () => {
    setHiddenPageOpen(!hiddenPageOpen);
  };

  return (
    <div className="flex min-h-screen bg-background relative">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="container px-4 py-6 mx-auto">
          <Button onClick={toggleHiddenPage} className="mb-4">
            {hiddenPageOpen ? "Close Hidden Page" : "Open Hidden Page"}
          </Button>

          {hiddenPageOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div className="absolute inset-10 bg-white rounded-lg shadow-2xl">
                <ScrollArea className="h-full w-full p-6">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-4">Hidden Scrollable Content</h2>
                    
                    {/* Example scrollable content */}
                    {[...Array(20)].map((_, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-gray-100 rounded-lg mb-4"
                      >
                        Hidden Content Section {index + 1}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Button 
                  onClick={toggleHiddenPage} 
                  variant="destructive" 
                  className="absolute top-4 right-4"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* New layout with map in the center as the largest component */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
            
            {/* Left column - 1 column width */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <PlanTripCard />
              <SavedAddresses />
              <RecentTrips />
            </div>
            
            {/* Center column with map - 3 columns width */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="h-[700px]">
                <MapSection />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmergencyButton />
                <QuickTools />
              </div>
            </div>
            
            {/* Right column - 1 column width */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <RideBooking />
              <PopularDestinations />
              <BelgianTaxiServices />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
