
import { 
  Home, 
  Map, 
  Compass, 
  BookMarked, 
  Settings, 
  Heart, 
  Building,
  Package,
  Train,
  LayoutDashboard,
  Crown
} from "lucide-react";
import { UserRole } from "@/services/auth";

export const baseMenuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Map, label: "Explore", path: "/explore" },
  { icon: Compass, label: "Navigate", path: "/navigate" },
  { icon: Train, label: "Public Transport", path: "/public-transport" },
  { icon: BookMarked, label: "Saved Trips", path: "/saved-trips" },
  { icon: Package, label: "Cargo", path: "/cargo" },
  { icon: Building, label: "Providers", path: "/suppliers" },
  { icon: Heart, label: "Favorites", path: "/favorites" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const adminMenuItems = [
  { icon: LayoutDashboard, label: "Admin Dashboard", path: "/admin/dashboard" },
];

export const superAdminMenuItems = [
  { icon: Crown, label: "Super Admin Dashboard", path: "/super-admin/dashboard" },
];

