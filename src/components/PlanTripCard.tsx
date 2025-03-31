
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import StopInput from "./trip-planner/StopInput";
import MultiStopSection from "./trip-planner/MultiStopSection";
import PromoCodeSection from "./trip-planner/PromoCodeSection";
import TripFeatures from "./trip-planner/TripFeatures";
import TripOptions from "./trip-planner/TripOptions";
import TripActions from "./trip-planner/TripActions";
import VehicleTypeSelector from "./trip-planner/VehicleTypeSelector";
import PriceComparison from "./trip-planner/PriceComparison";

const PlanTripCard: React.FC = () => {
  const { toast } = useToast();
  const [from, setFrom] = useState("Current Location");
  const [to, setTo] = useState("");
  const [showMultiStops, setShowMultiStops] = useState(false);
  const [additionalStops, setAdditionalStops] = useState<string[]>([""]);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [vehicleType, setVehicleType] = useState("economy");
  const [showPriceComparison, setShowPriceComparison] = useState(false);

  // Sample providers for price comparison
  const providers = [
    {
      id: "provider1",
      name: "Express Transfer",
      price: 12.50,
      rating: 4.5,
      features: ["24/7 Support", "No hidden fees", "Free cancellation", "Live tracking"],
      eta: "5 min",
      recommended: true
    },
    {
      id: "provider2",
      name: "City Rides",
      price: 10.75,
      rating: 4.2,
      features: ["Fixed price", "Professional drivers", "Payment options", "Free waiting time"],
      eta: "7 min"
    },
    {
      id: "provider3",
      name: "Premium Cars",
      price: 18.00,
      rating: 4.8,
      features: ["Premium vehicles", "Wi-Fi onboard", "Refreshments", "Meet & greet"],
      eta: "10 min"
    }
  ];

  const handleAddStop = () => {
    setAdditionalStops([...additionalStops, ""]);
  };

  const handleStopChange = (index: number, value: string) => {
    const newStops = [...additionalStops];
    newStops[index] = value;
    setAdditionalStops(newStops);
  };

  const handleRemoveStop = (index: number) => {
    const newStops = additionalStops.filter((_, i) => i !== index);
    setAdditionalStops(newStops);
  };

  const toggleMultiStops = () => {
    setShowMultiStops(!showMultiStops);
  };

  const togglePromoCode = () => {
    setShowPromoCode(!showPromoCode);
  };

  const handleFindRoute = () => {
    if (!to) {
      toast({
        title: "Missing destination",
        description: "Please enter your destination",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    let message = `Finding route from ${from} to ${to} with ${vehicleType} vehicle`;
    if (additionalStops.some(stop => stop.trim() !== "")) {
      message += " with additional stops";
    }

    if (promoCode) {
      message += ` (Promo: ${promoCode})`;
    }

    toast({
      title: "Route Found",
      description: message,
      duration: 3000,
    });
  };

  const handleScheduleRide = () => {
    toast({
      title: "Schedule Ride",
      description: "Opening scheduling options",
      duration: 2000,
    });
  };
  
  const handleComparePrice = () => {
    setShowPriceComparison(true);
  };
  
  const handleSelectProvider = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    
    if (provider) {
      toast({
        title: "Provider Selected",
        description: `You've selected ${provider.name} at €${provider.price.toFixed(2)}`,
        duration: 3000,
      });
    }
    
    setShowPriceComparison(false);
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Plan Your Trip</h3>
      </CardHeader>
      <CardContent>
        {showPriceComparison ? (
          <PriceComparison
            providers={providers}
            onSelect={handleSelectProvider}
            onClose={() => setShowPriceComparison(false)}
          />
        ) : (
          <div className="space-y-3">
            {/* Origin Input */}
            <StopInput
              value={from}
              onChange={setFrom}
              placeholder="From: Current Location"
            />
            
            {/* Destination Input */}
            <StopInput
              value={to}
              onChange={setTo}
              placeholder="To: Destination"
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
                placeholder="Departure: Now" 
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
        )}
      </CardContent>
    </Card>
  );
};

export default PlanTripCard;
