
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, Clock, ThermometerSnowflake, AlertTriangle } from "lucide-react";

const CargoServiceTypes: React.FC = () => {
  const serviceTypes = [
    {
      icon: <Truck className="h-5 w-5 text-blue-500" />,
      title: "Standard Delivery",
      description: "Regular cargo delivery service for packages up to 500kg",
      timeframe: "1-2 business days",
      color: "border-l-4 border-blue-500",
    },
    {
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      title: "Express Delivery",
      description: "Same-day delivery for urgent shipments",
      timeframe: "2-6 hours",
      color: "border-l-4 border-amber-500",
    },
    {
      icon: <ThermometerSnowflake className="h-5 w-5 text-cyan-500" />,
      title: "Temperature-Controlled",
      description: "For goods requiring specific temperature conditions",
      timeframe: "1-2 business days",
      color: "border-l-4 border-cyan-500",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      title: "Fragile Items",
      description: "Special handling for delicate or fragile goods",
      timeframe: "1-3 business days",
      color: "border-l-4 border-red-500",
    },
    {
      icon: <Package className="h-5 w-5 text-green-500" />,
      title: "Bulky Items",
      description: "For oversized items that require special handling",
      timeframe: "2-4 business days",
      color: "border-l-4 border-green-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Service Types
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {serviceTypes.map((service, index) => (
            <div
              key={index}
              className={`p-4 bg-accent/30 rounded-md ${service.color}`}
            >
              <div className="flex items-center gap-3 mb-2">
                {service.icon}
                <h3 className="font-medium">{service.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="mt-2 text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{service.timeframe}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoServiceTypes;
