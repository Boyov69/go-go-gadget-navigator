
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { NavItem } from "./navItems";

interface MobileNavigationProps {
  navItems: NavItem[];
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ navItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t shadow-lg"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <Drawer>
        <div className="grid grid-cols-5 h-16">
          {/* Show first 4 most important navigation items */}
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
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
                <Icon 
                  className={cn(
                    "h-4 w-4",
                    location.pathname === item.path && "text-primary"
                  )} 
                  aria-hidden="true"
                />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
          
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
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
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
                      <Icon 
                        className={cn(
                          "h-4 w-4",
                          location.pathname === item.path && "text-primary"
                        )}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNavigation;
