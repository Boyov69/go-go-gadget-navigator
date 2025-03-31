
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PopularDestinations from "@/components/PopularDestinations";
import RecentTrips from "@/components/RecentTrips";
import QuickTools from "@/components/QuickTools";
import PlanTripCard from "@/components/PlanTripCard";
import RideBooking from "@/components/RideBooking";
import SavedAddresses from "@/components/SavedAddresses";
import RideHistory from "@/components/RideHistory";
import EmergencyButton from "@/components/EmergencyButton";
import GoogleMap from "@/components/GoogleMap";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Index: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Sample locations for the map
  const popularLocations = [
    { position: { lat: 51.50, lng: -0.09 }, title: "City Center" },
    { position: { lat: 51.51, lng: -0.08 }, title: "Business District" },
    { position: { lat: 51.49, lng: -0.10 }, title: "Shopping Mall" },
  ];
  
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
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Explore Nearby</CardTitle>
                </CardHeader>
                <GoogleMap 
                  markers={popularLocations}
                  height="400px"
                  center={{ lat: 51.505, lng: -0.09 }}
                  zoom={13}
                />
              </Card>
              <QuickTools />
              <RideBooking />
              <PopularDestinations />
              <SavedAddresses />
            </div>
            
            {/* Side panel - 1 column wide */}
            <div className="space-y-6">
              <PlanTripCard />
              <RideHistory />
              <RecentTrips />
            </div>
          </div>
        </main>
        
        <EmergencyButton />
      </div>
    </div>
  );
};

export default Index;
