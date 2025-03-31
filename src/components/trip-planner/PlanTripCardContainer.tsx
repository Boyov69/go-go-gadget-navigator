
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PriceComparison from "./PriceComparison";
import TripFormContent from "./TripFormContent";
import { useTripPlanningState } from "./useTripPlanningState";
import { tripProviders } from "./tripProviders";
import { useTripProviders } from "./useTripProviders";

const PlanTripCardContainer: React.FC = () => {
  const tripState = useTripPlanningState();
  const { handleSelectProvider } = useTripProviders();
  
  const onSelectProvider = (providerId: string) => {
    const provider = tripProviders.find(p => p.id === providerId);
    if (provider) {
      handleSelectProvider(provider);
      tripState.setShowPriceComparison(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Plan Your Trip</h3>
      </CardHeader>
      <CardContent>
        {tripState.showPriceComparison ? (
          <PriceComparison
            providers={tripProviders}
            onSelect={onSelectProvider}
            onClose={() => tripState.setShowPriceComparison(false)}
          />
        ) : (
          <TripFormContent
            from={tripState.from}
            setFrom={tripState.setFrom}
            to={tripState.to}
            setTo={tripState.setTo}
            showMultiStops={tripState.showMultiStops}
            additionalStops={tripState.additionalStops}
            handleStopChange={tripState.handleStopChange}
            handleAddStop={tripState.handleAddStop}
            handleRemoveStop={tripState.handleRemoveStop}
            showPromoCode={tripState.showPromoCode}
            promoCode={tripState.promoCode}
            setPromoCode={tripState.setPromoCode}
            vehicleType={tripState.vehicleType}
            setVehicleType={tripState.setVehicleType}
            toggleMultiStops={tripState.toggleMultiStops}
            togglePromoCode={tripState.togglePromoCode}
            handleScheduleRide={tripState.handleScheduleRide}
            handleFindRoute={tripState.handleFindRoute}
            handleComparePrice={tripState.handleComparePrice}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PlanTripCardContainer;
