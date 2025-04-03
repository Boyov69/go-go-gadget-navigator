
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface SidebarFooterProps {
  isOpen: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      duration: 3000,
      role: "status",
    });
    navigate("/");
  };

  return (
    <div className="p-4 border-t">
      <Button 
        variant="outline" 
        className={`w-full flex items-center gap-2 ${!isOpen && "md:p-2 md:justify-center"}`}
        onClick={handleLogout}
        title="Logout"
        aria-label="Logout from your account"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        {isOpen && <span>Logout</span>}
      </Button>
    </div>
  );
};

export default SidebarFooter;
