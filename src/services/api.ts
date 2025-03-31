
import axios from 'axios';
import { UserRole } from './auth';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized errors
          console.error('Authentication failed');
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden errors
          console.error('Access forbidden');
          break;
        case 404:
          // Handle not found errors
          console.error('Resource not found');
          break;
        default:
          // Handle other errors
          console.error('API Error:', error.response.data);
          break;
      }
    } else if (error.request) {
      // Network error or no response
      console.error('Network error or no response from server');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API Service functions
const apiService = {
  // Authentication
  login: (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: (userData: { email: string; password: string; name: string; role?: UserRole }) => {
    return api.post('/auth/register', userData);
  },
  
  // User profile
  getUserProfile: () => {
    return api.get('/user/profile');
  },
  
  updateUserProfile: (profileData: any) => {
    return api.put('/user/profile', profileData);
  },
  
  // Admin - User Management
  getAllUsers: (filters?: any) => {
    return api.get('/admin/users', { params: filters });
  },
  
  getUserById: (userId: string) => {
    return api.get(`/admin/users/${userId}`);
  },
  
  createUser: (userData: any) => {
    return api.post('/admin/users', userData);
  },
  
  updateUser: (userId: string, userData: any) => {
    return api.put(`/admin/users/${userId}`, userData);
  },
  
  deleteUser: (userId: string) => {
    return api.delete(`/admin/users/${userId}`);
  },
  
  // Admin - Provider Management
  getAllProviders: (filters?: any) => {
    return api.get('/admin/providers', { params: filters });
  },
  
  approveProvider: (providerId: string) => {
    return api.post(`/admin/providers/${providerId}/approve`);
  },
  
  rejectProvider: (providerId: string, reason?: string) => {
    return api.post(`/admin/providers/${providerId}/reject`, { reason });
  },
  
  suspendProvider: (providerId: string, reason?: string) => {
    return api.post(`/admin/providers/${providerId}/suspend`, { reason });
  },
  
  // Admin - Analytics
  getDashboardStats: () => {
    return api.get('/admin/stats/dashboard');
  },
  
  getUserStats: (params?: any) => {
    return api.get('/admin/stats/users', { params });
  },
  
  getProviderStats: (params?: any) => {
    return api.get('/admin/stats/providers', { params });
  },
  
  getTripStats: (params?: any) => {
    return api.get('/admin/stats/trips', { params });
  },
  
  // Trips and rides
  getRecentTrips: () => {
    return api.get('/trips/recent');
  },
  
  bookRide: (rideData: any) => {
    return api.post('/rides/book', rideData);
  },
  
  // Saved locations
  getSavedLocations: () => {
    return api.get('/locations/saved');
  },
  
  addSavedLocation: (locationData: any) => {
    return api.post('/locations/saved', locationData);
  },
  
  // Suppliers
  getSuppliers: (filters?: any) => {
    return api.get('/suppliers', { params: filters });
  },
  
  // Cargo
  getCargoOptions: () => {
    return api.get('/cargo/options');
  },
  
  requestCargoService: (cargoData: any) => {
    return api.post('/cargo/request', cargoData);
  },
};

export default apiService;
