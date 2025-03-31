
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Bus, CarTaxiFront, Navigation, Compass } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Define types for transportation providers
interface TransportProvider {
  id: string;
  name: string;
  type: 'taxi' | 'bus' | 'train' | 'tram' | 'metro';
  distance: number;  // in kilometers
  rating: number;
  contact?: string;
  fare?: string;
  nextArrival?: string;
  logo?: string;
}

const LocalTransportInfo: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [providers, setProviders] = useState<TransportProvider[]>([]);

  // Get user's current location
  const getCurrentLocation = () => {
    setLoading(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        
        // In a real app, fetch providers from an API based on location
        fetchNearbyProviders(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        toast({
          title: "Location Error",
          description: getGeolocationErrorMessage(error),
          variant: "destructive",
        });
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  // Helper function to get readable geolocation error messages
  const getGeolocationErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Location permission denied. Please enable location services.";
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable.";
      case error.TIMEOUT:
        return "The request to get location timed out.";
      default:
        return "An unknown error occurred.";
    }
  };

  // Mock API call to fetch nearby transport providers
  const fetchNearbyProviders = (lat: number, lng: number) => {
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data - in a real app this would come from an API
      const mockProviders: TransportProvider[] = [
        {
          id: "taxi1",
          name: "Taxis Verts",
          type: "taxi",
          distance: 1.2,
          rating: 4.5,
          contact: "+32 2 349 49 49",
          fare: "€2.40 base + €1.80/km"
        },
        {
          id: "taxi2",
          name: "Taxi Bleus",
          type: "taxi",
          distance: 2.1,
          rating: 4.2,
          contact: "+32 2 268 00 00",
          fare: "€2.60 base + €1.90/km"
        },
        {
          id: "bus1",
          name: "STIB/MIVB Line 71",
          type: "bus",
          distance: 0.3,
          rating: 4.0,
          nextArrival: "5 min"
        },
        {
          id: "metro1",
          name: "Metro Line 1",
          type: "metro",
          distance: 0.8,
          rating: 4.7,
          nextArrival: "3 min"
        },
        {
          id: "tram1",
          name: "Tram Line 3",
          type: "tram",
          distance: 0.5,
          rating: 4.1,
          nextArrival: "7 min"
        }
      ];

      setProviders(mockProviders);
    }, 1000);
  };

  // Get icon based on transport type
  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'taxi':
        return <CarTaxiFront className="h-5 w-5 mr-2" />;
      case 'bus':
        return <Bus className="h-5 w-5 mr-2" />;
      case 'train':
      case 'tram':
      case 'metro':
        return <Navigation className="h-5 w-5 mr-2" />;
      default:
        return <Compass className="h-5 w-5 mr-2" />;
    }
  };

  // Filter providers by type
  const taxis = providers.filter(p => p.type === 'taxi');
  const publicTransport = providers.filter(p => p.type !== 'taxi');

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <MapPin className="mr-2 h-6 w-6" />
            Local Transport Options
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={loading}
          >
            {loading ? "Loading..." : location ? "Refresh Location" : "Get Nearby Options"}
          </Button>
        </div>
        {location && (
          <div className="text-sm text-muted-foreground">
            Based on your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {providers.length > 0 ? (
          <Tabs defaultValue="all">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="taxi" className="flex-1">Taxis</TabsTrigger>
              <TabsTrigger value="public" className="flex-1">Public Transport</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {providers.map(provider => (
                    <div 
                      key={provider.id} 
                      className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {getTransportIcon(provider.type)}
                          <span className="font-medium">{provider.name}</span>
                        </div>
                        <Badge variant="outline">
                          {provider.distance} km
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {provider.type === 'taxi' ? (
                          <>Fare: {provider.fare}</>
                        ) : (
                          <>Next arrival: {provider.nextArrival}</>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="taxi">
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {taxis.map(taxi => (
                    <div 
                      key={taxi.id} 
                      className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CarTaxiFront className="h-5 w-5 mr-2" />
                          <span className="font-medium">{taxi.name}</span>
                        </div>
                        <Badge variant="outline">
                          {taxi.distance} km
                        </Badge>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>Fare: {taxi.fare}</div>
                        <div>Contact: {taxi.contact}</div>
                      </div>
                      <Button size="sm" className="w-full mt-2" variant="outline">
                        Call Taxi
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="public">
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {publicTransport.map(transport => (
                    <div 
                      key={transport.id} 
                      className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {getTransportIcon(transport.type)}
                          <span className="font-medium">{transport.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                            {transport.nextArrival}
                          </Badge>
                          <Badge variant="outline">
                            {transport.distance} km
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Type: {transport.type.charAt(0).toUpperCase() + transport.type.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="py-8 text-center">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                <p>Finding transport options near you...</p>
              </div>
            ) : (
              <div className="text-muted-foreground">
                Click "Get Nearby Options" to see transportation providers in your area
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        Information is based on your current location and may vary. Fares and arrival times are estimates.
      </CardFooter>
    </Card>
  );
};

export default LocalTransportInfo;
