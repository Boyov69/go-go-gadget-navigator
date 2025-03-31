
import { toast } from "@/components/ui/use-toast";
import apiService from "./api";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

// Authentication service
const authService = {
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem('authToken') !== null;
  },
  
  // Get the current user
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
  register: async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.register({ name, email, password });
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
