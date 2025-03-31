import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import GoogleMap from "@/components/GoogleMap";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Map, Coffee, Utensils, Hotel, LocalTaxi, ShoppingBag, Landmark } from "lucide-react";

const ExplorePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample places of interest
  const placesOfInterest = [
    { position: { lat: 51.51, lng: -0.11 }, title: "Coffee Shop", icon: Coffee },
    { position: { lat: 51.505, lng: -0.09 }, title: "Restaurant", icon: Utensils },
    { position: { lat: 51.515, lng: -0.08 }, title: "Hotel", icon: Hotel },
    { position: { lat: 51.49, lng: -0.12 }, title: "Taxi Stand", icon: LocalTaxi },
    { position: { lat: 51.51, lng: -0.13 }, title: "Shopping Mall", icon: ShoppingBag },
    { position: { lat: 51.52, lng: -0.1 }, title: "Tourist Attraction", icon: Landmark },
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
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  Explore Your Surroundings
                </CardTitle>
                <CardDescription>
                  Discover interesting places and attractions nearby
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for places, attractions, restaurants..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="food">Food & Drink</TabsTrigger>
                    <TabsTrigger value="attractions">Attractions</TabsTrigger>
                    <TabsTrigger value="hotels">Hotels</TabsTrigger>
                    <TabsTrigger value="transport">Transport</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0">
                    <GoogleMap 
                      height="500px"
                      center={{ lat: 51.505, lng: -0.09 }}
                      markers={placesOfInterest.map(place => ({
                        position: place.position,
                        title: place.title
                      }))}
                      zoom={13}
                      mapStyle="retro"
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                      {placesOfInterest.map((place, index) => (
                        <Card key={index}>
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <place.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{place.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {(Math.random() * 5).toFixed(1)} km away
                              </p>
                            </div>
                            <Button size="sm" className="ml-auto">View</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Other tab contents would be similar but with filtered data */}
                  <TabsContent value="food" className="mt-0">
                    <div className="p-8 text-center text-muted-foreground">
                      <Utensils className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>Explore restaurants and cafes nearby</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="attractions" className="mt-0">
                    <div className="p-8 text-center text-muted-foreground">
                      <Landmark className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>Discover tourist attractions in this area</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hotels" className="mt-0">
                    <div className="p-8 text-center text-muted-foreground">
                      <Hotel className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>Find accommodations nearby</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transport" className="mt-0">
                    <div className="p-8 text-center text-muted-foreground">
                      <LocalTaxi className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>Locate transportation options</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExplorePage;
