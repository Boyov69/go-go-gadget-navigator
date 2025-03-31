
import React from "react";
import { Car } from "lucide-react";

const TripFeatures: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground pt-1">
      <div className="flex items-center gap-1">
        <Car className="h-3.5 w-3.5" />
        <span>Real-time ETA</span>
      </div>
      <div>
        <span>24/7 Support</span>
      </div>
    </div>
  );
};

export default TripFeatures;
