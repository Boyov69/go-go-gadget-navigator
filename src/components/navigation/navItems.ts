
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
  icon: React.ElementType;
  label: string;
  value: string;
  path: string;
}

export const navItems: NavItem[] = [
  {
    icon: Map,
    label: "Home",
    value: "home",
    path: "/"
  },
  {
    icon: Car,
    label: "Rides",
    value: "rides",
    path: "/"
  },
  {
    icon: MapPin,
    label: "Explore",
    value: "explore",
    path: "/explore"
  },
  {
    icon: AlertTriangle,
    label: "Road Help",
    value: "roadhelp",
    path: "/road-assistance"
  },
  {
    icon: Package,
    label: "Cargo",
    value: "cargo",
    path: "/cargo"
  },
  {
    icon: Heart,
    label: "Favorites",
    value: "favorites",
    path: "/favorites"
  },
  {
    icon: Clock,
    label: "Saved",
    value: "saved",
    path: "/saved-trips"
  },
  {
    icon: User,
    label: "Providers",
    value: "providers",
    path: "/suppliers"
  },
  {
    icon: Settings,
    label: "Settings",
    value: "settings",
    path: "/settings"
  }
];
