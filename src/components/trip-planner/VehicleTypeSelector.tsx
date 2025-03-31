
import React from "react";
import { Car, Bus, Plane, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VehicleTypeSelectorProps {
  selectedVehicleType: string;
  onVehicleTypeChange: (id: string) => void;
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({
  selectedVehicleType,
  onVehicleTypeChange,
}) => {
  const { t } = useLanguage();

  const vehicleTypes = [
    {
      id: "economy",
      name: t("trip.economy"),
      icon: <Car className="h-5 w-5" />,
      description: t("trip.affordableRides"),
      priceEstimate: "From €8.50",
    },
    {
      id: "comfort",
      name: t("trip.comfort"),
      icon: <Car className="h-5 w-5" />,
      description: t("trip.comfortableVehicles"),
      priceEstimate: "From €12.75",
    },
    {
      id: "business",
      name: t("trip.business"),
      icon: <Briefcase className="h-5 w-5" />,
      description: t("trip.premiumVehicles"),
      priceEstimate: "From €25.00",
    },
    {
      id: "shuttle",
      name: t("trip.shuttle"),
      icon: <Bus className="h-5 w-5" />,
      description: t("trip.groupVehicles"),
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
