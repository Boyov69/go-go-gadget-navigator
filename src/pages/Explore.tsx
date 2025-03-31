
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleMap from "@/components/GoogleMap";
import PopularDestinations from "@/components/PopularDestinations";
import { Search, MapPin, Car, Bus, Train, Plane } from "lucide-react";

const ExplorePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Sample locations for the map - Belgian cities
  const popularLocations = [
    { position: { lat: 50.8503, lng: 4.3517 }, title: "Brussels" },
    { position: { lat: 51.2194, lng: 4.4025 }, title: "Antwerp" },
    { position: { lat: 51.0543, lng: 3.7174 }, title: "Ghent" },
    { position: { lat: 50.6326, lng: 5.5797 }, title: "Liège" },
    { position: { lat: 51.3097, lng: 3.2340 }, title: "Bruges" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Search and filters */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Explore</CardTitle>
                  <CardDescription>Discover places and attractions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search places..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Transportation</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <Car className="h-3.5 w-3.5" /> Car
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Bus className="h-3.5 w-3.5" /> Bus
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Train className="h-3.5 w-3.5" /> Train
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Plane className="h-3.5 w-3.5" /> Plane
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Nearby Places</h4>
                    {popularLocations.map((location, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left mb-1"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{location.title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Map */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle>Discover Belgium</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <GoogleMap
                    height="600px"
                    markers={popularLocations}
                    center={{ lat: 50.8503, lng: 4.3517 }}
                    zoom={8}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <PopularDestinations />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExplorePage;
