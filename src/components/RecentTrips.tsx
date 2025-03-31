
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

const RecentTrips: React.FC = () => {
  const trips = [
    {
      id: 1,
      destination: "Amsterdam City Center",
      date: "Yesterday",
      time: "15:30",
      color: "border-teal-500",
      icon: "🚗"
    },
    {
      id: 2,
      destination: "Rotterdam Central Station",
      date: "Sep 21",
      time: "09:15",
      color: "border-blue-500",
      icon: "🚆"
    },
    {
      id: 3,
      destination: "Utrecht University",
      date: "Sep 18",
      time: "14:45",
      color: "border-teal-500",
      icon: "🚌"
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Recent Trips</h2>
      </div>

      <div className="space-y-3">
        {trips.map((trip) => (
          <Card key={trip.id} className="hover:bg-accent/50 transition-colors">
            <CardContent className="p-4 flex items-center">
              <div className="mr-4 h-10 w-10 flex items-center justify-center rounded-full bg-accent">
                <span className="text-lg">{trip.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{trip.destination}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{trip.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{trip.time}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-primary/10 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </button>
            </CardContent>
          </Card>
        ))}

        <Card className="border border-dashed hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center justify-center py-6">
            <span className="text-sm text-muted-foreground hover:text-primary">
              View trip history
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecentTrips;
