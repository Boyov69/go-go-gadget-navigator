
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleMap from "@/components/GoogleMap";
import { useLanguage } from "@/contexts/LanguageContext";

const MapExplorer: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample locations for the map - Belgian cities
  const popularLocations = [
    { position: { lat: 50.8503, lng: 4.3517 }, title: "Brussels" },
    { position: { lat: 51.2194, lng: 4.4025 }, title: "Antwerp" },
    { position: { lat: 51.0543, lng: 3.7174 }, title: "Ghent" },
    { position: { lat: 50.6326, lng: 5.5797 }, title: "Liège" },
    { position: { lat: 51.3097, lng: 3.2340 }, title: "Bruges" },
  ];
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{t("home.exploreBelgium")}</CardTitle>
      </CardHeader>
      <GoogleMap 
        markers={popularLocations}
        height="500px"
        center={{ lat: 50.8503, lng: 4.3517 }}
        zoom={8}
      />
    </Card>
  );
};

export default MapExplorer;
