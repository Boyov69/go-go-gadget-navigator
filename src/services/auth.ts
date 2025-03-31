
import { toast } from "@/components/ui/use-toast";
import apiService from "./api";

// User roles enum
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  PROVIDER = "provider",
  REGISTERED_USER = "registered_user",
  VISITOR = "visitor"
}

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  permissions?: string[];
}

// Authentication service
const authService = {
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('authToken') !== null;
  },
  
  // Check if user has specific role
  hasRole: (role: UserRole | UserRole[]): boolean => {
    const user = authService.getCurrentUserSync();
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  },
  
  // Check if user has specific permission
  hasPermission: (permission: string): boolean => {
    const user = authService.getCurrentUserSync();
    if (!user || !user.permissions) return false;
    
    return user.permissions.includes(permission);
  },
  
  // Get the current user synchronously (from localStorage)
  getCurrentUserSync: (): User | null => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (error) {
      console.error("Error getting current user from storage:", error);
      return null;
    }
  },
  
  // Get the current user (with API refresh if needed)
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      
      // If no stored user but has token, fetch from API
      if (authService.isAuthenticated()) {
        const response = await apiService.getUserProfile();
        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      }
      
      return null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
  
  // Login
  login: async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  },
  
  // Register
  register: async (name: string, email: string, password: string, role: UserRole = UserRole.REGISTERED_USER): Promise<boolean> => {
    try {
      const response = await apiService.register({ name, email, password, role });
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      toast({
        title: "Registration successful",
        description: `Welcome to Go-Go, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  },
  
  // Logout
  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to home page
    window.location.href = '/';
  }
};

export default authService;
