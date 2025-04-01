
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Bus, Clock, MapPin, AlertCircle } from "lucide-react";

interface BusInfo {
  id: string;
  line: string;
  destination: string;
  departureTime: string;
  stopName: string;
  status: "on-time" | "delayed" | "cancelled";
  company: "de-lijn" | "tec" | "stib-mivb";
  delayMinutes?: number;
}

const BusTransport: React.FC = () => {
  const { t } = useLanguage();
  const [busStopQuery, setBusStopQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>("all");
  
  // Mock data for buses - this would come from API
  const [buses, setBuses] = useState<BusInfo[]>([
    {
      id: "b1",
      line: "71",
      destination: "Delta",
      departureTime: "10:05",
      stopName: "De Brouckère",
      status: "on-time",
      company: "stib-mivb"
    },
    {
      id: "b2",
      line: "45",
      destination: "Sint-Gillis",
      departureTime: "10:12",
      stopName: "Gare du Nord",
      status: "delayed",
      company: "stib-mivb",
      delayMinutes: 5
    },
    {
      id: "b3",
      line: "126",
      destination: "Brussels Airport",
      departureTime: "10:20",
      stopName: "Schuman",
      status: "on-time",
      company: "de-lijn"
    },
    {
      id: "b4",
      line: "W",
      destination: "Waterloo",
      departureTime: "10:35",
      stopName: "Brussels South",
      status: "on-time",
      company: "tec"
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Searching for bus stop:", busStopQuery);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real implementation, setBuses would be updated with API data
    }, 1000);
  };

  const filteredBuses = selectedProvider === "all" 
    ? buses 
    : buses.filter(bus => bus.company === selectedProvider);

  const getStatusBadge = (status: BusInfo["status"], delayMinutes?: number) => {
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

  const getCompanyLogo = (company: BusInfo["company"]) => {
    switch (company) {
      case "de-lijn":
        return <Badge variant="outline">De Lijn</Badge>;
      case "stib-mivb":
        return <Badge variant="outline">STIB-MIVB</Badge>;
      case "tec":
        return <Badge variant="outline">TEC</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="h-5 w-5" />
            {t("publicTransport.bus.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("publicTransport.bus.searchPlaceholder")}
                value={busStopQuery}
                onChange={(e) => setBusStopQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading || !busStopQuery.trim()}>
              {isLoading ? t("common.loading") : t("common.search")}
            </Button>
          </form>

          <Tabs defaultValue="all" value={selectedProvider} onValueChange={setSelectedProvider} className="w-full mb-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">{t("publicTransport.bus.all")}</TabsTrigger>
              <TabsTrigger value="de-lijn">De Lijn</TabsTrigger>
              <TabsTrigger value="tec">TEC</TabsTrigger>
              <TabsTrigger value="stib-mivb">STIB-MIVB</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="space-y-4">
            {filteredBuses.length > 0 ? filteredBuses.map(bus => (
              <div 
                key={bus.id}
                className="p-4 border rounded-md hover:bg-accent/50 transition-colors"
              >
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`
                      bg-primary/10 text-primary font-semibold rounded-lg p-2
                      ${bus.company === 'de-lijn' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : ''}
                      ${bus.company === 'stib-mivb' ? 'bg-blue-50 text-blue-700 border border-blue-200' : ''}
                      ${bus.company === 'tec' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
                    `}>
                      {bus.line}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{bus.departureTime}</span>
                        {getStatusBadge(bus.status, bus.delayMinutes)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{bus.destination}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{bus.stopName}</span>
                    {getCompanyLogo(bus.company)}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <Bus className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                <p className="mt-2 text-muted-foreground">
                  {t("publicTransport.bus.noResults")}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusTransport;
