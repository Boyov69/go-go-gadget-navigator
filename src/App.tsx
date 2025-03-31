
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30 * 1000,
    },
  },
});

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
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminGuard requiredRole={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
                  {/* Redirect to super admin dashboard if they have those permissions */}
                  <Navigate to="/super-admin/dashboard" replace />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
