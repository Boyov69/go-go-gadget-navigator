
import React from "react";
import { Car, Bus, Plane, Briefcase } from "lucide-react";

interface VehicleType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  priceEstimate: string;
}

interface VehicleTypeSelectorProps {
  selectedVehicleType: string;
  onVehicleTypeChange: (id: string) => void;
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({
  selectedVehicleType,
  onVehicleTypeChange,
}) => {
  const vehicleTypes: VehicleType[] = [
    {
      id: "economy",
      name: "Economy",
      icon: <Car className="h-5 w-5" />,
      description: "Affordable rides for everyday travel",
      priceEstimate: "From €8.50",
    },
    {
      id: "comfort",
      name: "Comfort",
      icon: <Car className="h-5 w-5" />,
      description: "Comfortable vehicles with extra amenities",
      priceEstimate: "From €12.75",
    },
    {
      id: "business",
      name: "Business",
      icon: <Briefcase className="h-5 w-5" />,
      description: "Premium vehicles for business travel",
      priceEstimate: "From €25.00",
    },
    {
      id: "shuttle",
      name: "Shuttle",
      icon: <Bus className="h-5 w-5" />,
      description: "Vans and minibuses for groups",
      priceEstimate: "From €35.00",
    },
  ];

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Select Vehicle Type</h4>
      <div className="grid grid-cols-2 gap-2">
        {vehicleTypes.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => onVehicleTypeChange(vehicle.id)}
            className={`p-3 rounded-md border-2 ${
              selectedVehicleType === vehicle.id
                ? "bg-primary/10 border-primary"
                : "bg-accent/50 border-transparent"
            } flex flex-col items-center justify-center transition-all`}
          >
            {vehicle.icon}
            <span className="text-sm mt-1">{vehicle.name}</span>
            <span className="text-xs text-muted-foreground mt-1">{vehicle.priceEstimate}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleTypeSelector;
