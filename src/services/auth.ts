
import { toast } from "@/hooks/use-toast";

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

// Mock user data for demo purposes
const mockUsers = {
  "superadmin@example.com": {
    id: "sa-001",
    name: "Super Admin",
    email: "superadmin@example.com",
    role: UserRole.SUPER_ADMIN,
    permissions: ["all"],
    avatar: "https://i.pravatar.cc/150?u=superadmin"
  },
  "admin@example.com": {
    id: "adm-001",
    name: "Admin User",
    email: "admin@example.com",
    role: UserRole.ADMIN,
    permissions: ["manage_users", "manage_content"],
    avatar: "https://i.pravatar.cc/150?u=admin"
  },
  "user@example.com": {
    id: "usr-001",
    name: "Regular User",
    email: "user@example.com",
    role: UserRole.REGISTERED_USER,
    permissions: ["view_content"],
    avatar: "https://i.pravatar.cc/150?u=user"
  }
};

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
      
      // If no stored user but has token, use mock data (for demo)
      if (authService.isAuthenticated()) {
        const email = localStorage.getItem('lastEmail');
        if (email && mockUsers[email as keyof typeof mockUsers]) {
          const userData = mockUsers[email as keyof typeof mockUsers];
          localStorage.setItem('user', JSON.stringify(userData));
          return userData;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
  
  // Login (simulated for demo)
  login: async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll accept any non-empty password
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if the email exists in our mock data
      const user = mockUsers[email as keyof typeof mockUsers];
      
      if (!user) {
        throw new Error("User not found");
      }
      
      // Simulate successful login
      const token = "demo-auth-token-" + Math.random().toString(36).substring(2);
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('lastEmail', email);
      
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
  
  // Register (simulated for demo)
  register: async (name: string, email: string, password: string, role: UserRole = UserRole.REGISTERED_USER): Promise<boolean> => {
    try {
      if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new user
      const newUser: User = {
        id: "user-" + Math.random().toString(36).substring(2),
        name,
        email,
        role,
        permissions: role === UserRole.SUPER_ADMIN ? ["all"] : 
                   role === UserRole.ADMIN ? ["manage_users", "manage_content"] : 
                   ["view_content"],
        avatar: `https://i.pravatar.cc/150?u=${email}`
      };
      
      const token = "demo-auth-token-" + Math.random().toString(36).substring(2);
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('lastEmail', email);
      
      // Add the new user to our mock data
      (mockUsers as any)[email] = newUser;
      
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
  }
};

export default authService;
