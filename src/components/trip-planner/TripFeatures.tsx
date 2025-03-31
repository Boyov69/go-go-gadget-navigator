
import React from "react";
import { Car, DollarSign, Globe, Languages, Clock, Star } from "lucide-react";

const TripFeatures: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-muted-foreground pt-2">
      <div className="flex items-center gap-1">
        <Car className="h-3.5 w-3.5" />
        <span>Real-time ETA</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        <span>24/7 Support</span>
      </div>
      <div className="flex items-center gap-1">
        <DollarSign className="h-3.5 w-3.5" />
        <span>Price Comparison</span>
      </div>
      <div className="flex items-center gap-1">
        <Star className="h-3.5 w-3.5" />
        <span>Driver Ratings</span>
      </div>
      <div className="flex items-center gap-1">
        <Globe className="h-3.5 w-3.5" />
        <span>Global Coverage</span>
      </div>
      <div className="flex items-center gap-1">
        <Languages className="h-3.5 w-3.5" />
        <span>Multi-language</span>
      </div>
    </div>
  );
};

export default TripFeatures;
