
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import SupplierEarningsCards from "./supplier/SupplierEarningsCards";
import UpcomingRidesTab from "./supplier/UpcomingRidesTab";
import RideHistoryTab from "./supplier/RideHistoryTab";
import AccountSettingsTab from "./supplier/AccountSettingsTab";

const SupplierDashboard: React.FC = () => {
  const { toast } = useToast();

  // Mock data
  const upcomingRides = [
    { id: 1, pickup: "Central Station", destination: "Airport", time: "14:30", fare: 24.50 },
    { id: 2, pickup: "Shopping Mall", destination: "Business Center", time: "16:15", fare: 18.75 },
    { id: 3, pickup: "Riverside Park", destination: "Conference Hall", time: "17:45", fare: 32.20 }
  ];

  const earnings = {
    today: 142.50,
    week: 876.25,
    month: 3245.80
  };

  const handleAcceptRide = (rideId: number) => {
    toast({
      title: "Ride Accepted",
      description: `You've accepted ride #${rideId}`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <SupplierEarningsCards earnings={earnings} />
      
      <Tabs defaultValue="upcoming">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="upcoming">Upcoming Rides</TabsTrigger>
          <TabsTrigger value="history">Ride History</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <UpcomingRidesTab rides={upcomingRides} onAcceptRide={handleAcceptRide} />
        </TabsContent>
        
        <TabsContent value="history">
          <RideHistoryTab />
        </TabsContent>
        
        <TabsContent value="account">
          <AccountSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDashboard;
