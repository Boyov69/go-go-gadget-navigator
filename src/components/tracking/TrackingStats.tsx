
import React from "react";
import { Clock, Navigation } from "lucide-react";

interface TrackingStatsProps {
  eta: number;
  distance: number;
}

const TrackingStats: React.FC<TrackingStatsProps> = ({ eta, distance }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="border rounded-md p-3 text-center">
        <div className="text-sm text-muted-foreground">ETA</div>
        <div className="flex items-center justify-center gap-1 font-medium">
          <Clock className="h-4 w-4" />
          {Math.ceil(eta)} mins
        </div>
      </div>
      <div className="border rounded-md p-3 text-center">
        <div className="text-sm text-muted-foreground">Distance</div>
        <div className="flex items-center justify-center gap-1 font-medium">
          <Navigation className="h-4 w-4" />
          {distance.toFixed(1)} km
        </div>
      </div>
    </div>
  );
};

export default TrackingStats;
