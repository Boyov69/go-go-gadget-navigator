
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Clock, MapPin } from "lucide-react";

interface TramMetroInfo {
  id: string;
  type: "tram" | "metro";
  line: string;
  destination: string;
  departureTime: string;
  stopName: string;
  status: "on-time" | "delayed" | "cancelled";
  delayMinutes?: number;
}

const TramMetroTransport: React.FC = () => {
  const { t } = useLanguage();
  const [stopQuery, setStopQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - this would come from API
  const [tramMetro, setTramMetro] = useState<TramMetroInfo[]>([
    {
      id: "tm1",
      type: "metro",
      line: "1",
      destination: "Stockel",
      departureTime: "10:02",
      stopName: "Arts-Loi",
      status: "on-time"
    },
    {
      id: "tm2",
      type: "metro",
      line: "5",
      destination: "Herrmann-Debroux",
      departureTime: "10:05",
      stopName: "Arts-Loi",
      status: "on-time"
    },
    {
      id: "tm3",
      type: "tram",
      line: "7",
      destination: "Vanderkindere",
      departureTime: "10:08",
      stopName: "Montgomery",
      status: "delayed",
      delayMinutes: 3
    },
    {
      id: "tm4",
      type: "tram",
      line: "3",
      destination: "Churchill",
      departureTime: "10:15",
      stopName: "Gare du Nord",
      status: "on-time"
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Searching for tram/metro stop:", stopQuery);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real implementation, setTramMetro would be updated with API data
    }, 1000);
  };

  const getStatusBadge = (status: TramMetroInfo["status"], delayMinutes?: number) => {
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

  const getLineStyle = (type: TramMetroInfo["type"], line: string) => {
    if (type === "metro") {
      return "bg-blue-100 text-blue-800 border border-blue-200";
    } else {
      return "bg-amber-100 text-amber-800 border border-amber-200";
    }
  };

  const getTypeIcon = (type: TramMetroInfo["type"]) => {
    if (type === "metro") {
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 18H15.5M9 15L15 9M9.5 9.5H9.51M14.5 14.5H14.51M8.4 22H15.6C17.8402 22 18.9603 22 19.816 21.564C20.5686 21.1805 21.1805 20.5686 21.564 19.816C22 18.9603 22 17.8402 22 15.6V8.4C22 6.15979 22 5.03968 21.564 4.18404C21.1805 3.43139 20.5686 2.81947 19.816 2.43597C18.9603 2 17.8402 2 15.6 2H8.4C6.15979 2 5.03968 2 4.18404 2.43597C3.43139 2.81947 2.81947 3.43139 2.43597 4.18404C2 5.03968 2 6.15979 2 8.4V15.6C2 17.8402 2 18.9603 2.43597 19.816C2.81947 20.5686 3.43139 21.1805 4.18404 21.564C5.03968 22 6.15979 22 8.4 22ZM9.5 9.5C9.5 9.77614 9.27614 10 9 10C8.72386 10 8.5 9.77614 8.5 9.5C8.5 9.22386 8.72386 9 9 9C9.27614 9 9.5 9.22386 9.5 9.5ZM14.5 14.5C14.5 14.7761 14.2761 15 14 15C13.7239 15 13.5 14.7761 13.5 14.5C13.5 14.2239 13.7239 14 14 14C14.2761 14 14.5 14.2239 14.5 14.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else {
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 10H6M18 10H20M9 4.5H7.8C6.11984 4.5 5.27976 4.5 4.63803 4.82698C4.07354 5.1146 3.6146 5.57354 3.32698 6.13803C3 6.77976 3 7.61984 3 9.3V14.7C3 16.3802 3 17.2202 3.32698 17.862C3.6146 18.4265 4.07354 18.8854 4.63803 19.173C5.27976 19.5 6.11984 19.5 7.8 19.5H9M9 4.5H15M9 4.5V19.5M15 4.5H16.2C17.8802 4.5 18.7202 4.5 19.362 4.82698C19.9265 5.1146 20.3854 5.57354 20.673 6.13803C21 6.77976 21 7.61984 21 9.3V14.7C21 16.3802 21 17.2202 20.673 17.862C20.3854 18.4265 19.9265 18.8854 19.362 19.173C18.7202 19.5 17.8802 19.5 16.2 19.5H15M15 4.5V19.5M15 19.5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 15L15 9M9.5 9.5H9.51M14.5 14.5H14.51M8.4 19H15.6C17.8402 19 18.9603 19 19.816 18.564C20.5686 18.1805 21.1805 17.5686 21.564 16.816C22 15.9603 22 14.8402 22 12.6V7.4C22 5.15979 22 4.03968 21.564 3.18404C21.1805 2.43139 20.5686 1.81947 19.816 1.43597C18.9603 1 17.8402 1 15.6 1H8.4C6.15979 1 5.03968 1 4.18404 1.43597C3.43139 1.81947 2.81947 2.43139 2.43597 3.18404C2 4.03968 2 5.15979 2 7.4V12.6C2 14.8402 2 15.9603 2.43597 16.816C2.81947 17.5686 3.43139 18.1805 4.18404 18.564C5.03968 19 6.15979 19 8.4 19ZM9.5 9.5C9.5 9.77614 9.27614 10 9 10C8.72386 10 8.5 9.77614 8.5 9.5C8.5 9.22386 8.72386 9 9 9C9.27614 9 9.5 9.22386 9.5 9.5ZM14.5 14.5C14.5 14.7761 14.2761 15 14 15C13.7239 15 13.5 14.7761 13.5 14.5C13.5 14.2239 13.7239 14 14 14C14.2761 14 14.5 14.2239 14.5 14.5ZM15 19L15 21M9 19L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t("publicTransport.tramMetro.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("publicTransport.tramMetro.searchPlaceholder")}
                value={stopQuery}
                onChange={(e) => setStopQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading || !stopQuery.trim()}>
              {isLoading ? t("common.loading") : t("common.search")}
            </Button>
          </form>
          
          <div className="space-y-4">
            {tramMetro.length > 0 ? tramMetro.map(item => (
              <div 
                key={item.id}
                className="p-4 border rounded-md hover:bg-accent/50 transition-colors"
              >
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-lg font-semibold ${getLineStyle(item.type, item.line)}`}>
                      {item.line}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="text-xs uppercase font-medium">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{item.departureTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{item.destination}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {item.stopName}
                      </span>
                      {getStatusBadge(item.status, item.delayMinutes)}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-muted-foreground opacity-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15L15 9M9.5 9.5H9.51M14.5 14.5H14.51M8.4 19H15.6C17.8402 19 18.9603 19 19.816 18.564C20.5686 18.1805 21.1805 17.5686 21.564 16.816C22 15.9603 22 14.8402 22 12.6V7.4C22 5.15979 22 4.03968 21.564 3.18404C21.1805 2.43139 20.5686 1.81947 19.816 1.43597C18.9603 1 17.8402 1 15.6 1H8.4C6.15979 1 5.03968 1 4.18404 1.43597C3.43139 1.81947 2.81947 2.43139 2.43597 3.18404C2 4.03968 2 5.15979 2 7.4V12.6C2 14.8402 2 15.9603 2.43597 16.816C2.81947 17.5686 3.43139 18.1805 4.18404 18.564C5.03968 19 6.15979 19 8.4 19ZM9.5 9.5C9.5 9.77614 9.27614 10 9 10C8.72386 10 8.5 9.77614 8.5 9.5C8.5 9.22386 8.72386 9 9 9C9.27614 9 9.5 9.22386 9.5 9.5ZM14.5 14.5C14.5 14.7761 14.2761 15 14 15C13.7239 15 13.5 14.7761 13.5 14.5C13.5 14.2239 13.7239 14 14 14C14.2761 14 14.5 14.2239 14.5 14.5ZM15 19L15 21M9 19L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="mt-2 text-muted-foreground">
                  {t("publicTransport.tramMetro.noResults")}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TramMetroTransport;
