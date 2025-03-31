
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useTripPlanningState() {
  const { toast } = useToast();
  const [from, setFrom] = useState("Current Location");
  const [to, setTo] = useState("");
  const [showMultiStops, setShowMultiStops] = useState(false);
  const [additionalStops, setAdditionalStops] = useState<string[]>([""]);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [vehicleType, setVehicleType] = useState("economy");
  const [showPriceComparison, setShowPriceComparison] = useState(false);

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
  
  return {
    from,
    setFrom,
    to,
    setTo,
    showMultiStops,
    additionalStops,
    showPromoCode,
    promoCode,
    setPromoCode,
    vehicleType,
    setVehicleType,
    showPriceComparison,
    setShowPriceComparison,
    handleAddStop,
    handleStopChange,
    handleRemoveStop,
    toggleMultiStops,
    togglePromoCode,
    handleFindRoute,
    handleScheduleRide,
    handleComparePrice
  };
}
