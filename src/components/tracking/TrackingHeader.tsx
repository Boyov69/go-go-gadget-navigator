
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "lucide-react";

const TrackingHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Live Driver Tracking
        </div>
        <Badge variant="outline" className="bg-green-100">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse" />
          Live
        </Badge>
      </CardTitle>
    </CardHeader>
  );
};

export default TrackingHeader;
