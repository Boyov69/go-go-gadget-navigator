
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const RideHistoryTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ride History</CardTitle>
        <CardDescription>Your completed rides</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Yesterday, 18:30</p>
                  <p className="text-sm text-muted-foreground mt-1">Downtown → Airport</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium">$35.50</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Yesterday, 14:15</p>
                  <p className="text-sm text-muted-foreground mt-1">Mall → Residential Area</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium">$18.75</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideHistoryTab;
