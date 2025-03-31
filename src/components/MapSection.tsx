
import React from "react";
import { Button } from "@/components/ui/button";
import { Navigation, Locate, Plus, Minus } from "lucide-react";

const MapSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background h-[400px] md:h-[500px] shadow-sm">
      <div className="map-container absolute inset-0 bg-blue-50">
        {/* Map visualization placeholder */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center p-4 space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Navigation className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Interactive Map</h3>
              <p className="text-sm text-muted-foreground">
                Your current location and nearby destinations would appear here.
              </p>
            </div>
            <div className="relative w-40 h-40 mx-auto border-2 border-primary/20 rounded-full">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-75"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-3 w-3 rounded-full bg-primary blinking-dot"></span>
              </div>
              <div className="absolute top-14 right-10">
                <span className="h-2 w-2 rounded-full bg-secondary"></span>
              </div>
              <div className="absolute bottom-12 left-8">
                <span className="h-2 w-2 rounded-full bg-secondary"></span>
              </div>
              <div className="absolute top-10 left-12">
                <span className="h-2 w-2 rounded-full bg-secondary"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="bg-white shadow-sm">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white shadow-sm">
          <Minus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        variant="secondary"
        size="sm"
        className="absolute bottom-4 right-4 z-10 shadow-sm flex gap-2"
      >
        <Locate className="h-4 w-4" /> My Location
      </Button>
    </div>
  );
};

export default MapSection;
