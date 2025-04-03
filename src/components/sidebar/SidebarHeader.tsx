
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, ChevronLeft } from "lucide-react";

interface SidebarHeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <Link 
        to="/" 
        className={`flex items-center gap-2 ${!isOpen && "md:hidden"}`}
        aria-label="Go to home page"
      >
        <Map className="h-6 w-6 text-primary" aria-hidden="true" />
        <span className="text-lg font-bold">Go-Go</span>
      </Link>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="md:flex"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" aria-hidden="true" /> : <Map className="h-4 w-4" aria-hidden="true" />}
      </Button>
    </div>
  );
};

export default SidebarHeader;
