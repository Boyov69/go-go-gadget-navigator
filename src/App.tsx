
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Suppliers from "./pages/Suppliers";
import Cargo from "./pages/Cargo";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Index />} /> {/* Temporary route, will create dedicated page later */}
            <Route path="/navigate" element={<Index />} /> {/* Temporary route, will create dedicated page later */}
            <Route path="/saved-trips" element={<Index />} /> {/* Temporary route, will create dedicated page later */}
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/cargo" element={<Cargo />} />
            <Route path="/favorites" element={<Index />} /> {/* Temporary route, will create dedicated page later */}
            <Route path="/settings" element={<Index />} /> {/* Temporary route, will create dedicated page later */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
