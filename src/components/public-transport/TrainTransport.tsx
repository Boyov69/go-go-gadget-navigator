
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Train, Clock, MapPin, AlertTriangle } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data for trains - this would come from API
  const [trains, setTrains] = useState<TrainInfo[]>([
    {
      id: "t1",
      number: "IC 512",
      origin: "Brussels-South",
      destination: "Antwerp-Central",
      departureTime: "10:15",
      arrivalTime: "11:02",
      platform: "3",
      status: "on-time"
    },
    {
      id: "t2",
      number: "IC 1545",
      origin: "Brussels-Central", 
      destination: "Ghent-Sint-Pieters",
      departureTime: "10:25",
      arrivalTime: "11:10",
      platform: "4",
      status: "delayed",
      delayMinutes: 10
    },
    {
      id: "t3",
      number: "IC 2806",
      origin: "Brussels-South",
      destination: "Liège-Guillemins",
      departureTime: "10:32",
      arrivalTime: "11:28",
      platform: "6",
      status: "on-time"
    },
    {
      id: "t4",
      number: "P 8089",
      origin: "Brussels-South",
      destination: "Namur",
      departureTime: "10:45",
      arrivalTime: "11:32",
      platform: "8",
      status: "cancelled"
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Searching for station:", stationQuery);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real implementation, setTrains would be updated with API data
    }, 1000);
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
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
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
            <Button type="submit" disabled={isLoading || !stationQuery.trim()}>
              {isLoading ? t("common.loading") : t("common.search")}
            </Button>
          </form>
          
          <div className="space-y-4">
            {trains.length > 0 ? trains.map(train => (
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
                
                {train.status === "delayed" && (
                  <div className="mt-3 text-sm flex items-center gap-1 text-amber-600 bg-amber-50 p-2 rounded">
                    <AlertTriangle className="h-4 w-4" />
                    <span>New arrival time: {train.arrivalTime}</span>
                  </div>
                )}
              </div>
            )) : (
              <div className="text-center py-12">
                <Train className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                <p className="mt-2 text-muted-foreground">
                  {t("publicTransport.train.noResults")}
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
