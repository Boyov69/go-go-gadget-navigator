
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const UserLoginSection: React.FC = () => {
  const { login, logout, user } = useAuth();
  const { t } = useLanguage();
  
  const loginAsSuperAdmin = async () => {
    const success = await login("superadmin@example.com", "password123");
    
    if (success) {
      toast({
        title: "Logged in as Super Admin",
        description: "You now have access to the Super Admin Dashboard",
        role: "status", // Add ARIA role for screen readers
      });
    }
  };
  
  const loginAsAdmin = async () => {
    const success = await login("admin@example.com", "password123");
    
    if (success) {
      toast({
        title: "Logged in as Admin",
        description: "You now have access to the Admin Dashboard",
        role: "status", // Add ARIA role for screen readers
      });
    }
  };
  
  const loginAsUser = async () => {
    const success = await login("user@example.com", "password123");
    
    if (success) {
      toast({
        title: "Logged in as Regular User",
        description: "Welcome back!",
        role: "status", // Add ARIA role for screen readers
      });
    }
  };

  if (!user) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("auth.login")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-muted-foreground" id="demo-login-description">
            For demonstration purposes only. Click below to login as different user types.
          </p>
          <div 
            className="flex flex-wrap gap-2" 
            role="group" 
            aria-labelledby="demo-login-description"
          >
            <Button 
              onClick={loginAsSuperAdmin} 
              className="bg-purple-700 hover:bg-purple-800"
              aria-label={t("auth.loginAsSuperAdmin")}
            >
              {t("auth.loginAsSuperAdmin")}
            </Button>
            <Button 
              onClick={loginAsAdmin} 
              className="bg-blue-600 hover:bg-blue-700"
              aria-label={t("auth.loginAsAdmin")}
            >
              {t("auth.loginAsAdmin")}
            </Button>
            <Button 
              onClick={loginAsUser} 
              variant="outline"
              aria-label={t("auth.loginAsUser")}
            >
              {t("auth.loginAsUser")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden="true"></span>
          <span aria-live="polite">{t("auth.loggedInAs")} {user.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              <span className="sr-only">User role:</span>
              Role: {user.role}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="sr-only">User email:</span>
              Email: {user.email}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={logout}
            aria-label={t("nav.logout")}
          >
            {t("nav.logout")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserLoginSection;
