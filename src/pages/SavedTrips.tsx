
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookMarked, Search, MapPin, Calendar, Clock, MoreHorizontal, Star, StarOff } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";
import { useToast } from "@/hooks/use-toast";

interface Trip {
  id: string;
  name: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  distance: string;
  favorite: boolean;
}

const SavedTripsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample saved trips data
  const savedTrips: Trip[] = [
    {
      id: "1",
      name: "Work Commute",
      origin: "123 Home St, City",
      destination: "456 Office Blvd, Business District",
      date: "Daily",
      time: "08:00 AM",
      distance: "12 km",
      favorite: true
    },
    {
      id: "2",
      name: "Gym Visit",
      origin: "123 Home St, City",
      destination: "789 Fitness Ave, Health Zone",
      date: "Mon, Wed, Fri",
      time: "06:00 PM",
      distance: "5 km",
      favorite: false
    },
    {
      id: "3",
      name: "Weekend Trip",
      origin: "123 Home St, City",
      destination: "101 Beach Rd, Vacation Bay",
      date: "Weekends",
      time: "09:30 AM",
      distance: "45 km",
      favorite: true
    }
  ];

  // Filter trips based on search
  const filteredTrips = savedTrips.filter(trip => 
    trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    toast({
      title: "Trip Selected",
      description: `You selected "${trip.name}" trip`,
      duration: 2000,
    });
  };

  const toggleFavorite = (trip: Trip) => {
    // In a real app, this would update the database
    trip.favorite = !trip.favorite;
    toast({
      title: trip.favorite ? "Added to Favorites" : "Removed from Favorites",
      description: `"${trip.name}" ${trip.favorite ? "added to" : "removed from"} favorites`,
      duration: 2000,
    });
  };

  const deleteTrip = (trip: Trip) => {
    // In a real app, this would remove from the database
    toast({
      title: "Trip Deleted",
      description: `"${trip.name}" has been deleted`,
      duration: 2000,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <BookMarked className="h-6 w-6 mr-2 text-primary" />
                Saved Trips
              </h1>
              <Button>New Trip</Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search your saved trips..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left column - Trip list */}
              <div className="lg:col-span-4">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>Your Trips</CardTitle>
                    <CardDescription>
                      {filteredTrips.length} saved trips
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList className="mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites</TabsTrigger>
                        <TabsTrigger value="recent">Recent</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all" className="mt-0">
                        <div className="space-y-2">
                          {filteredTrips.length > 0 ? (
                            filteredTrips.map((trip) => (
                              <div
                                key={trip.id}
                                className={`p-3 rounded-md cursor-pointer border transition-colors ${
                                  selectedTrip?.id === trip.id
                                    ? "bg-primary/10 border-primary/50"
                                    : "hover:bg-accent"
                                }`}
                                onClick={() => handleSelectTrip(trip)}
                              >
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium flex items-center">
                                    {trip.name}
                                    {trip.favorite && (
                                      <Star className="h-3.5 w-3.5 ml-1 text-amber-500 fill-amber-500" />
                                    )}
                                  </h3>
                                  <div className="flex items-center">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-7 w-7"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(trip);
                                      }}
                                    >
                                      {trip.favorite ? (
                                        <StarOff className="h-4 w-4" />
                                      ) : (
                                        <Star className="h-4 w-4" />
                                      )}
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-7 w-7"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteTrip(trip);
                                      }}
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center mt-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  <span className="truncate">{trip.destination}</span>
                                </div>
                                <div className="text-xs text-muted-foreground flex mt-2">
                                  <div className="flex items-center mr-3">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {trip.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {trip.time}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              No trips matching your search
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="favorites" className="mt-0">
                        <div className="space-y-2">
                          {filteredTrips.filter(t => t.favorite).length > 0 ? (
                            filteredTrips
                              .filter(trip => trip.favorite)
                              .map((trip) => (
                                <div
                                  key={trip.id}
                                  className="p-3 rounded-md cursor-pointer border hover:bg-accent"
                                  onClick={() => handleSelectTrip(trip)}
                                >
                                  <h3 className="font-medium flex items-center">
                                    {trip.name}
                                    <Star className="h-3.5 w-3.5 ml-1 text-amber-500 fill-amber-500" />
                                  </h3>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {trip.destination}
                                  </div>
                                </div>
                              ))
                          ) : (
                            <div className="text-center py-8 text-muted-foreground">
                              No favorite trips yet
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="recent" className="mt-0">
                        <div className="text-center py-8 text-muted-foreground">
                          Your recent trips will appear here
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column - Trip details */}
              <div className="lg:col-span-8">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>
                      {selectedTrip ? selectedTrip.name : "Trip Details"}
                    </CardTitle>
                    {selectedTrip && (
                      <CardDescription>
                        {selectedTrip.origin} to {selectedTrip.destination}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {selectedTrip ? (
                      <div className="space-y-4">
                        <GoogleMap 
                          height="300px"
                          center={{ lat: 51.505, lng: -0.09 }}
                          zoom={12}
                          markers={[
                            { position: { lat: 51.49, lng: -0.12 }, title: selectedTrip.origin },
                            { position: { lat: 51.52, lng: -0.07 }, title: selectedTrip.destination }
                          ]}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <Card>
                            <CardHeader className="pb-2 pt-4">
                              <CardTitle className="text-base">Trip Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Distance:</span>
                                <span className="font-medium">{selectedTrip.distance}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Schedule:</span>
                                <span className="font-medium">{selectedTrip.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Time:</span>
                                <span className="font-medium">{selectedTrip.time}</span>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2 pt-4">
                              <CardTitle className="text-base">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <Button className="w-full mb-2">Start Navigation</Button>
                              <Button variant="outline" className="w-full">
                                Edit Trip
                              </Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <BookMarked className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
                        <h3 className="text-lg font-medium mb-1">No Trip Selected</h3>
                        <p className="text-muted-foreground">
                          Select a trip from the list to view details
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedTripsPage;
