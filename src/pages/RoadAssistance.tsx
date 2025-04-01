
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LanguageSelector from "@/components/LanguageSelector";
import GoogleMap from "@/components/GoogleMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, MapPin, Phone, Tool, Truck, Car, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RoadAssistancePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [requestStatus, setRequestStatus] = useState<"idle" | "requesting" | "confirmed">("idle");
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setRequestStatus("requesting");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          setUserLocation(location);
          setRequestStatus("requesting");
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to access your location. Please enable location services.",
            variant: "destructive",
          });
          setRequestStatus("idle");
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };
  
  const handleSubmitRequest = () => {
    setRequestStatus("confirmed");
    toast({
      title: "Assistance Requested",
      description: "Your road assistance request has been confirmed. Help is on the way!",
    });
  };
  
  const serviceTypes = [
    { 
      id: "mechanical",
      name: "Mechanical Issue", 
      icon: Tool,
      description: "Engine troubles, battery problems, flat tire, etc." 
    },
    { 
      id: "towing",
      name: "Towing Service", 
      icon: Truck,
      description: "Vehicle towing to nearest service center" 
    },
    { 
      id: "fuel",
      name: "Fuel Delivery", 
      icon: Car,
      description: "Out of gas? We'll bring fuel to you" 
    },
    { 
      id: "emergency",
      name: "Emergency", 
      icon: AlertTriangle,
      description: "Urgent assistance for critical situations" 
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar}>
          <LanguageSelector />
        </Navbar>
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  Road Assistance
                  <Badge className="bg-red-500 hover:bg-red-600">NEW</Badge>
                </h1>
                <p className="text-muted-foreground">24/7 emergency services when you need them most</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex gap-1">
                  <Phone className="h-4 w-4" />
                  1-800-ROADHELP
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle>Request Road Assistance</CardTitle>
                    <CardDescription>We'll send help to your current location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requestStatus === "confirmed" ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <div className="flex justify-center mb-2">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                          </div>
                          <h3 className="text-lg font-medium text-green-800">Help is on the way!</h3>
                          <p className="text-green-600 mb-2">Expected arrival time: 25 minutes</p>
                          <p className="text-sm text-gray-500">You will receive SMS updates about your assistance status</p>
                        </div>
                      ) : (
                        <>
                          <div>
                            <Tabs defaultValue="mechanical">
                              <TabsList className="w-full grid grid-cols-4">
                                {serviceTypes.map(service => (
                                  <TabsTrigger key={service.id} value={service.id} className="flex flex-col gap-1">
                                    <service.icon className="h-4 w-4" />
                                    <span>{service.name}</span>
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                              
                              {serviceTypes.map(service => (
                                <TabsContent key={service.id} value={service.id}>
                                  <div className="bg-slate-50 p-4 rounded-md mt-2">
                                    <div className="flex items-center gap-2 mb-2">
                                      <service.icon className="h-5 w-5 text-primary" />
                                      <h3 className="font-medium">{service.name}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                                    {userLocation ? (
                                      <div className="flex items-center gap-2 text-sm mb-4">
                                        <MapPin className="h-4 w-4 text-red-500" />
                                        <span>Location detected: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}</span>
                                      </div>
                                    ) : (
                                      <Button 
                                        onClick={handleGetLocation} 
                                        className="mb-4"
                                        variant="outline"
                                        size="sm"
                                      >
                                        <MapPin className="h-4 w-4 mr-2" />
                                        Get My Location
                                      </Button>
                                    )}
                                    <div className="space-y-3">
                                      <div>
                                        <Input placeholder="Vehicle make and model" />
                                      </div>
                                      <div>
                                        <Input placeholder="Additional details (optional)" />
                                      </div>
                                      <Button 
                                        className="w-full bg-red-500 hover:bg-red-600 text-white" 
                                        onClick={handleSubmitRequest}
                                        disabled={!userLocation}
                                      >
                                        Request Assistance Now
                                      </Button>
                                    </div>
                                  </div>
                                </TabsContent>
                              ))}
                            </Tabs>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {userLocation && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Your Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <GoogleMap
                        height="300px"
                        center={userLocation}
                        zoom={15}
                        markers={[
                          {
                            position: userLocation,
                            title: "Your Location"
                          }
                        ]}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div>
                <Card>
                  <CardHeader className="pb-2 bg-red-50">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="h-4 w-4 text-red-500" />
                      Emergency Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Road Assistance Hotline</h4>
                        <p className="text-lg font-bold">1-800-ROADHELP</p>
                        <p className="text-xs text-muted-foreground">Available 24/7</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Police</h4>
                        <p className="text-lg font-bold">911</p>
                        <p className="text-xs text-muted-foreground">For emergencies only</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-1">Customer Support</h4>
                        <p className="text-lg font-bold">1-888-GOGO-HELP</p>
                        <p className="text-xs text-muted-foreground">Mon-Fri: 8am-8pm</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Road Assistance Coverage</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>24/7 emergency assistance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Nationwide coverage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Mechanical issues</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Towing services (up to 100 miles)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Battery jump-start</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Flat tire assistance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Fuel delivery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Lockout services</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RoadAssistancePage;
