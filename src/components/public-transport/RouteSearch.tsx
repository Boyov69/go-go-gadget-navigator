
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Calendar, Clock, ArrowRightLeft } from "lucide-react";

const RouteSearch: React.FC = () => {
  const { t } = useLanguage();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>(
    new Date().toTimeString().slice(0, 5) // Current time in HH:MM format
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for routes:", { origin, destination, date, time });
    // This would be replaced by actual API call
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{t("publicTransport.routeSearch.title")}</CardTitle>
        <CardDescription>
          {t("publicTransport.routeSearch.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder={t("publicTransport.routeSearch.fromPlaceholder")}
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="pl-10 w-full"
                required
              />
              <span className="absolute left-3 top-2.5 text-muted-foreground">A</span>
            </div>
            
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="md:mt-0" 
              onClick={swapLocations}
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
            
            <div className="relative w-full">
              <Input
                type="text"
                placeholder={t("publicTransport.routeSearch.toPlaceholder")}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10 w-full"
                required
              />
              <span className="absolute left-3 top-2.5 text-muted-foreground">B</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-grow"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-grow"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Search className="h-4 w-4 mr-2" />
            {t("publicTransport.routeSearch.searchButton")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RouteSearch;
