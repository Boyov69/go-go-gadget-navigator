
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  DollarSign, 
  Car, 
  Star, 
  Map, 
  User, 
  Bell
} from "lucide-react";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Today's Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-2xl font-bold">${earnings.today.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-2xl font-bold">${earnings.week.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-2xl font-bold">${earnings.month.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="upcoming">Upcoming Rides</TabsTrigger>
          <TabsTrigger value="history">Ride History</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Rides</CardTitle>
              <CardDescription>Rides assigned to you or available for accepting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingRides.map(ride => (
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
                        onClick={() => handleAcceptRide(ride.id)}
                      >
                        Accept Ride
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
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
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your provider account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-accent/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <h3 className="font-medium">Profile Details</h3>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Update
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      <h3 className="font-medium">Vehicle Information</h3>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Manage
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <h3 className="font-medium">Payment Methods</h3>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Configure
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="destructive" size="sm">Deactivate Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDashboard;
