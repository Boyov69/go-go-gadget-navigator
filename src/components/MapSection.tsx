
import React, { useState } from "react";
import GoogleMap from "./GoogleMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapSection: React.FC = () => {
  const [defaultCenter] = useState({ lat: 50.8476, lng: 4.3572 }); // Brussels coordinates
  
  // Sample nearby locations in Belgium
  const markers = [
    { position: { lat: 50.8476, lng: 4.3572 }, title: "Brussels" },
    { position: { lat: 51.2194, lng: 4.4025 }, title: "Antwerp" },
    { position: { lat: 50.4496, lng: 3.8174 }, title: "Mons" },
    { position: { lat: 51.0543, lng: 3.7174 }, title: "Ghent" },
    { position: { lat: 50.6326, lng: 5.5797 }, title: "Liège" },
    { position: { lat: 51.1667, lng: 5.3833 }, title: "Lommel" },
  ];

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Belgian Transport Map</CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-4rem)]">
        <GoogleMap 
          center={defaultCenter}
          markers={markers}
          height="100%"
          showControls={true}
          mapStyle="retro"
          zoom={8}
        />
      </CardContent>
    </Card>
  );
};

export default MapSection;
