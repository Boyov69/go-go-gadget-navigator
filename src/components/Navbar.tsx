
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Map, Menu, ChevronRight } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="lg:hidden"
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="flex items-center gap-2">
            <Map className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary hidden sm:inline">Go-Go</span>
            <span className="text-xl font-light hidden md:inline">Navigator</span>
          </a>
        </div>
        
        <div className="hidden md:flex items-center w-full max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search destinations..."
              className="w-full pl-8 bg-background"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Help
          </Button>
          <Button size="sm">Plan a Trip</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
