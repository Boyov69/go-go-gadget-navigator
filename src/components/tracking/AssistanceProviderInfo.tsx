
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Star, Shield, Building, Clock } from "lucide-react";

export interface AssistanceProviderProps {
  id: string;
  name: string;
  logo: string;
  rating: number;
  vehicle: {
    model: string;
    color: string;
    licensePlate: string;
  };
  company: {
    name: string;
    established: string;
    certified: boolean;
  };
  eta: number;
  distance: number;
}

const AssistanceProviderInfo: React.FC<{ providerInfo: AssistanceProviderProps }> = ({ providerInfo }) => {
  return (
    <div className="rounded-lg border p-4 bg-white space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-red-500">
            <img src={providerInfo.logo} alt={providerInfo.company.name} />
          </Avatar>
          <div>
            <h3 className="font-medium">{providerInfo.company.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {providerInfo.rating}
              <span className="mx-2">•</span>
              <Building className="h-3 w-3 mr-1" />
              Est. {providerInfo.company.established}
              {providerInfo.company.certified && (
                <>
                  <span className="mx-2">•</span>
                  <Shield className="h-3 w-3 mr-1" />
                  Certified
                </>
              )}
            </div>
          </div>
        </div>
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Assistance Provider
        </Badge>
      </div>
      
      <div className="border-t border-b py-3 grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Technician</p>
          <p className="font-medium">{providerInfo.name}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Vehicle</p>
          <p className="font-medium">
            {providerInfo.vehicle.color} {providerInfo.vehicle.model}
          </p>
          <p className="text-xs text-muted-foreground">{providerInfo.vehicle.licensePlate}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-red-500" />
          <span className="text-sm">
            <span className="font-medium">ETA:</span> {providerInfo.eta} min
          </span>
        </div>
        <div className="text-sm">
          <span className="font-medium">Distance:</span> {providerInfo.distance.toFixed(1)} km
        </div>
      </div>
    </div>
  );
};

export default AssistanceProviderInfo;
