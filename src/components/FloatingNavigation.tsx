
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";
import { navItems } from "./navigation/navItems";

interface FloatingNavigationProps {
  className?: string;
}

const FloatingNavigation: React.FC<FloatingNavigationProps> = ({ className }) => {
  return (
    <>
      <DesktopNavigation navItems={navItems} className={className} />
      <MobileNavigation navItems={navItems} />
    </>
  );
};

export default FloatingNavigation;
