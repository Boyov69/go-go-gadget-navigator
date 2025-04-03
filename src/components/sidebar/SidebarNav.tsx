
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { baseMenuItems, adminMenuItems, superAdminMenuItems } from "./menu-config";
import { UserRole } from "@/services/auth";

interface SidebarNavProps {
  isOpen: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = React.useMemo(() => {
    let items = [...baseMenuItems];
    
    if (user) {
      if (user.role === UserRole.ADMIN) {
        items = [...items, ...adminMenuItems];
      }
      if (user.role === UserRole.SUPER_ADMIN) {
        items = [...items, ...adminMenuItems, ...superAdminMenuItems];
      }
    }
    
    return items;
  }, [user]);

  return (
    <nav className="flex-1 overflow-y-auto p-2">
      <ul className="space-y-1" role="menu">
        {menuItems.map((item) => (
          <li key={item.label} role="none">
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "hover:bg-accent"
              }`}
              title={item.label}
              role="menuitem"
              aria-current={location.pathname === item.path ? "page" : undefined}
              tabIndex={0}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
