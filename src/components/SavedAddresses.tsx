
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Home, Briefcase, Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type SavedAddress = {
  id: number;
  name: string;
  address: string;
  icon: React.ReactNode;
};

const SavedAddresses: React.FC = () => {
  const { toast } = useToast();
  const savedAddresses: SavedAddress[] = [
    {
      id: 1,
      name: "Home",
      address: "123 Main Street, Amsterdam",
      icon: <Home className="h-4 w-4" />,
    },
    {
      id: 2,
      name: "Work",
      address: "456 Business Avenue, Utrecht",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      id: 3,
      name: "Favorite Cafe",
      address: "789 Café Lane, Rotterdam",
      icon: <Heart className="h-4 w-4" />,
    },
  ];

  const handleSelectAddress = (address: SavedAddress) => {
    toast({
      title: address.name,
      description: `Selected address: ${address.address}`,
      duration: 2000,
    });
  };

  const handleAddNewAddress = () => {
    toast({
      title: "Add Address",
      description: "Add a new favorite address",
      duration: 2000,
    });
  };

  return (
    <Card className="border">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <h3 className="text-lg font-semibold">Saved Addresses</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {savedAddresses.map((address) => (
            <div 
              key={address.id} 
              className="flex items-center p-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
              onClick={() => handleSelectAddress(address)}
            >
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center mr-3">
                {address.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{address.name}</p>
                <p className="text-xs text-muted-foreground">{address.address}</p>
              </div>
              <MapPin className="h-4 w-4 text-primary" />
            </div>
          ))}
          <Button 
            variant="outline" 
            className="w-full mt-2 border-dashed flex items-center gap-2"
            onClick={handleAddNewAddress}
          >
            <Plus className="h-4 w-4" />
            <span>Add New Address</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedAddresses;
