
import React from 'react';
import { useAuth as useAuthContext } from '@/contexts/AuthContext';
import { UserRole } from '@/services/auth';

// Extended auth hook with role checking
export const useAuth = () => {
  const auth = useAuthContext();
  
  // Check if user has any of the specified roles
  const hasRole = React.useCallback((roles: UserRole | UserRole[]) => {
    if (!auth.user) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(auth.user.role);
    }
    
    return auth.user.role === roles;
  }, [auth.user]);
  
  // Check if user has super admin role
  const isSuperAdmin = React.useCallback(() => {
    return hasRole(UserRole.SUPER_ADMIN);
  }, [hasRole]);
  
  // Check if user has admin role (includes both super admin and regular admin)
  const isAdmin = React.useCallback(() => {
    return hasRole([UserRole.SUPER_ADMIN, UserRole.ADMIN]);
  }, [hasRole]);
  
  // Check if user has provider role
  const isProvider = React.useCallback(() => {
    return hasRole(UserRole.PROVIDER);
  }, [hasRole]);
  
  // Check if user has any of the specified permissions
  const hasPermission = React.useCallback((permission: string | string[]) => {
    if (!auth.user || !auth.user.permissions) return false;
    
    if (Array.isArray(permission)) {
      return permission.some(p => auth.user!.permissions!.includes(p));
    }
    
    return auth.user.permissions.includes(permission);
  }, [auth.user]);

  return {
    ...auth,
    hasRole,
    hasPermission,
    isSuperAdmin,
    isAdmin,
    isProvider
  };
};

// AuthGuard component to protect routes based on roles
interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  allowedRoles = [], 
  fallback = <div className="p-4">You don't have permission to access this page.</div>
}) => {
  const { user, hasRole } = useAuth();
  
  // If no roles specified, just check if user is logged in
  if (allowedRoles.length === 0) {
    return user ? <>{children}</> : <>{fallback}</>;
  }
  
  // Check if user has any of the allowed roles
  return hasRole(allowedRoles) ? <>{children}</> : <>{fallback}</>;
};
