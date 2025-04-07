
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import AdminGuard from "./components/guards/AdminGuard";
import { UserRole } from "./services/auth";
import { NavigationModeProvider } from "./contexts/NavigationModeContext";

// Lazy-load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Suppliers = lazy(() => import("./pages/Suppliers"));
const Cargo = lazy(() => import("./pages/Cargo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SuperAdminDashboard = lazy(() => import("./pages/SuperAdminDashboard"));
const NavigatePage = lazy(() => import("./pages/Navigate"));
const ExplorePage = lazy(() => import("./pages/Explore"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const SavedTripsPage = lazy(() => import("./pages/SavedTrips"));
const FavoritesPage = lazy(() => import("./pages/Favorites"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const RoadAssistancePage = lazy(() => import("./pages/RoadAssistance"));
const PublicTransportPage = lazy(() => import("./pages/PublicTransport"));
const AIConfiguratorPage = lazy(() => import("./pages/AIConfigurator"));
const AIAssistantAdminPage = lazy(() => import("./pages/AIAssistantAdmin"));

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <TooltipProvider>
      <AuthProvider>
        <NavigationModeProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/navigate" element={<NavigatePage />} />
              <Route path="/road-assistance" element={<RoadAssistancePage />} />
              <Route path="/public-transport" element={<PublicTransportPage />} />

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
              <Route 
                path="/admin/ai-assistant" 
                element={<AIAssistantAdminPage />} 
              />
              <Route 
                path="/admin/ai-config" 
                element={<AIConfiguratorPage />} 
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
          </Suspense>
        </NavigationModeProvider>
      </AuthProvider>
    </TooltipProvider>
  );
};

export default App;
