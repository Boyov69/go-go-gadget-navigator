import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CargoCalculator from "@/components/CargoCalculator";
import CargoServiceTypes from "@/components/CargoServiceTypes";
import CargoRequestForm from "@/components/CargoRequestForm";
import LiveDriverTracking from "@/components/LiveDriverTracking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoogleMap from "@/components/GoogleMap";

interface Marker {
  position: { lat: number; lng: number };
  title: string;
}

const Cargo: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPickupLocation, setSelectedPickupLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Create markers array for the map
  const markers: Marker[] = [
    ...(selectedPickupLocation ? [{ 
      position: selectedPickupLocation,
      title: "Pickup Location"
    }] : []),
    ...(selectedDeliveryLocation ? [{ 
      position: selectedDeliveryLocation,
      title: "Delivery Location"
    }] : [])
  ];

  // Handle map click to set locations
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      if (!selectedPickupLocation) {
        setSelectedPickupLocation({ 
          lat: e.latLng.lat(), 
          lng: e.latLng.lng() 
        });
      } else if (!selectedDeliveryLocation) {
        setSelectedDeliveryLocation({ 
          lat: e.latLng.lat(), 
          lng: e.latLng.lng() 
        });
      }
    }
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
                  <GoogleMap 
                    height="350px"
                    markers={markers}
                    onClick={handleMapClick}
                    center={{ lat: 51.505, lng: -0.09 }}
                  />
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
