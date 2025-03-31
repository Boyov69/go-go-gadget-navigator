
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Check, Info, CarTaxiFront, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TaxiServiceProvider {
  id: string;
  name: string;
  type: "official" | "independent" | "rideshare";
  licenseType: string;
  regions: string[];
  features: string[];
  isVerified: boolean;
}

const BelgianTaxiServices: React.FC = () => {
  const { toast } = useToast();

  // Sample taxi service providers in Belgium
  const serviceProviders: TaxiServiceProvider[] = [
    {
      id: "cabman-1",
      name: "Cabman BCT Official",
      type: "official",
      licenseType: "National Taxi License",
      regions: ["Brussels", "Flanders", "Wallonia"],
      features: ["Fixed rates", "Online payment", "Digital receipts", "24/7 service"],
      isVerified: true
    },
    {
      id: "taxisbleus-2",
      name: "Taxis Bleus",
      type: "official",
      licenseType: "Brussels Regional License",
      regions: ["Brussels Capital Region"],
      features: ["Airport transfers", "Business accounts", "Fixed rates", "Accessible vehicles"],
      isVerified: true
    },
    {
      id: "uber-3",
      name: "Uber",
      type: "rideshare",
      licenseType: "LVC License (Location de Voiture avec Chauffeur)",
      regions: ["Brussels", "Antwerp", "Ghent"],
      features: ["Dynamic pricing", "Driver rating", "Cashless payment"],
      isVerified: true
    },
    {
      id: "victor-cab-4",
      name: "Victor Cab",
      type: "official",
      licenseType: "VVB License",
      regions: ["Flanders", "Antwerp"],
      features: ["Premium vehicles", "Corporate accounts", "Fixed rates"],
      isVerified: true
    },
    {
      id: "dtm-taxi-5",
      name: "DTM Taxi",
      type: "independent",
      licenseType: "Regional Taxi License",
      regions: ["Wallonia", "Liège"],
      features: ["Local knowledge", "Airport service", "24/7 availability"],
      isVerified: true
    }
  ];

  const handleServiceSelect = (provider: TaxiServiceProvider) => {
    toast({
      title: `Selected ${provider.name}`,
      description: `You've selected a ${provider.type} taxi service with a ${provider.licenseType}.`,
      duration: 3000,
    });
  };
  
  const getBadgeVariant = (type: string) => {
    switch(type) {
      case "official": return "default";
      case "independent": return "outline";
      case "rideshare": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CarTaxiFront className="h-5 w-5" />
          Licensed Belgian Taxi Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          <p className="flex items-center gap-1 mb-1">
            <Shield className="h-4 w-4 text-primary" /> 
            All listed services comply with Belgian taxi regulations
          </p>
          <p>Select from official licensed taxi companies, independent drivers with proper certification, or ride-sharing services operating legally in Belgium.</p>
        </div>
        
        <div className="space-y-3">
          {serviceProviders.map((provider) => (
            <Card key={provider.id} className="overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{provider.name}</h3>
                  {provider.isVerified && (
                    <Badge variant={getBadgeVariant(provider.type)}>
                      {provider.type === "official" ? "Official" : 
                       provider.type === "independent" ? "Independent" : "Rideshare"}
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="font-normal">
                  {provider.licenseType}
                </Badge>
              </div>
              <CardContent className="p-4 pt-3">
                <p className="text-xs flex items-center gap-1 mb-2">
                  <Users className="h-3.5 w-3.5" />
                  <span>Operates in: {provider.regions.join(", ")}</span>
                </p>
                <div className="grid grid-cols-2 gap-1 mb-3">
                  {provider.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs">
                      <Check className="h-3 w-3 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => {
                      toast({
                        title: "License Information",
                        description: `${provider.name} operates with ${provider.licenseType} in ${provider.regions.join(", ")}.`,
                        duration: 3000,
                      });
                    }}
                  >
                    <Info className="h-3.5 w-3.5 mr-1" />
                    License Info
                  </Button>
                  <Button 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleServiceSelect(provider)}
                  >
                    Select Provider
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BelgianTaxiServices;
