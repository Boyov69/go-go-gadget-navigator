
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

const PlanTripCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Plan Your Next Trip</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
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
                placeholder="To: Destination" 
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Departure: Now" 
                className="pl-8"
              />
            </div>
          </div>
          <Button className="w-full gap-2">
            Find Route <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanTripCard;
