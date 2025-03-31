
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

const PlanTripCard: React.FC = () => {
  const { toast } = useToast();
  const [from, setFrom] = useState("Current Location");
  const [to, setTo] = useState("");
  const [showMultiStops, setShowMultiStops] = useState(false);
  const [additionalStops, setAdditionalStops] = useState<string[]>([""]);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");

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

    let message = `Finding route from ${from} to ${to}`;
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

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Plan Your Trip</h3>
      </CardHeader>
      <CardContent>
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
          />

          {/* Trip Features */}
          <TripFeatures />
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanTripCard;
