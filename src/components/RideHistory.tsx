
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Car } from "lucide-react";

type RideRecord = {
  id: number;
  date: string;
  time: string;
  from: string;
  to: string;
  price: number;
  vehicleType: string;
  driverRating?: number;
};

const RideHistory: React.FC = () => {
  const rides: RideRecord[] = [
    {
      id: 1,
      date: "Today",
      time: "14:30",
      from: "Home",
      to: "Utrecht University",
      price: 18.50,
      vehicleType: "Comfort",
      driverRating: 5,
    },
    {
      id: 2,
      date: "Yesterday",
      time: "09:15",
      from: "Work",
      to: "Rotterdam Central Station",
      price: 25.75,
      vehicleType: "Business",
      driverRating: 4,
    },
    {
      id: 3,
      date: "Sep 21",
      time: "16:45",
      from: "Amsterdam City Center",
      to: "Home",
      price: 12.30,
      vehicleType: "Economy",
      driverRating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <Card className="border">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Ride History</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rides.map((ride) => (
            <div key={ride.id} className="border rounded-md p-3 hover:bg-accent/30 cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{ride.date}</span>
                    <Clock className="h-3.5 w-3.5 ml-2" />
                    <span>{ride.time}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm">{ride.from}</span>
                    </div>
                    <div className="h-6 border-l border-dashed border-gray-300 ml-1.5"></div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      <span className="text-sm">{ride.to}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Car className="h-3.5 w-3.5" />
                    <span>{ride.vehicleType}</span>
                  </div>
                  <p className="font-semibold mt-1">${ride.price.toFixed(2)}</p>
                  {ride.driverRating && (
                    <p className="text-xs text-amber-500 mt-1">
                      {renderStars(ride.driverRating)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <button className="text-sm text-primary text-center w-full mt-2">
            View All Trips
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideHistory;
