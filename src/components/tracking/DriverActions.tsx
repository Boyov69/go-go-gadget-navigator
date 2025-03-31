
import React from "react";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DriverActions: React.FC = () => {
  const { toast } = useToast();

  const handleCallDriver = () => {
    toast({
      title: "Calling driver",
      description: "Connecting you with Alex Johnson",
    });
  };

  const handleMessageDriver = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent to the driver",
    });
  };

  const handleShareLocation = () => {
    toast({
      title: "Location shared",
      description: "Your live location is being shared with the driver",
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        className="flex-1 gap-1"
        onClick={handleCallDriver}
      >
        <Phone className="h-4 w-4" />
        Call
      </Button>
      <Button
        variant="secondary"
        className="flex-1 gap-1"
        onClick={handleMessageDriver}
      >
        <MessageSquare className="h-4 w-4" />
        Message
      </Button>
      <Button
        variant="outline"
        className="gap-1"
        onClick={handleShareLocation}
      >
        <MapPin className="h-4 w-4" />
        Share Location
      </Button>
    </div>
  );
};

export default DriverActions;
