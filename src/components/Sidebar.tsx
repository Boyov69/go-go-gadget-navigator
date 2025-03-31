
import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Map, 
  Compass, 
  BookMarked, 
  Settings, 
  Heart, 
  LogOut, 
  Building,
  Package,
  ChevronLeft 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Map, label: "Explore", path: "/explore" },
    { icon: Compass, label: "Navigate", path: "/navigate" },
    { icon: BookMarked, label: "Saved Trips", path: "/saved-trips" },
    { icon: Package, label: "Cargo", path: "/cargo" },
    { icon: Building, label: "Providers", path: "/suppliers" },
    { icon: Heart, label: "Favorites", path: "/favorites" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:sticky md:translate-x-0 md:transition-[width] ${!isOpen && "md:w-16"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header with collapsing button */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className={`flex items-center gap-2 ${!isOpen && "md:hidden"}`}>
              <Map className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Go-Go</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:flex"
              title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <Map className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary text-white"
                        : "hover:bg-accent"
                    }`}
                    title={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t">
            <Button 
              variant="outline" 
              className={`w-full flex items-center gap-2 ${!isOpen && "md:p-2 md:justify-center"}`}
            >
              <LogOut className="h-4 w-4" />
              {isOpen && "Logout"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
