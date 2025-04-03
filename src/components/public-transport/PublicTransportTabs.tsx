
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import TrainTransport from "./TrainTransport";
import BusTransport from "./BusTransport";
import TramMetroTransport from "./TramMetroTransport";
import NearbyStations from "./NearbyStations";
import RouteSearch from "./RouteSearch";
import VoiceControlledTransport from "./VoiceControlledTransport";
import { Train, Bus, Locate, Route } from "lucide-react";

const PublicTransportTabs: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("routes");
  
  // Listen for tab changes requested via URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get("tab");
    
    if (tabParam && ["routes", "train", "bus", "tram-metro", "nearby"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set("tab", value);
    window.history.pushState({}, '', url);
  };

  return (
    <>
      <VoiceControlledTransport 
        onTabChange={handleTabChange}
        activeTab={activeTab}
      />
      
      <Tabs 
        defaultValue="routes" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="routes" className="flex items-center gap-2">
            <Route className="h-4 w-4" />
            <span>{t("publicTransport.tabs.routes")}</span>
          </TabsTrigger>
          <TabsTrigger value="train" className="flex items-center gap-2">
            <Train className="h-4 w-4" />
            <span>{t("publicTransport.tabs.train")}</span>
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex items-center gap-2">
            <Bus className="h-4 w-4" />
            <span>{t("publicTransport.tabs.bus")}</span>
          </TabsTrigger>
          <TabsTrigger value="tram-metro" className="flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 15L15 9M9.5 9.5H9.51M14.5 14.5H14.51M8.4 19H15.6C17.8402 19 18.9603 19 19.816 18.564C20.5686 18.1805 21.1805 17.5686 21.564 16.816C22 15.9603 22 14.8402 22 12.6V7.4C22 5.15979 22 4.03968 21.564 3.18404C21.1805 2.43139 20.5686 1.81947 19.816 1.43597C18.9603 1 17.8402 1 15.6 1H8.4C6.15979 1 5.03968 1 4.18404 1.43597C3.43139 1.81947 2.81947 2.43139 2.43597 3.18404C2 4.03968 2 5.15979 2 7.4V12.6C2 14.8402 2 15.9603 2.43597 16.816C2.81947 17.5686 3.43139 18.1805 4.18404 18.564C5.03968 19 6.15979 19 8.4 19ZM9.5 9.5C9.5 9.77614 9.27614 10 9 10C8.72386 10 8.5 9.77614 8.5 9.5C8.5 9.22386 8.72386 9 9 9C9.27614 9 9.5 9.22386 9.5 9.5ZM14.5 14.5C14.5 14.7761 14.2761 15 14 15C13.7239 15 13.5 14.7761 13.5 14.5C13.5 14.2239 13.7239 14 14 14C14.2761 14 14.5 14.2239 14.5 14.5ZM15 19L15 21M9 19L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t("publicTransport.tabs.tramMetro")}</span>
          </TabsTrigger>
          <TabsTrigger value="nearby" className="flex items-center gap-2">
            <Locate className="h-4 w-4" />
            <span>{t("publicTransport.tabs.nearby")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-6">
          <RouteSearch />
        </TabsContent>
        
        <TabsContent value="train" className="space-y-6">
          <TrainTransport />
        </TabsContent>
        
        <TabsContent value="bus" className="space-y-6">
          <BusTransport />
        </TabsContent>
        
        <TabsContent value="tram-metro" className="space-y-6">
          <TramMetroTransport />
        </TabsContent>
        
        <TabsContent value="nearby" className="space-y-6">
          <NearbyStations />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PublicTransportTabs;
