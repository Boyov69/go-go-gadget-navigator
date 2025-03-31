
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import GoogleMap from "@/components/GoogleMap";
import PlanTripCard from "@/components/PlanTripCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation2, Search, Compass, LocateFixed, History } from "lucide-react";

const NavigatePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Example recent destinations
  const recentDestinations = [
    { title: "Home", address: "123 Home St, City" },
    { title: "Work", address: "456 Office Blvd, Business District" },
    { title: "Gym", address: "789 Fitness Ave, Health Zone" }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Navigation controls */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation2 className="h-5 w-5 text-primary" />
                    Navigate
                  </CardTitle>
                  <CardDescription>Enter your destination to start navigating</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search destination..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Button className="w-full gap-2">
                    <LocateFixed className="h-4 w-4" />
                    Use Current Location
                  </Button>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Recent Destinations
                    </h4>
                    <div className="space-y-2">
                      {recentDestinations.map((dest, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start text-left"
                        >
                          <MapPin className="h-4 w-4 mr-2 shrink-0" />
                          <div className="truncate">
                            <div className="font-medium">{dest.title}</div>
                            <div className="text-xs text-muted-foreground">{dest.address}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <PlanTripCard />
            </div>
            
            {/* Right column - Map */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Compass className="h-5 w-5 text-primary" />
                    Navigation Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <GoogleMap
                    height="600px"
                    center={{ lat: 51.505, lng: -0.09 }}
                    zoom={13}
                    showControls={true}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NavigatePage;
