
import React from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import StopInput from "./StopInput";
import MultiStopSection from "./MultiStopSection";
import PromoCodeSection from "./PromoCodeSection";
import TripFeatures from "./TripFeatures";
import TripOptions from "./TripOptions";
import TripActions from "./TripActions";
import VehicleTypeSelector from "./VehicleTypeSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface TripFormContentProps {
  from: string;
  setFrom: (value: string) => void;
  to: string;
  setTo: (value: string) => void;
  showMultiStops: boolean;
  additionalStops: string[];
  handleStopChange: (index: number, value: string) => void;
  handleAddStop: () => void;
  handleRemoveStop: (index: number) => void;
  showPromoCode: boolean;
  promoCode: string;
  setPromoCode: (value: string) => void;
  vehicleType: string;
  setVehicleType: (value: string) => void;
  toggleMultiStops: () => void;
  togglePromoCode: () => void;
  handleScheduleRide: () => void;
  handleFindRoute: () => void;
  handleComparePrice: () => void;
}

const TripFormContent: React.FC<TripFormContentProps> = ({
  from,
  setFrom,
  to,
  setTo,
  showMultiStops,
  additionalStops,
  handleStopChange,
  handleAddStop,
  handleRemoveStop,
  showPromoCode,
  promoCode,
  setPromoCode,
  vehicleType,
  setVehicleType,
  toggleMultiStops,
  togglePromoCode,
  handleScheduleRide,
  handleFindRoute,
  handleComparePrice
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      {/* Origin Input */}
      <StopInput
        value={from}
        onChange={setFrom}
        placeholder={t("trip.from")}
      />
      
      {/* Destination Input */}
      <StopInput
        value={to}
        onChange={setTo}
        placeholder={t("trip.to")}
      />

      {/* Multiple Stops Section */}
      {showMultiStops && (
        <MultiStopSection
          stops={additionalStops}
          onStopChange={handleStopChange}
          onAddStop={handleAddStop}
          onRemoveStop={handleRemoveStop}
        />
      )}

      {/* Promo Code Section */}
      {showPromoCode && (
        <PromoCodeSection
          promoCode={promoCode}
          onPromoCodeChange={setPromoCode}
        />
      )}

      {/* Vehicle Type Selector */}
      <VehicleTypeSelector 
        selectedVehicleType={vehicleType}
        onVehicleTypeChange={setVehicleType}
      />

      {/* Departure Input */}
      <div className="relative">
        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder={t("trip.departureNow")} 
          className="pl-8"
          onClick={handleScheduleRide}
        />
      </div>

      {/* Trip Options */}
      <TripOptions
        showMultiStops={showMultiStops}
        showPromoCode={showPromoCode}
        onToggleMultiStops={toggleMultiStops}
        onTogglePromoCode={togglePromoCode}
      />

      {/* Trip Actions */}
      <TripActions
        onSchedule={handleScheduleRide}
        onFindRoute={handleFindRoute}
        onComparePrice={handleComparePrice}
      />

      {/* Trip Features */}
      <TripFeatures />
    </div>
  );
};

export default TripFormContent;
