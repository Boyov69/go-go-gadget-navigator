import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Suppliers from "./pages/Suppliers";
import Cargo from "./pages/Cargo";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import AdminGuard from "./components/guards/AdminGuard";
import { UserRole } from "./services/auth";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Index />} />
            <Route path="/navigate" element={<Index />} />

            {/* User routes */}
            <Route path="/saved-trips" element={<Index />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/cargo" element={<Cargo />} />
            <Route path="/favorites" element={<Index />} />
            <Route path="/settings" element={<Index />} />

            {/* Admin routes */}
            <Route 
              path="/admin/*" 
              element={
                <AdminGuard requiredRole={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
                  {/* We'll create the admin components later */}
                  <Navigate to="/admin/dashboard" replace />
                </AdminGuard>
              } 
            />

            {/* Super Admin routes */}
            <Route 
              path="/super-admin/*" 
              element={
                <AdminGuard requiredRole={UserRole.SUPER_ADMIN}>
                  {/* We'll create the super admin components later */}
                  <Navigate to="/super-admin/dashboard" replace />
                </AdminGuard>
              } 
            />

            {/* Provider routes */}
            <Route 
              path="/provider/*" 
              element={
                <AdminGuard requiredRole={UserRole.PROVIDER}>
                  {/* We'll create the provider components later */}
                  <Navigate to="/provider/dashboard" replace />
                </AdminGuard>
              } 
            />

            {/* Super Admin Dashboard */}
            <Route 
              path="/super-admin/dashboard" 
              element={
                <AdminGuard requiredRole={UserRole.SUPER_ADMIN}>
                  <SuperAdminDashboard />
                </AdminGuard>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
