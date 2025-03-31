
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Calendar, Car, ArrowRight, AlertCircle, Clock } from "lucide-react";

type VehicleType = {
  id: string;
  name: string;
  icon: JSX.Element;
  price: number;
  time: string;
  color: string;
};

const RideBooking: React.FC = () => {
  const { toast } = useToast();
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [destination, setDestination] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("economy");

  const vehicleTypes: VehicleType[] = [
    { 
      id: "economy", 
      name: "Economy", 
      icon: <Car className="h-5 w-5" />, 
      price: 8.50, 
      time: "5 min",
      color: "bg-blue-100 border-blue-300"
    },
    { 
      id: "comfort", 
      name: "Comfort", 
      icon: <Car className="h-5 w-5" />, 
      price: 12.75, 
      time: "7 min",
      color: "bg-green-100 border-green-300"
    },
    { 
      id: "business", 
      name: "Business", 
      icon: <Car className="h-5 w-5" />, 
      price: 25.00, 
      time: "10 min",
      color: "bg-purple-100 border-purple-300"
    },
  ];

  const selectedVehicle = vehicleTypes.find(v => v.id === selectedVehicleType);

  const handleBookRide = () => {
    if (!destination) {
      toast({
        title: "Missing destination",
        description: "Please enter your destination",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Ride Booked!",
      description: `${selectedVehicle?.name} ride to ${destination}`,
      duration: 3000,
    });
  };

  const handleScheduleRide = () => {
    if (!destination) {
      toast({
        title: "Missing destination",
        description: "Please enter your destination",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "Schedule Ride",
      description: "Opening ride scheduler",
      duration: 2000,
    });
  };

  return (
    <Card className="border">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Book a Ride</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
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
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="To: Destination" 
                className="pl-8"
              />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Select Vehicle Type</h4>
            <div className="grid grid-cols-3 gap-2">
              {vehicleTypes.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicleType(vehicle.id)}
                  className={`p-3 rounded-md border-2 ${
                    selectedVehicleType === vehicle.id 
                      ? `${vehicle.color} border-primary` 
                      : 'bg-accent/50 border-transparent'
                  } flex flex-col items-center justify-center transition-all`}
                >
                  {vehicle.icon}
                  <span className="text-sm mt-1">{vehicle.name}</span>
                  <span className="text-xs text-muted-foreground mt-1">${vehicle.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedVehicle && (
            <div className="flex justify-between items-center p-3 bg-accent/50 rounded-md">
              <div>
                <p className="text-sm font-medium">Estimated fare</p>
                <p className="text-lg font-bold">${selectedVehicle.price.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Arrival time</p>
                <p className="text-md">{selectedVehicle.time}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button 
              variant="outline"
              onClick={handleScheduleRide}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Schedule
            </Button>
            <Button 
              onClick={handleBookRide}
              className="gap-2"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center mt-2">
            <p>Fixed fare • No surge pricing • Support available 24/7</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideBooking;
