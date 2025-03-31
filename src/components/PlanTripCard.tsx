
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, ArrowRight, Plus, Car, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
          <div>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From: Current Location" 
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To: Destination" 
                className="pl-8"
              />
            </div>
          </div>

          {showMultiStops && (
            <div className="space-y-2">
              {additionalStops.map((stop, index) => (
                <div key={index} className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-1">
                    <Input
                      type="text"
                      value={stop}
                      onChange={(e) => handleStopChange(index, e.target.value)}
                      placeholder={`Stop ${index + 1}`}
                      className="pl-8"
                    />
                    <button 
                      className="p-2 bg-accent rounded-md"
                      onClick={() => handleRemoveStop(index)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-dashed" 
                onClick={handleAddStop}
              >
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Stop
              </Button>
            </div>
          )}

          {showPromoCode && (
            <div className="relative">
              <div className="flex gap-1 items-center">
                <Input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code"
                  className=""
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Apply
                </Button>
              </div>
            </div>
          )}

          <div>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Departure: Now" 
                className="pl-8"
                onClick={handleScheduleRide}
              />
            </div>
          </div>

          <div className="flex justify-between text-xs">
            <button 
              className="text-primary flex items-center gap-1"
              onClick={toggleMultiStops}
            >
              {!showMultiStops ? (
                <>
                  <Plus className="h-3.5 w-3.5" /> Add Multiple Stops
                </>
              ) : (
                <>Remove Multiple Stops</>
              )}
            </button>
            <button 
              className="text-primary flex items-center gap-1"
              onClick={togglePromoCode}
            >
              {!showPromoCode ? (
                <>
                  <Plus className="h-3.5 w-3.5" /> Add Promo Code
                </>
              ) : (
                <>Remove Promo Code</>
              )}
            </button>
          </div>

          <div className="pt-2 flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={handleScheduleRide}
            >
              <Clock className="h-4 w-4" />
              Schedule
            </Button>
            <Button 
              className="flex-1 gap-2"
              onClick={handleFindRoute}
            >
              Find Route <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-1">
              <Car className="h-3.5 w-3.5" />
              <span>Real-time ETA</span>
            </div>
            <div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanTripCard;
