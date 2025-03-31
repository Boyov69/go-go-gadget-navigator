
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface Ride {
  id: number;
  pickup: string;
  destination: string;
  time: string;
  fare: number;
}

interface UpcomingRidesTabProps {
  rides: Ride[];
  onAcceptRide: (rideId: number) => void;
}

const UpcomingRidesTab: React.FC<UpcomingRidesTabProps> = ({ rides, onAcceptRide }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Rides</CardTitle>
        <CardDescription>Rides assigned to you or available for accepting</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rides.map(ride => (
            <Card key={ride.id} className="bg-accent/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> {ride.time}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium">From:</span> {ride.pickup}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">To:</span> {ride.destination}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      ${ride.fare.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => onAcceptRide(ride.id)}
                >
                  Accept Ride
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingRidesTab;
