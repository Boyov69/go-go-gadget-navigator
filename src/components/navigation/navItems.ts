
import React from "react";
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

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  path: string;
}

export const navItems: NavItem[] = [
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
