
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import QuickTools from "@/components/QuickTools";
import PlanTripCard from "@/components/PlanTripCard";
import RideBooking from "@/components/RideBooking";
import SavedAddresses from "@/components/SavedAddresses";
import RideHistory from "@/components/RideHistory";
import EmergencyButton from "@/components/EmergencyButton";
import GoogleMap from "@/components/GoogleMap";
import LocalTransportInfo from "@/components/LocalTransportInfo";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GlobalCoverage from "@/components/GlobalCoverage";
import LanguageSelector from "@/components/LanguageSelector";
import DriverRating from "@/components/driver/DriverRating";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Index: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { login, logout, user } = useAuth();
  const { t } = useLanguage();
  
  // Sample locations for the map - Belgian cities
  const popularLocations = [
    { position: { lat: 50.8503, lng: 4.3517 }, title: "Brussels" },
    { position: { lat: 51.2194, lng: 4.4025 }, title: "Antwerp" },
    { position: { lat: 51.0543, lng: 3.7174 }, title: "Ghent" },
    { position: { lat: 50.6326, lng: 5.5797 }, title: "Liège" },
    { position: { lat: 51.3097, lng: 3.2340 }, title: "Bruges" },
  ];
  
  // Sample driver reviews
  const driverReviews = [
    {
      id: "rev1",
      userName: "Jane Cooper",
      rating: 5,
      comment: "Really professional driver, car was clean and trip was smooth.",
      date: "Oct 10, 2023"
    },
    {
      id: "rev2",
      userName: "Alex Morgan",
      rating: 4,
      comment: "Good service, arrived on time. Would use again.",
      date: "Sep 5, 2023"
    },
    {
      id: "rev3",
      userName: "Sam Wilson",
      rating: 5,
      comment: "Outstanding service! The driver was very helpful with my luggage.",
      date: "Aug 22, 2023"
    }
  ];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Test login functions for different user roles
  const loginAsSuperAdmin = async () => {
    const success = await login("superadmin@example.com", "password123");
    
    if (success) {
      toast({
        title: "Logged in as Super Admin",
        description: "You now have access to the Super Admin Dashboard",
      });
    }
  };
  
  const loginAsAdmin = async () => {
    const success = await login("admin@example.com", "password123");
    
    if (success) {
      toast({
        title: "Logged in as Admin",
        description: "You now have access to the Admin Dashboard",
      });
    }
  };
  
  const loginAsUser = async () => {
    const success = await login("user@example.com", "password123");
    
    if (success) {
      toast({
        title: "Logged in as Regular User",
        description: "Welcome back!",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar}>
          <LanguageSelector />
        </Navbar>
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8 pb-20 md:pb-6">
          {/* Quick Tools at the top - more visible */}
          <div className="mb-6">
            <QuickTools />
          </div>

          {/* Test login section - Only shown when not logged in */}
          {!user && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t("auth.login")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">
                  For demonstration purposes only. Click below to login as different user types.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={loginAsSuperAdmin} className="bg-purple-700 hover:bg-purple-800">
                    {t("auth.loginAsSuperAdmin")}
                  </Button>
                  <Button onClick={loginAsAdmin} className="bg-blue-600 hover:bg-blue-700">
                    {t("auth.loginAsAdmin")}
                  </Button>
                  <Button onClick={loginAsUser} variant="outline">
                    {t("auth.loginAsUser")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* User info card - Only shown when logged in */}
          {user && (
            <Card className="mb-6 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  {t("auth.loggedInAs")} {user.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                    <p className="text-sm text-muted-foreground">Email: {user.email}</p>
                  </div>
                  <Button variant="outline" onClick={logout}>
                    {t("nav.logout")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column */}
            <div className="lg:col-span-3 space-y-6">
              <SavedAddresses />
              <RideHistory />
              <GlobalCoverage />
            </div>
            
            {/* Center column with map - largest component */}
            <div className="lg:col-span-6 space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{t("home.exploreBelgium")}</CardTitle>
                </CardHeader>
                <GoogleMap 
                  markers={popularLocations}
                  height="500px"
                  center={{ lat: 50.8503, lng: 4.3517 }}
                  zoom={8}
                />
              </Card>
              
              <LocalTransportInfo />
              
              <DriverRating
                driverName="Michael Johnson"
                driverRating={4.8}
                totalReviews={124}
                reviews={driverReviews}
              />
            </div>
            
            {/* Right column */}
            <div className="lg:col-span-3 space-y-6">
              <PlanTripCard />
              <RideBooking />
            </div>
          </div>
        </main>
        
        <EmergencyButton />
      </div>
    </div>
  );
};

export default Index;

