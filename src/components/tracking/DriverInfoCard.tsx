
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Star, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface DriverInfoProps {
  id: string;
  name: string;
  photo: string;
  rating: number;
  vehicle: {
    model: string;
    color: string;
    licensePlate: string;
  };
}

const DriverInfoCard: React.FC<{ driverInfo: DriverInfoProps }> = ({ driverInfo }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-primary">
          <img src={driverInfo.photo} alt={driverInfo.name} />
        </Avatar>
        <div>
          <h3 className="font-medium">{driverInfo.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            {driverInfo.rating}
            <span className="mx-2">•</span>
            <Shield className="h-3 w-3 mr-1" />
            Verified
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium">{driverInfo.vehicle.model}</div>
        <div className="text-sm text-muted-foreground">
          {driverInfo.vehicle.color} • {driverInfo.vehicle.licensePlate}
        </div>
      </div>
    </div>
  );
};

export default DriverInfoCard;
