
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, MapPin, Building, Phone, Star, Navigation } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  type: "taxi" | "bus" | "train";
  rating: number;
  distance: number;
  address: string;
  phone: string;
  available: boolean;
}

const ProviderSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  // Mock data for providers
  const mockProviders: Provider[] = [
    {
      id: "1",
      name: "City Taxi Brussels",
      type: "taxi",
      rating: 4.7,
      distance: 0.8,
      address: "Avenue Louise 143, Brussels",
      phone: "+32 2 123 4567",
      available: true
    },
    {
      id: "2",
      name: "Brussels Public Transit",
      type: "bus",
      rating: 4.1,
      distance: 1.2,
      address: "Rue de la Loi 56, Brussels",
      phone: "+32 2 765 4321",
      available: true
    },
    {
      id: "3",
      name: "Belgian Railways",
      type: "train",
      rating: 3.9,
      distance: 2.5,
      address: "Central Station, Brussels",
      phone: "+32 2 528 2828",
      available: true
    },
    {
      id: "4",
      name: "Antwerp Express Taxi",
      type: "taxi",
      rating: 4.5,
      distance: 0.5,
      address: "Meir 12, Antwerp",
      phone: "+32 3 123 4567",
      available: false
    },
    {
      id: "5",
      name: "Liège Tram Company",
      type: "bus",
      rating: 4.0,
      distance: 1.8,
      address: "Place Saint-Lambert, Liège",
      phone: "+32 4 876 5432",
      available: true
    }
  ];

  const getUserLocation = () => {
    setLoading(true);
    toast({
      title: "Finding your location",
      description: "Please wait while we locate you...",
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setProviders(mockProviders);
          setLoading(false);
          toast({
            title: "Location found!",
            description: "Showing nearby transportation providers.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          toast({
            title: "Location error",
            description: "Couldn't determine your location. Using default data.",
            variant: "destructive",
          });
          // Use mock data anyway as fallback
          setProviders(mockProviders);
        }
      );
    } else {
      setLoading(false);
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Using default data.",
        variant: "destructive",
      });
      // Use mock data anyway as fallback
      setProviders(mockProviders);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLocation) {
      getUserLocation();
    } else {
      // Filter providers based on search query
      const filtered = mockProviders.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProviders(filtered);

      toast({
        title: "Search results",
        description: `Found ${filtered.length} transportation providers`,
      });
    }
  };

  const filteredProviders = activeTab === "all" 
    ? providers 
    : providers.filter(provider => provider.type === activeTab);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Search className="h-5 w-5" />
          Find Local Transportation Providers
        </CardTitle>
        <CardDescription>
          Search for taxi services, public transport, and other transportation options nearby
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or address..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={getUserLocation} 
            disabled={loading}
            title="Use my current location"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </form>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="taxi">Taxi</TabsTrigger>
            <TabsTrigger value="bus">Bus & Tram</TabsTrigger>
            <TabsTrigger value="train">Train</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredProviders.length > 0 ? (
              <div className="space-y-4">
                {filteredProviders.map((provider) => (
                  <div 
                    key={provider.id}
                    className="flex flex-col md:flex-row items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            {provider.name}
                            {provider.available ? (
                              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Available</Badge>
                            ) : (
                              <Badge variant="outline" className="ml-2">Closed</Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {provider.address}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Phone className="h-3.5 w-3.5" />
                            {provider.phone}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium ml-1">{provider.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {provider.distance} km away
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button className="flex items-center gap-2 w-full md:w-auto" size="sm">
                        <Phone className="h-4 w-4" />
                        <span className="hidden md:inline">Call</span>
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto" size="sm">
                        <Navigation className="h-4 w-4" />
                        <span className="hidden md:inline">Directions</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Building className="h-10 w-10 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No providers found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try using your current location or adjust your search criteria
                </p>
                <Button onClick={getUserLocation} className="mt-4">
                  Use My Location
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProviderSearch;
