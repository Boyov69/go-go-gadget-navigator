
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ShieldCheck, 
  Building, 
  PieChart, 
  FileText, 
  Globe,
  RefreshCcw
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

import AdminGuard from '@/components/guards/AdminGuard';
import { UserRole } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';
import apiService from '@/services/api';

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Fetch dashboard stats
  const { 
    data: dashboardStats, 
    isLoading: isLoadingStats, 
    error: statsError,
    refetch: refetchStats
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: apiService.getDashboardStats,
    retry: 1,
  });

  // Fetch users
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
    refetch: refetchUsers
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiService.getAllUsers({ limit: 5 }),
    retry: 1,
  });

  // Fetch providers
  const {
    data: providers,
    isLoading: isLoadingProviders,
    error: providersError,
    refetch: refetchProviders
  } = useQuery({
    queryKey: ['providers'],
    queryFn: () => apiService.getAllProviders({ limit: 5 }),
    retry: 1,
  });

  // Handle refresh
  const handleRefresh = () => {
    refetchStats();
    refetchUsers();
    refetchProviders();
    toast({
      title: "Dashboard Refreshed",
      description: "Latest data has been loaded.",
    });
  };

  // Show error toasts
  useEffect(() => {
    if (statsError) {
      toast({
        title: "Error Loading Dashboard Data",
        description: "Could not load dashboard statistics. Please try again.",
        variant: "destructive",
      });
    }
    if (usersError) {
      toast({
        title: "Error Loading Users",
        description: "Could not load user data. Please try again.",
        variant: "destructive",
      });
    }
    if (providersError) {
      toast({
        title: "Error Loading Providers",
        description: "Could not load provider data. Please try again.",
        variant: "destructive",
      });
    }
  }, [statsError, usersError, providersError, toast]);

  return (
    <AdminGuard requiredRole={UserRole.SUPER_ADMIN}>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingStats ? (
                    <div className="h-8 animate-pulse bg-muted rounded"></div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{dashboardStats?.totalUsers || 0}</div>
                      <p className="text-xs text-muted-foreground">
                        {dashboardStats?.userGrowth > 0 ? '+' : ''}{dashboardStats?.userGrowth || 0}% from last month
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingStats ? (
                    <div className="h-8 animate-pulse bg-muted rounded"></div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{dashboardStats?.activeProviders || 0}</div>
                      <p className="text-xs text-muted-foreground">
                        {dashboardStats?.newProviders || 0} new this week
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {isLoadingStats ? (
                    <div className="h-8 animate-pulse bg-muted rounded"></div>
                  ) : (
                    <>
                      <div className={`text-2xl font-bold ${
                        dashboardStats?.systemHealth === 'Optimal' ? 'text-green-500' : 
                        dashboardStats?.systemHealth === 'Warning' ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {dashboardStats?.systemHealth || 'Unknown'}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {dashboardStats?.systemMessage || 'No system information available'}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingUsers ? (
                    <div className="h-32 animate-pulse bg-muted rounded"></div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users?.data?.length > 0 ? (
                          users.data.map((user: any) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.role}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center">No users found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Providers</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingProviders ? (
                    <div className="h-32 animate-pulse bg-muted rounded"></div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Provider</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Joined</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {providers?.data?.length > 0 ? (
                          providers.data.map((provider: any) => (
                            <TableRow key={provider.id}>
                              <TableCell className="font-medium">{provider.name}</TableCell>
                              <TableCell>
                                <span className={
                                  provider.status === 'Active' ? 'text-green-500' :
                                  provider.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'
                                }>
                                  {provider.status}
                                </span>
                              </TableCell>
                              <TableCell>{new Date(provider.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center">No providers found</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = '/super-admin/users'}>
                    Manage Users
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = '/super-admin/permissions'}>
                    User Permissions
                  </Button>
                  <div className="my-4">
                    <h3 className="text-lg font-medium mb-2">User Statistics</h3>
                    {isLoadingStats ? (
                      <div className="h-20 animate-pulse bg-muted rounded"></div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-md">
                          <p className="text-sm text-muted-foreground">New Today</p>
                          <p className="text-2xl font-bold">{dashboardStats?.newUsersToday || 0}</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p className="text-sm text-muted-foreground">Active Users</p>
                          <p className="text-2xl font-bold">{dashboardStats?.activeUsers || 0}</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p className="text-sm text-muted-foreground">Inactive Users</p>
                          <p className="text-2xl font-bold">{dashboardStats?.inactiveUsers || 0}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingStats ? (
                  <div className="space-y-4">
                    <div className="h-6 animate-pulse bg-muted rounded"></div>
                    <div className="h-6 animate-pulse bg-muted rounded"></div>
                    <div className="h-6 animate-pulse bg-muted rounded"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Server Load</span>
                      <div className="text-sm font-bold">
                        {dashboardStats?.serverLoad || '0'}%
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${dashboardStats?.serverLoad || 0}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span>Memory Usage</span>
                      <div className="text-sm font-bold">
                        {dashboardStats?.memoryUsed || '0'} / {dashboardStats?.memoryTotal || '0'} GB
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ 
                          width: `${
                            dashboardStats?.memoryTotal 
                              ? (dashboardStats.memoryUsed / dashboardStats.memoryTotal) * 100 
                              : 0
                          }%` 
                        }}
                      ></div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Latest System Events</h3>
                      {dashboardStats?.events && dashboardStats.events.length > 0 ? (
                        <div className="space-y-2">
                          {dashboardStats.events.map((event: any, index: number) => (
                            <div key={index} className="p-2 border rounded text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">{event.type}</span>
                                <span className="text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</span>
                              </div>
                              <p>{event.message}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No recent system events</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  );
};

export default SuperAdminDashboard;
