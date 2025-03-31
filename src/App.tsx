
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Suppliers from "./pages/Suppliers";
import Cargo from "./pages/Cargo";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import AdminGuard from "./components/guards/AdminGuard";
import { UserRole } from "./services/auth";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import NavigatePage from "./pages/Navigate";
import ExplorePage from "./pages/Explore";
import SettingsPage from "./pages/Settings";
import SavedTripsPage from "./pages/SavedTrips";
import FavoritesPage from "./pages/Favorites";
import AdminDashboard from "./pages/AdminDashboard";

// Removed the duplicate QueryClient since it's already in main.tsx
const App = () => (
  <TooltipProvider>
    <AuthProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/navigate" element={<NavigatePage />} />

        {/* User routes */}
        <Route path="/saved-trips" element={<SavedTripsPage />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/cargo" element={<Cargo />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Admin routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminGuard requiredRole={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
              <AdminDashboard />
            </AdminGuard>
          } 
        />

        {/* Super Admin routes */}
        <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
        <Route 
          path="/super-admin/dashboard" 
          element={
            <AdminGuard requiredRole={UserRole.SUPER_ADMIN}>
              <SuperAdminDashboard />
            </AdminGuard>
          } 
        />

        {/* Provider routes */}
        <Route path="/provider" element={<Navigate to="/provider/dashboard" replace />} />
        <Route 
          path="/provider/dashboard" 
          element={
            <AdminGuard requiredRole={UserRole.PROVIDER}>
              <Index />
            </AdminGuard>
          } 
        />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
