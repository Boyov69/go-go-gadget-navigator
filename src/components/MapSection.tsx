
import React, { useState } from "react";
import GoogleMap from "./GoogleMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapSection: React.FC = () => {
  const [defaultCenter] = useState({ lat: 51.505, lng: -0.09 });
  
  // Sample nearby locations
  const markers = [
    { position: { lat: 51.51, lng: -0.08 }, title: "Destination 1" },
    { position: { lat: 51.49, lng: -0.1 }, title: "Destination 2" },
    { position: { lat: 51.505, lng: -0.11 }, title: "Destination 3" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Explore Nearby</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <GoogleMap 
          center={defaultCenter}
          markers={markers}
          height="400px"
          showControls={true}
          mapStyle="retro"
        />
      </CardContent>
    </Card>
  );
};

export default MapSection;
