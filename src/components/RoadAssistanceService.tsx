
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Phone, Wrench, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const RoadAssistanceService: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleRequestAssistance = () => {
    // Navigate to the dedicated road assistance page
    navigate("/road-assistance");
  };

  const services = [
    { icon: Wrench, name: "Mechanical" },
    { icon: Truck, name: "Towing" },
    { icon: AlertTriangle, name: "Emergency" },
  ];

  return (
    <Card className="border-2 border-red-500 shadow-lg">
      <CardHeader className="pb-2 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">24/7 Road Assistance</CardTitle>
          <Badge className="bg-white text-red-600 hover:bg-gray-100">NEW</Badge>
        </div>
        <CardDescription className="text-red-100">
          Fast help when you need it most
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-2 bg-red-50 rounded-md text-center"
            >
              <service.icon className="h-5 w-5 text-red-600 mb-1" />
              <span className="text-xs font-medium">{service.name}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 mb-2 text-sm">
          <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
          <span className="text-gray-600">
            Get assistance at your current location
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-red-500 flex-shrink-0" />
          <span className="text-gray-600">Emergency hotline: <strong>1-800-ROADHELP</strong></span>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-1">
        <Button
          className="w-full bg-red-500 hover:bg-red-600 text-white"
          onClick={handleRequestAssistance}
        >
          Request Assistance Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoadAssistanceService;
