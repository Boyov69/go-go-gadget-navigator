
import React from 'react';
import { 
  Car, 
  Truck, 
  Bus, 
  Bike, 
  Zap 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { VehicleCategory } from '@/types/providerApi';

interface VehicleTypeSelectorProps {
  selectedVehicleType: string;
  onVehicleTypeChange: (type: string) => void;
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({
  selectedVehicleType,
  onVehicleTypeChange
}) => {
  const { t } = useLanguage();

  const vehicleTypes = [
    {
      id: VehicleCategory.CAR,
      name: t('vehicle.car'),
      icon: <Car className="h-4 w-4" />
    },
    {
      id: VehicleCategory.TAXI,
      name: t('vehicle.taxi'),
      icon: <Car className="h-4 w-4" />
    },
    {
      id: VehicleCategory.SHUTTLE,
      name: t('vehicle.shuttle'),
      icon: <Truck className="h-4 w-4" />
    },
    {
      id: VehicleCategory.BUS,
      name: t('vehicle.bus'),
      icon: <Bus className="h-4 w-4" />
    },
    {
      id: VehicleCategory.BIKE,
      name: t('vehicle.bike'),
      icon: <Bike className="h-4 w-4" />
    },
    {
      id: VehicleCategory.E_BIKE,
      name: t('vehicle.e_bike'),
      icon: <React.Fragment>
        <Bike className="h-4 w-4" />
        <Zap className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500" />
      </React.Fragment>
    },
    {
      id: VehicleCategory.SCOOTER,
      name: t('vehicle.scooter'),
      icon: <Bike className="h-4 w-4 transform rotate-45" />
    },
    {
      id: VehicleCategory.E_SCOOTER,
      name: t('vehicle.e_scooter'),
      icon: <React.Fragment>
        <Bike className="h-4 w-4 transform rotate-45" />
        <Zap className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500" />
      </React.Fragment>
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {vehicleTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onVehicleTypeChange(type.id)}
          className={`relative p-2 rounded-md flex flex-col items-center justify-center ${
            selectedVehicleType === type.id
              ? 'bg-primary/20 border border-primary'
              : 'bg-accent hover:bg-primary/10 border border-transparent'
          } transition-all`}
        >
          <div className="mb-1 relative">
            {type.icon}
          </div>
          <span className="text-xs font-medium">{type.name}</span>
        </button>
      ))}
    </div>
  );
};

export default VehicleTypeSelector;
