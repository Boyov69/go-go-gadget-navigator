
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Package, Truck, Scale, Ruler, Calculator } from "lucide-react";

const CargoCalculator: React.FC = () => {
  const { toast } = useToast();
  const [weight, setWeight] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("van");
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  
  const calculateVolume = (): number => {
    return (parseFloat(length) || 0) * (parseFloat(width) || 0) * (parseFloat(height) || 0);
  };
  
  const handleCalculate = () => {
    // Simple calculation formula for demonstration
    // Real-world apps would use more complex algorithms based on many factors
    const weightValue = parseFloat(weight) || 0;
    const distanceValue = parseFloat(distance) || 0;
    const volumeValue = calculateVolume();
    
    let baseRate = 0;
    switch(vehicleType) {
      case "van":
        baseRate = 5;
        break;
      case "truck":
        baseRate = 8;
        break;
      case "refrigerated":
        baseRate = 12;
        break;
      default:
        baseRate = 5;
    }
    
    const cost = (weightValue * 0.5) + (distanceValue * baseRate) + (volumeValue * 0.01);
    setEstimatedCost(parseFloat(cost.toFixed(2)));
    
    toast({
      title: "Cost Estimated",
      description: `The estimated cost for your cargo delivery is $${cost.toFixed(2)}`,
      duration: 3000,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Cargo Cost Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight" className="flex items-center gap-2">
                <Scale className="h-4 w-4" /> Weight (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="distance" className="flex items-center gap-2">
                <Ruler className="h-4 w-4" /> Distance (km)
              </Label>
              <Input
                id="distance"
                type="number"
                placeholder="Enter distance in km"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length (cm)</Label>
              <Input
                id="length"
                type="number"
                placeholder="Length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="width">Width (cm)</Label>
              <Input
                id="width"
                type="number"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicleType" className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Vehicle Type
            </Label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="van">Delivery Van</SelectItem>
                <SelectItem value="truck">Light Truck</SelectItem>
                <SelectItem value="refrigerated">Refrigerated Van</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleCalculate} className="w-full">Calculate Cost</Button>
          
          {estimatedCost !== null && (
            <div className="mt-4 p-4 bg-accent/50 rounded-lg">
              <p className="text-center font-semibold">Estimated Cost</p>
              <p className="text-2xl text-center font-bold">${estimatedCost}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoCalculator;
