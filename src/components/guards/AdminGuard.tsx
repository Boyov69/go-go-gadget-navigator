
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserRole } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

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
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-red-100 p-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-red-600"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have the necessary permissions to access this page.
              {Array.isArray(requiredRole) 
                ? ` This page requires one of these roles: ${requiredRole.join(", ")}.` 
                : ` This page requires the ${requiredRole} role.`
              }
            </p>
            <div className="flex gap-4 mt-4">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button onClick={() => window.location.href = redirectTo}>
                Go to Home
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  
  // User has appropriate role, render children
  return <>{children}</>;
};

export default AdminGuard;
