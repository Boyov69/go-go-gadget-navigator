
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Train, Clock, MapPin, AlertTriangle } from "lucide-react";
import iRailService, { iRailStation } from "@/services/transport/iRailService";

interface TrainInfo {
  id: string;
  number: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  platform: string;
  status: "on-time" | "delayed" | "cancelled";
  delayMinutes?: number;
}

const TrainTransport: React.FC = () => {
  const { t } = useLanguage();
  const [stationQuery, setStationQuery] = useState("");
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [selectedStationName, setSelectedStationName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stations, setStations] = useState<iRailStation[]>([]);
  const [showStationResults, setShowStationResults] = useState(false);
  const [trains, setTrains] = useState<TrainInfo[]>([]);
  
  // Search for stations as user types
  useEffect(() => {
    const searchStations = async () => {
      if (stationQuery.length < 2) {
        setStations([]);
        setShowStationResults(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const results = await iRailService.searchStations(stationQuery);
        setStations(results);
        setShowStationResults(true);
      } catch (error) {
        console.error("Error searching stations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const debounceTimer = setTimeout(searchStations, 300);
    return () => clearTimeout(debounceTimer);
  }, [stationQuery]);
  
  // Load departures when a station is selected
  useEffect(() => {
    const fetchDepartures = async () => {
      if (!selectedStationId) return;
      
      setIsLoading(true);
      try {
        const departures = await iRailService.getLiveboard(selectedStationId);
        const trainInfo = iRailService.convertToTrainInfo(departures);
        setTrains(trainInfo);
      } catch (error) {
        console.error("Error fetching departures:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDepartures();
  }, [selectedStationId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This is now handled by the useEffect
  };
  
  const selectStation = (station: iRailStation) => {
    setSelectedStationId(station.id);
    setSelectedStationName(station.name);
    setStationQuery(station.name);
    setShowStationResults(false);
  };

  const getStatusBadge = (status: TrainInfo["status"], delayMinutes?: number) => {
    switch (status) {
      case "on-time":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">On time</Badge>;
      case "delayed":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Delayed {delayMinutes} min
          </Badge>
        );
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="h-5 w-5" />
            {t("publicTransport.train.title")}
            {selectedStationName && (
              <span className="text-sm font-normal ml-2">
                - {selectedStationName}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="relative mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("publicTransport.train.searchPlaceholder")}
                value={stationQuery}
                onChange={(e) => setStationQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {showStationResults && stations.length > 0 && (
              <div className="absolute w-full bg-white dark:bg-gray-800 mt-1 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
                {stations.map(station => (
                  <div 
                    key={station.id}
                    className="p-2 hover:bg-accent cursor-pointer flex items-center gap-2"
                    onClick={() => selectStation(station)}
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div>{station.name}</div>
                      {station.alternative_en && (
                        <div className="text-xs text-muted-foreground">{station.alternative_en}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
          
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : trains.length > 0 ? (
              trains.map(train => (
                <div 
                  key={train.id}
                  className="p-4 border rounded-md hover:bg-accent/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center">
                      <div className="bg-primary/10 text-primary font-semibold rounded-lg p-2 mr-3">
                        {train.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{train.departureTime}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {train.origin} → {train.destination}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                      <div className="text-center px-3 py-1 bg-muted rounded-md">
                        <div className="text-xs text-muted-foreground">Platform</div>
                        <div className="font-semibold">{train.platform}</div>
                      </div>
                      
                      {getStatusBadge(train.status, train.delayMinutes)}
                    </div>
                  </div>
                  
                  {train.status === "delayed" && train.delayMinutes && (
                    <div className="mt-3 text-sm flex items-center gap-1 text-amber-600 bg-amber-50 p-2 rounded">
                      <AlertTriangle className="h-4 w-4" />
                      <span>New arrival time: {train.arrivalTime}</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Train className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                <p className="mt-2 text-muted-foreground">
                  {selectedStationId ? 
                    "No departures found for this station" : 
                    t("publicTransport.train.noResults")}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainTransport;
