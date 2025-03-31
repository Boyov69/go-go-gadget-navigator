
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Search, Clock, Route, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import GoogleMap from "@/components/GoogleMap";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Favorite {
  id: string;
  name: string;
  type: "place" | "route" | "provider";
  address?: string;
  coordinates: { lat: number; lng: number };
  rating?: number;
  lastVisited?: string;
}

const FavoritesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);
  const { toast } = useToast();

  // Sample favorites data
  const favorites: Favorite[] = [
    {
      id: "1",
      name: "Home",
      type: "place",
      address: "123 Home Street, Hometown",
      coordinates: { lat: 51.505, lng: -0.09 },
      lastVisited: "Today"
    },
    {
      id: "2",
      name: "Work",
      type: "place",
      address: "456 Office Boulevard, Business District",
      coordinates: { lat: 51.51, lng: -0.12 },
      lastVisited: "Yesterday"
    },
    {
      id: "3",
      name: "Favorite Restaurant",
      type: "place",
      address: "789 Food Avenue, Culinary Quarter",
      coordinates: { lat: 51.515, lng: -0.11 },
      rating: 4.8,
      lastVisited: "Last week"
    },
    {
      id: "4",
      name: "Home to Work",
      type: "route",
      coordinates: { lat: 51.508, lng: -0.105 }
    },
    {
      id: "5",
      name: "Premium Cabs",
      type: "provider",
      address: "321 Transport Lane, Service District",
      coordinates: { lat: 51.498, lng: -0.13 },
      rating: 4.5
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter favorites based on search query and type
  const filterFavorites = (type?: string) => {
    return favorites.filter(fav => 
      (type ? fav.type === type : true) &&
      fav.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleRemoveFavorite = (id: string) => {
    // In a real app, this would update the database
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites",
      duration: 3000,
    });
  };

  const handleSelectFavorite = (favorite: Favorite) => {
    setSelectedFavorite(favorite);
    toast({
      title: "Selected favorite",
      description: `You selected ${favorite.name}`,
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
                <Heart className="h-6 w-6 mr-2 text-primary" />
                Favorites
              </h1>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search your favorites..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left column - Favorites list */}
              <div className="lg:col-span-4">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>Your Favorites</CardTitle>
                    <CardDescription>
                      {favorites.length} saved items
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList className="mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="place">Places</TabsTrigger>
                        <TabsTrigger value="route">Routes</TabsTrigger>
                        <TabsTrigger value="provider">Providers</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all" className="mt-0 space-y-3">
                        {filterFavorites().length > 0 ? (
                          filterFavorites().map(favorite => (
                            <div 
                              key={favorite.id}
                              className={`p-3 rounded-md border cursor-pointer transition-colors ${
                                selectedFavorite?.id === favorite.id
                                  ? "bg-primary/10 border-primary/50"
                                  : "hover:bg-accent"
                              }`}
                              onClick={() => handleSelectFavorite(favorite)}
                            >
                              <div className="flex justify-between">
                                <h3 className="font-medium">{favorite.name}</h3>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-7 w-7 rounded-full hover:bg-destructive/10 hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFavorite(favorite.id);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center mt-1">
                                {favorite.type === "place" && <MapPin className="h-3 w-3 mr-1" />}
                                {favorite.type === "route" && <Route className="h-3 w-3 mr-1" />}
                                {favorite.type === "provider" && <Star className="h-3 w-3 mr-1" />}
                                <span>
                                  {favorite.type === "place" ? "Place" : 
                                   favorite.type === "route" ? "Route" : "Provider"}
                                </span>
                                
                                {favorite.rating && (
                                  <div className="ml-2 flex items-center">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-0.5" />
                                    {favorite.rating}
                                  </div>
                                )}
                              </div>
                              {favorite.lastVisited && (
                                <div className="text-xs text-muted-foreground flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Visited: {favorite.lastVisited}
                                </div>
                              )}
                              {favorite.address && (
                                <div className="text-xs text-muted-foreground mt-1 truncate">
                                  {favorite.address}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            No favorites matching your search
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="place" className="mt-0 space-y-3">
                        {filterFavorites("place").length > 0 ? (
                          filterFavorites("place").map(favorite => (
                            <div 
                              key={favorite.id}
                              className="p-3 rounded-md border cursor-pointer hover:bg-accent"
                              onClick={() => handleSelectFavorite(favorite)}
                            >
                              <h3 className="font-medium">{favorite.name}</h3>
                              {favorite.address && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {favorite.address}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            No favorite places yet
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="route" className="mt-0 space-y-3">
                        {filterFavorites("route").length > 0 ? (
                          filterFavorites("route").map(favorite => (
                            <div 
                              key={favorite.id}
                              className="p-3 rounded-md border cursor-pointer hover:bg-accent"
                              onClick={() => handleSelectFavorite(favorite)}
                            >
                              <h3 className="font-medium flex items-center">
                                <Route className="h-4 w-4 mr-1" />
                                {favorite.name}
                              </h3>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            No favorite routes yet
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="provider" className="mt-0 space-y-3">
                        {filterFavorites("provider").length > 0 ? (
                          filterFavorites("provider").map(favorite => (
                            <div 
                              key={favorite.id}
                              className="p-3 rounded-md border cursor-pointer hover:bg-accent"
                              onClick={() => handleSelectFavorite(favorite)}
                            >
                              <h3 className="font-medium">{favorite.name}</h3>
                              {favorite.rating && (
                                <div className="text-xs flex items-center mt-1">
                                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-0.5" />
                                  {favorite.rating}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            No favorite providers yet
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column - Details and map */}
              <div className="lg:col-span-8">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>
                      {selectedFavorite ? selectedFavorite.name : "Favorite Details"}
                    </CardTitle>
                    {selectedFavorite?.address && (
                      <CardDescription>
                        {selectedFavorite.address}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {selectedFavorite ? (
                      <div className="space-y-4">
                        <GoogleMap 
                          height="300px"
                          center={selectedFavorite.coordinates}
                          zoom={14}
                          markers={[
                            { position: selectedFavorite.coordinates, title: selectedFavorite.name }
                          ]}
                        />
                        
                        <div className="mt-4">
                          {selectedFavorite.type === "place" && (
                            <div className="space-y-3">
                              <h4 className="font-medium">About this place</h4>
                              <p className="text-sm text-muted-foreground">
                                This location is saved in your favorites.
                                {selectedFavorite.lastVisited && ` Last visited ${selectedFavorite.lastVisited}.`}
                              </p>
                              
                              <div className="flex gap-2 mt-4">
                                <Button>Navigate Here</Button>
                                <Button variant="outline">Share Location</Button>
                              </div>
                            </div>
                          )}
                          
                          {selectedFavorite.type === "route" && (
                            <div className="space-y-3">
                              <h4 className="font-medium">Saved Route</h4>
                              <p className="text-sm text-muted-foreground">
                                This is a saved route in your favorites.
                              </p>
                              
                              <div className="flex gap-2 mt-4">
                                <Button>Start Navigation</Button>
                                <Button variant="outline">View Details</Button>
                              </div>
                            </div>
                          )}
                          
                          {selectedFavorite.type === "provider" && (
                            <div className="space-y-3">
                              <h4 className="font-medium">Service Provider</h4>
                              {selectedFavorite.rating && (
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                                  <span>{selectedFavorite.rating} rating</span>
                                </div>
                              )}
                              <p className="text-sm text-muted-foreground">
                                This service provider is saved in your favorites.
                              </p>
                              
                              <div className="flex gap-2 mt-4">
                                <Button>Book Service</Button>
                                <Button variant="outline">Contact</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Heart className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
                        <h3 className="text-lg font-medium mb-1">No Favorite Selected</h3>
                        <p className="text-muted-foreground">
                          Select an item from your favorites to view details
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {selectedFavorite && (
                    <CardFooter className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleRemoveFavorite(selectedFavorite.id)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Remove from Favorites
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FavoritesPage;
