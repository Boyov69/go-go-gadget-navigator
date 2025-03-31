import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Users, Building2, Activity, Server, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminGuard from "@/components/guards/AdminGuard";
import { UserRole } from "@/services/auth";
import apiService from "@/services/api";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mock data for when API fails or during development
const mockDashboardData = {
  stats: {
    totalUsers: 1250,
    userGrowth: 12.5,
    activeProviders: 48,
    newProviders: 5,
    systemHealth: "healthy",
    systemMessage: "All systems operational",
    newUsersToday: 25,
    activeUsers: 850,
    inactiveUsers: 400,
    serverLoad: 42,
    memoryUsed: 6.2,
    memoryTotal: 16,
    events: [
      { id: 1, title: "System Update", time: "Today, 9:30 AM", status: "completed" },
      { id: 2, title: "Database Backup", time: "Today, 3:15 AM", status: "completed" },
      { id: 3, title: "Security Scan", time: "Yesterday, 11:45 PM", status: "completed" }
    ]
  },
  users: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User", status: "Inactive", lastLogin: "2 weeks ago" },
    { id: 4, name: "Lisa Brown", email: "lisa@example.com", role: "User", status: "Active", lastLogin: "3 hours ago" }
  ],
  providers: [
    { id: 1, name: "Express Transport", type: "Transport", status: "Verified", joinDate: "Jan 2023", rating: 4.8 },
    { id: 2, name: "Cargo Masters", type: "Logistics", status: "Pending", joinDate: "Mar 2023", rating: 4.5 },
    { id: 3, name: "Swift Delivery", type: "Courier", status: "Verified", joinDate: "Feb 2023", rating: 4.7 },
    { id: 4, name: "Global Shipping", type: "Transport", status: "Suspended", joinDate: "Dec 2022", rating: 3.2 }
  ]
};

// Types for our dashboard data
interface DashboardData {
  stats: {
    totalUsers: number;
    userGrowth: number;
    activeProviders: number;
    newProviders: number;
    systemHealth: "healthy" | "warning" | "critical";
    systemMessage: string;
    newUsersToday: number;
    activeUsers: number;
    inactiveUsers: number;
    serverLoad: number;
    memoryUsed: number;
    memoryTotal: number;
    events: Array<{
      id: number;
      title: string;
      time: string;
      status: "pending" | "in-progress" | "completed" | "failed";
    }>;
  };
  users: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
  }>;
  providers: Array<{
    id: number;
    name: string;
    type: string;
    status: string;
    joinDate: string;
    rating: number;
  }>;
}

const SuperAdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Fetch dashboard stats with React Query
  const { data: statsData, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      try {
        const response = await apiService.getDashboardStats();
        return response.data || mockDashboardData;
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return mockDashboardData;
      }
    },
  });
  
  // Fetch users with React Query
  const { data: usersData, isLoading: usersLoading, error: usersError, refetch: refetchUsers } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      try {
        const response = await apiService.getAllUsers();
        return response.data?.users || mockDashboardData.users;
      } catch (error) {
        console.error("Error fetching users:", error);
        return mockDashboardData.users;
      }
    },
  });
  
  // Fetch providers with React Query
  const { data: providersData, isLoading: providersLoading, error: providersError, refetch: refetchProviders } = useQuery({
    queryKey: ['adminProviders'],
    queryFn: async () => {
      try {
        const response = await apiService.getAllProviders();
        return response.data?.providers || mockDashboardData.providers;
      } catch (error) {
        console.error("Error fetching providers:", error);
        return mockDashboardData.providers;
      }
    },
  });

  // Use the stats, users, and providers data
  const dashboardData: DashboardData = {
    stats: statsData?.stats || mockDashboardData.stats,
    users: usersData || mockDashboardData.users,
    providers: providersData || mockDashboardData.providers
  };

  const refreshData = () => {
    refetchStats();
    refetchUsers();
    refetchProviders();
    
    toast({
      title: "Refreshed",
      description: "Dashboard data has been refreshed.",
      duration: 3000,
    });
  };

  const userStatusData = [
    { name: "Active", value: dashboardData.stats.activeUsers },
    { name: "Inactive", value: dashboardData.stats.inactiveUsers }
  ];

  // Handle loading state
  if (statsLoading || usersLoading || providersLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
            </div>
            <div className="grid place-items-center h-[70vh]">
              <div className="text-center">
                <RefreshCcw className="h-16 w-16 mx-auto animate-spin text-primary" />
                <p className="mt-4 text-lg">Loading dashboard data...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Handle error state
  if (statsError || usersError || providersError) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
              <Button onClick={refreshData} variant="outline" className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Retry
              </Button>
            </div>
            <div className="grid place-items-center h-[70vh]">
              <div className="text-center">
                <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
                <p className="mt-4 text-lg">Error loading dashboard data</p>
                <p className="mt-2 text-muted-foreground">
                  There was an issue fetching the dashboard information. Please try again.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
            <Button onClick={refreshData} variant="outline" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Users Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={dashboardData.stats.userGrowth >= 0 ? "text-green-500" : "text-red-500"}>
                    {dashboardData.stats.userGrowth >= 0 ? "+" : ""}{dashboardData.stats.userGrowth}%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
            
            {/* Providers Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.stats.activeProviders}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">
                    +{dashboardData.stats.newProviders}
                  </span>{" "}
                  new this month
                </p>
              </CardContent>
            </Card>
            
            {/* System Status Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${
                    dashboardData.stats.systemHealth === 'healthy' ? 'bg-green-500' : 
                    dashboardData.stats.systemHealth === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="text-sm font-medium capitalize">
                    {dashboardData.stats.systemHealth}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {dashboardData.stats.systemMessage}
                </p>
              </CardContent>
            </Card>
            
            {/* Server Load Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Server Load</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">{dashboardData.stats.serverLoad}%</div>
                </div>
                <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      dashboardData.stats.serverLoad < 50 ? 'bg-green-500' : 
                      dashboardData.stats.serverLoad < 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${dashboardData.stats.serverLoad}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Users Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
                <CardDescription>User growth and distribution overview</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {userStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">New Today:</span> {dashboardData.stats.newUsersToday}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Active:</span> {dashboardData.stats.activeUsers}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Inactive:</span> {dashboardData.stats.inactiveUsers}
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.users.slice(0, 3).map(user => (
                    <div key={user.id} className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className="ml-auto">
                        {user.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <Button variant="ghost" className="w-full text-xs">View All Users</Button>
              </CardFooter>
            </Card>
            
            {/* System Resources */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Server and memory utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">CPU Load</div>
                      <div className="text-sm text-muted-foreground">{dashboardData.stats.serverLoad}%</div>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          dashboardData.stats.serverLoad < 50 ? 'bg-green-500' : 
                          dashboardData.stats.serverLoad < 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${dashboardData.stats.serverLoad}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Memory Usage</div>
                      <div className="text-sm text-muted-foreground">
                        {dashboardData.stats.memoryUsed} GB / {dashboardData.stats.memoryTotal} GB
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(dashboardData.stats.memoryUsed / dashboardData.stats.memoryTotal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {((dashboardData.stats.memoryUsed / dashboardData.stats.memoryTotal) * 100).toFixed(1)}% of {dashboardData.stats.memoryTotal} GB used
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle>System Events</CardTitle>
                <CardDescription>Recent system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.stats.events.length > 0 ? (
                    dashboardData.stats.events.map(event => (
                      <div key={event.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center">
                          {event.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
                          {event.status === 'failed' && <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />}
                          {(event.status === 'pending' || event.status === 'in-progress') && 
                            <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mr-2"></div>
                          }
                          <div className="text-sm font-medium">{event.title}</div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{event.time}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">No recent events</div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Providers Table */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Service Providers</CardTitle>
                <CardDescription>Registered service providers overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium p-2">Provider Name</th>
                        <th className="text-left font-medium p-2">Type</th>
                        <th className="text-left font-medium p-2">Status</th>
                        <th className="text-left font-medium p-2">Join Date</th>
                        <th className="text-left font-medium p-2">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.providers.map(provider => (
                        <tr key={provider.id} className="border-b last:border-b-0 hover:bg-accent/50">
                          <td className="p-2">{provider.name}</td>
                          <td className="p-2">{provider.type}</td>
                          <td className="p-2">
                            <Badge variant={
                              provider.status === 'Verified' ? 'default' : 
                              provider.status === 'Pending' ? 'secondary' : 'destructive'
                            }>
                              {provider.status}
                            </Badge>
                          </td>
                          <td className="p-2">{provider.joinDate}</td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <div className="text-amber-500">★</div>
                              <div className="ml-1">{provider.rating}</div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-3">
                <Button variant="ghost" className="w-full text-xs">View All Providers</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

const AdminDashboardPage: React.FC = () => (
  <AdminGuard requiredRole={UserRole.SUPER_ADMIN}>
    <SuperAdminDashboard />
  </AdminGuard>
);

export default AdminDashboardPage;
