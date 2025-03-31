
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';

interface AdminGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  redirectTo?: string;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ 
  children, 
  requiredRole = [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  redirectTo = '/' 
}) => {
  const { user, isLoading, hasRole } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Checking permissions...</p>
          </div>
        </Card>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }
  
  // If user doesn't have required role, redirect
  if (!hasRole(requiredRole)) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // User has appropriate role, render children
  return <>{children}</>;
};

export default AdminGuard;
