
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Users,
  Package,
  Building,
  RefreshCcw,
  Search,
  AlertCircle,
  CheckCircle2,
  Loader2,
  TrendingUp,
  Route,
  MapPin,
  UserCheck
} from "lucide-react";

// Mock API functions
const fetchAdminStats = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    totalUsers: 2457,
    activeUsers: 1845,
    totalTrips: 18934,
    totalProviders: 126,
    revenue: "$25,420",
    userGrowth: "+12.5%",
    tripGrowth: "+24.3%",
    providerGrowth: "+8.7%"
  };
};

const fetchAdminUsers = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", role: "user", lastActive: "2 minutes ago" },
    { id: 2, name: "Emma Wilson", email: "emma@example.com", status: "active", role: "user", lastActive: "1 hour ago" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", status: "inactive", role: "user", lastActive: "5 days ago" },
    { id: 4, name: "Olivia Davis", email: "olivia@example.com", status: "active", role: "admin", lastActive: "30 minutes ago" },
    { id: 5, name: "William Johnson", email: "william@example.com", status: "active", role: "user", lastActive: "1 day ago" },
  ];
};

const fetchAdminProviders = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return [
    { id: 1, name: "Quick Ride", services: ["Taxi", "Delivery"], status: "active", rating: 4.8, trips: 2150 },
    { id: 2, name: "Express Transport", services: ["Taxi", "Bus"], status: "active", rating: 4.5, trips: 1875 },
    { id: 3, name: "Cargo Masters", services: ["Delivery", "Logistics"], status: "pending", rating: 0, trips: 0 },
    { id: 4, name: "City Movers", services: ["Taxi", "Delivery", "Logistics"], status: "active", rating: 4.2, trips: 932 },
    { id: 5, name: "Global Logistics", services: ["Logistics"], status: "active", rating: 4.7, trips: 1245 },
  ];
};

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch dashboard stats
  const { 
    data: stats, 
    isLoading: isLoadingStats,
    isError: isErrorStats,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchAdminStats
  });

  // Fetch users
  const { 
    data: users, 
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    refetch: refetchUsers
  } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: fetchAdminUsers
  });

  // Fetch providers
  const { 
    data: providers, 
    isLoading: isLoadingProviders,
    isError: isErrorProviders,
    refetch: refetchProviders
  } = useQuery({
    queryKey: ['adminProviders'],
    queryFn: fetchAdminProviders
  });

  const handleRefresh = () => {
    refetchStats();
    refetchUsers();
    refetchProviders();
    toast({
      title: "Refreshing dashboard",
      description: "Fetching the latest data from the server",
      duration: 2000,
    });
  };

  // Filter users based on search query
  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Filter providers based on search query
  const filteredProviders = providers?.filter(provider => 
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <LayoutDashboard className="h-6 w-6 mr-2 text-primary" />
                Admin Dashboard
              </h1>
              
              <Button onClick={handleRefresh} variant="outline" className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
            
            {/* Dashboard statistics cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isLoadingStats ? (
                // Loading skeleton for stats
                Array(4).fill(0).map((_, i) => (
                  <Card key={i} className="relative overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="h-5 w-24 bg-muted rounded animate-pulse mb-1"></div>
                      <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 w-32 bg-muted rounded animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))
              ) : isErrorStats ? (
                <Card className="col-span-full">
                  <CardContent className="flex items-center justify-center p-6">
                    <AlertCircle className="h-5 w-5 text-destructive mr-2" />
                    <p>Error loading dashboard statistics. Please try again.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Users
                      </CardTitle>
                      <div className="text-3xl font-bold">{stats?.totalUsers}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">{stats?.userGrowth}</span>
                        <span className="ml-1">since last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Trips
                      </CardTitle>
                      <div className="text-3xl font-bold">{stats?.totalTrips}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">{stats?.tripGrowth}</span>
                        <span className="ml-1">since last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Providers
                      </CardTitle>
                      <div className="text-3xl font-bold">{stats?.totalProviders}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">{stats?.providerGrowth}</span>
                        <span className="ml-1">since last month</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Revenue
                      </CardTitle>
                      <div className="text-3xl font-bold">{stats?.revenue}</div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        <span>Based on completed trips</span>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search users, providers, services..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="users">
              <TabsList>
                <TabsTrigger value="users" className="flex gap-2">
                  <Users className="h-4 w-4" /> Users
                </TabsTrigger>
                <TabsTrigger value="providers" className="flex gap-2">
                  <Building className="h-4 w-4" /> Providers
                </TabsTrigger>
                <TabsTrigger value="trips" className="flex gap-2">
                  <Route className="h-4 w-4" /> Trips
                </TabsTrigger>
                <TabsTrigger value="locations" className="flex gap-2">
                  <MapPin className="h-4 w-4" /> Locations
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      User Management
                    </CardTitle>
                    <CardDescription>
                      Manage registered users and their permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingUsers ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : isErrorUsers ? (
                      <div className="flex items-center justify-center p-6 text-destructive">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>Error loading user data. Please try again.</p>
                      </div>
                    ) : filteredUsers.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No users match your search</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Name</th>
                              <th className="text-left py-3 px-4">Email</th>
                              <th className="text-left py-3 px-4">Role</th>
                              <th className="text-left py-3 px-4">Status</th>
                              <th className="text-left py-3 px-4">Last Active</th>
                              <th className="text-right py-3 px-4">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredUsers.map((user) => (
                              <tr key={user.id} className="border-b">
                                <td className="py-3 px-4 font-medium">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4 capitalize">{user.role}</td>
                                <td className="py-3 px-4">
                                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                  }`}>
                                    {user.status === "active" ? (
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                    ) : (
                                      <AlertCircle className="h-3 w-3 mr-1" />
                                    )}
                                    {user.status}
                                  </div>
                                </td>
                                <td className="py-3 px-4">{user.lastActive}</td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="providers" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Building className="h-5 w-5 mr-2 text-primary" />
                      Provider Management
                    </CardTitle>
                    <CardDescription>
                      Manage service providers and their offerings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingProviders ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : isErrorProviders ? (
                      <div className="flex items-center justify-center p-6 text-destructive">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>Error loading provider data. Please try again.</p>
                      </div>
                    ) : filteredProviders.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No providers match your search</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Provider Name</th>
                              <th className="text-left py-3 px-4">Services</th>
                              <th className="text-left py-3 px-4">Status</th>
                              <th className="text-left py-3 px-4">Rating</th>
                              <th className="text-left py-3 px-4">Total Trips</th>
                              <th className="text-right py-3 px-4">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredProviders.map((provider) => (
                              <tr key={provider.id} className="border-b">
                                <td className="py-3 px-4 font-medium">{provider.name}</td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-wrap gap-1">
                                    {provider.services.map((service, i) => (
                                      <span
                                        key={i}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                                      >
                                        {service}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    provider.status === "active" 
                                      ? "bg-green-100 text-green-800" 
                                      : provider.status === "pending"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}>
                                    {provider.status}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  {provider.rating > 0 ? (
                                    <div className="flex items-center">
                                      <span className="font-medium mr-1">{provider.rating}</span>
                                      <svg
                                        className="h-4 w-4 text-amber-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 15.585l-7.07 3.713 1.352-7.872L.607 6.809l7.896-1.146L10 0l1.497 5.663 7.896 1.146-4.675 4.617 1.352 7.872z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">N/A</span>
                                  )}
                                </td>
                                <td className="py-3 px-4">{provider.trips}</td>
                                <td className="py-3 px-4 text-right">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="trips" className="mt-6">
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-xl flex items-center">
                      <Route className="h-5 w-5 mr-2 text-primary" />
                      Trip Analytics
                    </CardTitle>
                    <CardDescription>
                      Monitor and analyze all trips
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center p-12 border rounded-lg bg-muted/20">
                      <div className="text-center">
                        <Route className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">Trip Analytics</h3>
                        <p className="text-sm text-muted-foreground">
                          Detailed trip analytics will be displayed here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="locations" className="mt-6">
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-xl flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      Location Management
                    </CardTitle>
                    <CardDescription>
                      Manage popular locations and destinations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center p-12 border rounded-lg bg-muted/20">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">Location Manager</h3>
                        <p className="text-sm text-muted-foreground">
                          Location management tools will be displayed here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
