
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Package, Calendar, MapPin, Truck, Clock, Info, AlertCircle, Zap, Timer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const CargoRequestForm: React.FC = () => {
  const { toast } = useToast();
  const [pickupAddress, setPickupAddress] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("standard");
  const [deliveryType, setDeliveryType] = useState<string>("standard");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupAddress || !deliveryAddress || !date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Cargo Request Submitted",
      description: `Your ${deliveryType} cargo delivery request has been submitted successfully`,
      duration: 3000,
    });
    
    // Reset form
    setPickupAddress("");
    setDeliveryAddress("");
    setDate("");
    setTime("");
    setDescription("");
    setServiceType("standard");
    setDeliveryType("standard");
  };

  const deliveryTypes = [
    {
      id: "standard",
      name: "Standard",
      description: "Delivery within 1-2 business days",
      icon: <Truck className="h-4 w-4" />,
      price: "₴100",
      badge: "bg-blue-100 text-blue-800"
    },
    {
      id: "express",
      name: "Express",
      description: "Same-day delivery",
      icon: <Clock className="h-4 w-4" />,
      price: "₴250",
      badge: "bg-amber-100 text-amber-800"
    },
    {
      id: "urgent",
      name: "Urgent",
      description: "Delivery within 2 hours",
      icon: <Zap className="h-4 w-4" />,
      price: "₴500",
      badge: "bg-red-100 text-red-800"
    },
    {
      id: "scheduled",
      name: "Scheduled",
      description: "Choose specific time window",
      icon: <Timer className="h-4 w-4" />,
      price: "₴150",
      badge: "bg-green-100 text-green-800"
    },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Request Cargo Delivery
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="singleItem">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="singleItem">Single Item</TabsTrigger>
            <TabsTrigger value="multipleItems">Multiple Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="singleItem">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Type Selection */}
              <div className="rounded-md border border-border p-4 space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Zap className="h-5 w-5" /> 
                  Delivery Type
                </h3>
                
                <RadioGroup 
                  value={deliveryType} 
                  onValueChange={setDeliveryType}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {deliveryTypes.map((type) => (
                    <div key={type.id} className="relative">
                      <RadioGroupItem 
                        value={type.id} 
                        id={`delivery-${type.id}`}
                        className="absolute top-4 left-4 z-10"
                      />
                      <Label
                        htmlFor={`delivery-${type.id}`}
                        className={`flex flex-col h-full p-4 rounded-md border-2 ${
                          deliveryType === type.id 
                            ? 'border-primary bg-accent/20' 
                            : 'border-muted hover:border-muted-foreground/50'
                        } cursor-pointer`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {type.icon} 
                            <span className="font-medium">{type.name}</span>
                          </div>
                          <Badge variant="outline" className={type.badge}>{type.price}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{type.description}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Pickup Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pickupAddress"
                    placeholder="Enter pickup address"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Delivery Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="deliveryAddress"
                    placeholder="Enter delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Pickup Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Preferred Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serviceType" className="flex items-center gap-2">
                  <Package className="h-4 w-4" /> Service Type
                </Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Delivery</SelectItem>
                    <SelectItem value="express">Express Delivery</SelectItem>
                    <SelectItem value="temp-controlled">Temperature Controlled</SelectItem>
                    <SelectItem value="fragile">Fragile Items</SelectItem>
                    <SelectItem value="bulky">Bulky Items</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <Info className="h-4 w-4" /> Item Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your cargo (dimensions, weight, special handling requirements)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="bg-accent/30 p-3 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Fields marked with <span className="text-red-500">*</span> are required. Our driver may contact you for additional details about the pickup.</p>
              </div>
              
              <Button type="submit" className="w-full">Request Cargo Pickup</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="multipleItems">
            <div className="p-4 text-center space-y-4">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="font-semibold">Multiple Items</h3>
              <p className="text-muted-foreground">
                For multiple item shipments, please call our customer service at 
                <span className="font-medium"> 1-800-CARGO-123</span> or use our business account portal.
              </p>
              <Button variant="outline">Create Business Account</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CargoRequestForm;
