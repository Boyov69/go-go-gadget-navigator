
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  MapPin,
  Car, 
  Clock, 
  User,
  Settings,
  Heart,
  Package,
  Map,
  AlertTriangle
} from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  path: string;
}

const FloatingNavigation: React.FC<{className?: string}> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      icon: <Map className="h-4 w-4" />,
      label: "Home",
      value: "home",
      path: "/"
    },
    {
      icon: <Car className="h-4 w-4" />,
      label: "Rides",
      value: "rides",
      path: "/"
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Explore",
      value: "explore",
      path: "/explore"
    },
    {
      icon: <AlertTriangle className="h-4 w-4" />,
      label: "Road Help",
      value: "roadhelp",
      path: "/road-assistance"
    },
    {
      icon: <Package className="h-4 w-4" />,
      label: "Cargo",
      value: "cargo",
      path: "/cargo"
    },
    {
      icon: <Heart className="h-4 w-4" />,
      label: "Favorites",
      value: "favorites",
      path: "/favorites"
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: "Saved",
      value: "saved",
      path: "/saved-trips"
    },
    {
      icon: <User className="h-4 w-4" />,
      label: "Providers",
      value: "providers",
      path: "/suppliers"
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
      value: "settings",
      path: "/settings"
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <>
      {/* Desktop navigation - side floating panel */}
      <div 
        className={cn(
          "fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col",
          className
        )}
        role="navigation"
        aria-label="Quick navigation"
      >
        <div className="bg-background/95 backdrop-blur-sm shadow-lg rounded-lg border p-2 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant="ghost"
              size="icon"
              onClick={() => handleNavigate(item.path)}
              title={item.label}
              aria-label={item.label}
              className={cn(
                "rounded-full h-10 w-10 flex items-center justify-center",
                location.pathname === item.path && "bg-primary/10"
              )}
            >
              {React.isValidElement(item.icon) ? 
                React.cloneElement(item.icon as React.ReactElement, { 
                  'aria-hidden': true,
                  className: cn(
                    item.icon.props.className,
                    location.pathname === item.path && "text-primary"
                  )
                }) : 
                item.icon
              }
              <span className="sr-only">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Mobile navigation - bottom bar */}
      <div 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t shadow-lg"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <Drawer>
          <div className="grid grid-cols-5 h-16">
            {/* Show first 4 most important navigation items */}
            {navItems.slice(0, 4).map((item) => (
              <Button
                key={item.value}
                variant="ghost"
                onClick={() => handleNavigate(item.path)}
                className={cn(
                  "h-full rounded-none flex flex-col gap-1 items-center justify-center",
                  location.pathname === item.path && "bg-primary/10"
                )}
                aria-label={item.label}
              >
                {React.isValidElement(item.icon) ? 
                  React.cloneElement(item.icon as React.ReactElement, { 
                    'aria-hidden': true,
                    className: cn(
                      item.icon.props.className,
                      location.pathname === item.path && "text-primary"
                    )
                  }) : 
                  item.icon
                }
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
            
            {/* More button opens drawer with all options */}
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-full rounded-none flex flex-col gap-1 items-center justify-center"
                aria-label="Show more navigation options"
                aria-haspopup="dialog"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="2" cy="8" r="2" fill="currentColor" />
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                  <circle cx="14" cy="8" r="2" fill="currentColor" />
                </svg>
                <span className="text-xs">More</span>
              </Button>
            </DrawerTrigger>
          </div>
          
          <DrawerContent className="max-h-[50vh]" role="dialog" aria-label="Navigation options">
            <ScrollArea className="h-full max-h-[calc(50vh-2rem)] p-4">
              <div className="grid grid-cols-4 gap-4 p-4" role="menu">
                {navItems.map((item) => (
                  <Button
                    key={item.value}
                    variant="ghost"
                    onClick={() => handleNavigate(item.path)}
                    className={cn(
                      "flex flex-col gap-2 h-auto py-4 items-center justify-center",
                      location.pathname === item.path && "bg-primary/10"
                    )}
                    role="menuitem"
                    aria-label={item.label}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center",
                      location.pathname === item.path && "bg-primary/20"
                    )}>
                      {React.isValidElement(item.icon) ? 
                        React.cloneElement(item.icon as React.ReactElement, { 
                          'aria-hidden': true,
                          className: cn(
                            item.icon.props.className,
                            location.pathname === item.path && "text-primary"
                          )
                        }) : 
                        item.icon
                      }
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
