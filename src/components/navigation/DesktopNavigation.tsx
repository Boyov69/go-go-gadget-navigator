
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavItem } from "./navItems";

interface DesktopNavigationProps {
  navItems: NavItem[];
  className?: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ navItems, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
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
  );
};

export default DesktopNavigation;
