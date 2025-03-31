
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin,
  Car, 
  Clock, 
  User,
  Settings,
  Heart,
  Package,
  Map
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  action: () => void;
}

const FloatingNavigation: React.FC<{className?: string}> = ({ className }) => {
  const navigate = useNavigate();
  
  const navItems: NavItem[] = [
    {
      icon: <Map className="h-4 w-4" />,
      label: "Home",
      value: "home",
      action: () => navigate("/")
    },
    {
      icon: <Car className="h-4 w-4" />,
      label: "Rides",
      value: "rides",
      action: () => navigate("/")
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Explore",
      value: "explore",
      action: () => navigate("/explore")
    },
    {
      icon: <Package className="h-4 w-4" />,
      label: "Cargo",
      value: "cargo",
      action: () => navigate("/cargo")
    },
    {
      icon: <Heart className="h-4 w-4" />,
      label: "Favorites",
      value: "favorites",
      action: () => navigate("/favorites")
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: "Saved",
      value: "saved",
      action: () => navigate("/saved-trips")
    },
    {
      icon: <User className="h-4 w-4" />,
      label: "Providers",
      value: "providers",
      action: () => navigate("/suppliers")
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      value: "settings",
      action: () => navigate("/settings")
    }
  ];

  // On desktop: show a vertical navigation
  // On mobile: show a bottom navigation bar with a drawer for more options
  
  return (
    <>
      {/* Desktop navigation - side floating panel */}
      <div className={cn(
        "fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col",
        className
      )}>
        <div className="bg-background/95 backdrop-blur-sm shadow-lg rounded-lg border p-2 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant="ghost"
              size="icon"
              onClick={item.action}
              title={item.label}
              className="rounded-full h-10 w-10 flex items-center justify-center"
            >
              {item.icon}
              <span className="sr-only">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Mobile navigation - bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t shadow-lg">
        <Drawer>
          <div className="grid grid-cols-5 h-16">
            {/* Show first 4 most important navigation items */}
            {navItems.slice(0, 4).map((item) => (
              <Button
                key={item.value}
                variant="ghost"
                onClick={item.action}
                className="h-full rounded-none flex flex-col gap-1 items-center justify-center"
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
            
            {/* More button opens drawer with all options */}
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-full rounded-none flex flex-col gap-1 items-center justify-center"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2" cy="8" r="2" fill="currentColor" />
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                  <circle cx="14" cy="8" r="2" fill="currentColor" />
                </svg>
                <span className="text-xs">More</span>
              </Button>
            </DrawerTrigger>
          </div>
          
          <DrawerContent className="max-h-[50vh]">
            <ScrollArea className="h-full max-h-[calc(50vh-2rem)] p-4">
              <div className="grid grid-cols-4 gap-4 p-4">
                {navItems.map((item) => (
                  <Button
                    key={item.value}
                    variant="ghost"
                    onClick={item.action}
                    className="flex flex-col gap-2 h-auto py-4 items-center justify-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default FloatingNavigation;
