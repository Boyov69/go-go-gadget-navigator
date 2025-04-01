
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Locate, RefreshCw } from "lucide-react";
import GoogleMap from "@/components/GoogleMap";

interface Station {
  id: string;
  name: string;
  type: "train" | "bus" | "tram" | "metro";
  position: { lat: number; lng: number };
  distance: number;
  lines: string[];
}

const NearbyStations: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    // Get user's location when component mounts
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          // In a real app, fetch nearby stations from API based on user location
          fetchNearbyStations(latitude, longitude);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          toast({
            title: t("common.error"),
            description: t("locations.geolocationError"),
            variant: "destructive",
          });
          
          // Use default location as fallback (Brussels Central)
          setUserLocation({ lat: 50.845, lng: 4.357 });
          // Use mock data as fallback
          setMockStations();
        }
      );
    } else {
      setIsLoading(false);
      toast({
        title: t("common.error"),
        description: t("locations.geolocationNotSupported"),
        variant: "destructive",
      });
      
      // Use default location as fallback (Brussels Central)
      setUserLocation({ lat: 50.845, lng: 4.357 });
      // Use mock data as fallback
      setMockStations();
    }
  };

  const fetchNearbyStations = (lat: number, lng: number) => {
    // In a real app, this would be an API call to fetch nearby stations
    console.log("Fetching stations near:", lat, lng);
    
    // For demo purposes, use mock data
    setMockStations();
  };

  const setMockStations = () => {
    // Mock data for nearby stations
    const mockNearbyStations: Station[] = [
      {
        id: "s1",
        name: "Brussels Central",
        type: "train",
        position: { lat: 50.845, lng: 4.357 },
        distance: 0.2,
        lines: ["IC", "S1", "S2", "S3"]
      },
      {
        id: "s2",
        name: "De Brouckère",
        type: "metro",
        position: { lat: 50.8505, lng: 4.3536 },
        distance: 0.4,
        lines: ["1", "5"]
      },
      {
        id: "s3",
        name: "Grand Place",
        type: "bus",
        position: { lat: 50.8467, lng: 4.3525 },
        distance: 0.3,
        lines: ["48", "95"]
      },
      {
        id: "s4",
        name: "Bourse",
        type: "tram",
        position: { lat: 50.8483, lng: 4.3488 },
        distance: 0.5,
        lines: ["3", "4"]
      },
      {
        id: "s5",
        name: "Brussels South",
        type: "train",
        position: { lat: 50.8358, lng: 4.3341 },
        distance: 1.2,
        lines: ["IC", "Thalys", "Eurostar"]
      }
    ];
    
    setStations(mockNearbyStations);
  };

  const getStationTypeIcon = (type: Station["type"]) => {
    switch (type) {
      case "train":
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-7.657l1.414-1.414M5.636 5.636L4.222 4.222m14.142 14.142l1.414 1.414M5.636 18.364L4.222 19.778M12 12h.01m8-3a8 8 0 11-16 0 8 8 0 0116 0z" />
          </svg>
        );
      case "bus":
        return <Bus className="h-5 w-5" />;
      case "tram":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10H6M18 10H20M9 4.5H7.8C6.11984 4.5 5.27976 4.5 4.63803 4.82698C4.07354 5.1146 3.6146 5.57354 3.32698 6.13803C3 6.77976 3 7.61984 3 9.3V14.7C3 16.3802 3 17.2202 3.32698 17.862C3.6146 18.4265 4.07354 18.8854 4.63803 19.173C5.27976 19.5 6.11984 19.5 7.8 19.5H9M9 4.5H15M9 4.5V19.5M15 4.5H16.2C17.8802 4.5 18.7202 4.5 19.362 4.82698C19.9265 5.1146 20.3854 5.57354 20.673 6.13803C21 6.77976 21 7.61984 21 9.3V14.7C21 16.3802 21 17.2202 20.673 17.862C20.3854 18.4265 19.9265 18.8854 19.362 19.173C18.7202 19.5 17.8802 19.5 16.2 19.5H15M15 4.5V19.5M15 19.5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case "metro":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 15L15 9M9.5 9.5H9.51M14.5 14.5H14.51M8.4 19H15.6C17.8402 19 18.9603 19 19.816 18.564C20.5686 18.1805 21.1805 17.5686 21.564 16.816C22 15.9603 22 14.8402 22 12.6V7.4C22 5.15979 22 4.03968 21.564 3.18404C21.1805 2.43139 20.5686 1.81947 19.816 1.43597C18.9603 1 17.8402 1 15.6 1H8.4C6.15979 1 5.03968 1 4.18404 1.43597C3.43139 1.81947 2.81947 2.43139 2.43597 3.18404C2 4.03968 2 5.15979 2 7.4V12.6C2 14.8402 2 15.9603 2.43597 16.816C2.81947 17.5686 3.43139 18.1805 4.18404 18.564C5.03968 19 6.15979 19 8.4 19ZM9.5 9.5C9.5 9.77614 9.27614 10 9 10C8.72386 10 8.5 9.77614 8.5 9.5C8.5 9.22386 8.72386 9 9 9C9.27614 9 9.5 9.22386 9.5 9.5ZM14.5 14.5C14.5 14.7761 14.2761 15 14 15C13.7239 15 13.5 14.7761 13.5 14.5C13.5 14.2239 13.7239 14 14 14C14.2761 14 14.5 14.2239 14.5 14.5ZM15 19L15 21M9 19L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getStationTypeClass = (type: Station["type"]) => {
    switch (type) {
      case "train":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "bus":
        return "bg-green-50 text-green-700 border-green-200";
      case "tram":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "metro":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  // Prepare data for Google Maps
  const mapMarkers = stations.map(station => ({
    position: station.position,
    title: station.name,
    content: `${station.type.toUpperCase()}: ${station.name}`
  }));

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {t("publicTransport.nearby.title")}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="ml-auto"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Locate className="h-4 w-4 mr-2" />
            )}
            {isLoading ? t("common.loading") : t("common.refreshLocation")}
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {userLocation && (
            <div className="h-64 sm:h-80 lg:h-96">
              <GoogleMap
                center={userLocation}
                markers={mapMarkers}
                height="100%"
                zoom={15}
                showControls={true}
                mapStyle="retro"
              />
            </div>
          )}
          
          <div className="p-6 space-y-4">
            {stations.length > 0 ? stations.map(station => (
              <div 
                key={station.id}
                className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${getStationTypeClass(station.type)}`}>
                    {getStationTypeIcon(station.type)}
                  </div>
                  <div>
                    <h3 className="font-medium">{station.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {station.distance} km
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-accent rounded-full">
                        {station.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex flex-wrap gap-1 max-w-[120px]">
                    {station.lines.map((line, i) => (
                      <span 
                        key={i} 
                        className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )) : isLoading ? (
              <div className="py-12 text-center">
                <RefreshCw className="animate-spin h-8 w-8 mx-auto text-primary" />
                <p className="mt-4">{t("common.loading")}</p>
              </div>
            ) : (
              <div className="py-12 text-center">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                <p className="mt-2 text-muted-foreground">
                  {t("publicTransport.nearby.noResults")}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NearbyStations;

// Temporary Bus component as it's used above but TS complains if not defined
const Bus = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 18H16M7 14H17M17 9H7M9.5 4H14.5M6 9V17.8C6 18.9201 6 19.4802 6.21799 19.908C6.40973 20.2843 6.71569 20.5903 7.09202 20.782C7.51984 21 8.0799 21 9.2 21H14.8C15.9201 21 16.4802 21 16.908 20.782C17.2843 20.5903 17.5903 20.2843 17.782 19.908C18 19.4802 18 18.9201 18 17.8V9M6 9H18M6 9V7.2C6 6.0799 6 5.51984 6.21799 5.09202C6.40973 4.71569 6.71569 4.40973 7.09202 4.21799C7.51984 4 8.0799 4 9.2 4H14.8C15.9201 4 16.4802 4 16.908 4.21799C17.2843 4.40973 17.5903 4.71569 17.782 5.09202C18 5.51984 18 6.0799 18 7.2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
