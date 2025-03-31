
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { 
  Navigation2, 
  MapPin, 
  Search, 
  Car,
  Clock,
  Building,
  Package,
  Map,
  Train,
  Bike
} from "lucide-react";

const QuickTools: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const tools = [
    { 
      icon: Navigation2, 
      label: "Navigate", 
      color: "bg-blue-100 text-blue-700", 
      action: () => {
        toast({
          title: "Navigation",
          description: "Starting navigation service",
          duration: 2000,
        });
        // Stay on current page, this would normally open the navigation feature
      }
    },
    { 
      icon: Map, 
      label: "Explore Map", 
      color: "bg-green-100 text-green-700", 
      action: () => navigate("/") // Go to home page which has the map
    },
    { 
      icon: MapPin, 
      label: "Saved Places", 
      color: "bg-purple-100 text-purple-700", 
      action: () => {
        toast({
          title: "Saved Places",
          description: "Opening your saved locations",
          duration: 2000,
        });
        navigate("/");
      }
    },
    { 
      icon: Car, 
      label: "Book Ride", 
      color: "bg-amber-100 text-amber-700", 
      action: () => {
        toast({
          title: "Book Ride",
          description: "Opening ride booking service",
          duration: 2000,
        });
        navigate("/");
      }
    },
    { 
      icon: Train, 
      label: "Train", 
      color: "bg-red-100 text-red-700", 
      action: () => {
        toast({
          title: "Train Schedules",
          description: "Checking available train routes",
          duration: 2000,
        });
      }
    },
    { 
      icon: Bike, 
      label: "Bike Rental", 
      color: "bg-teal-100 text-teal-700", 
      action: () => {
        toast({
          title: "Bike Rental",
          description: "Finding available bike rentals nearby",
          duration: 2000,
        });
      }
    },
    { 
      icon: Package, 
      label: "Cargo", 
      color: "bg-orange-100 text-orange-700", 
      to: "/cargo"
    },
    { 
      icon: Building, 
      label: "Providers", 
      color: "bg-sky-100 text-sky-700", 
      to: "/suppliers"
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quick Tools</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {tools.map((tool, index) => (
          tool.to ? (
            <Link to={tool.to} key={index} className="block">
              <Button
                variant="outline"
                className={`h-auto w-full flex-col gap-2 py-4 ${tool.color} hover:opacity-80 transition-all border-2`}
              >
                <tool.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{tool.label}</span>
              </Button>
            </Link>
          ) : (
            <Button
              key={index}
              variant="outline"
              className={`h-auto w-full flex-col gap-2 py-4 ${tool.color} hover:opacity-80 transition-all border-2`}
              onClick={tool.action}
            >
              <tool.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{tool.label}</span>
            </Button>
          )
        ))}
      </div>
    </div>
  );
};

export default QuickTools;
