
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { RefreshCcw, Download, Search, Filter, CheckCircle, XCircle } from "lucide-react";
import { AIMonitoringService } from '@/services/ai/AIMonitoringService';
import { AIAssistantLog, AIAssistantMetrics } from '@/types/aiAssistant';
import { CommandType } from '@/services/ai/AICommandProcessor';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AIAssistantMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [logs, setLogs] = useState<AIAssistantLog[]>([]);
  const [metrics, setMetrics] = useState<AIAssistantMetrics | null>(null);
  const [timeframe, setTimeframe] = useState<number>(7);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCommandType, setFilterCommandType] = useState<string>('all');
  const [filterSuccess, setFilterSuccess] = useState<string>('all');
  
  // Load data
  useEffect(() => {
    loadData();
  }, [timeframe]);
  
  const loadData = () => {
    const allLogs = AIMonitoringService.getLogs();
    setLogs(allLogs);
    
    const newMetrics = AIMonitoringService.getMetrics(timeframe);
    setMetrics(newMetrics);
  };
  
  // Filter logs based on search and filter criteria
  const filteredLogs = logs.filter(log => {
    // Text search
    if (searchTerm && !log.command.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !log.response.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Command type filter
    if (filterCommandType !== 'all' && log.commandType !== filterCommandType) {
      return false;
    }
    
    // Success filter
    if (filterSuccess !== 'all') {
      if (filterSuccess === 'success' && !log.success) return false;
      if (filterSuccess === 'failed' && log.success) return false;
    }
    
    return true;
  });
  
  // Format timestamp
  const formatTimestamp = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Prepare chart data for command distribution
  const prepareCommandDistributionData = () => {
    if (!metrics) return [];
    
    return Object.entries(metrics.commandTypeDistribution).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  // Download logs as JSON
  const downloadLogs = () => {
    const json = JSON.stringify(logs, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-assistant-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Assistant Monitoring</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" onClick={downloadLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Interaction Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.totalInteractions || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Last {timeframe} days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metrics?.totalInteractions ? 
                    Math.round((metrics.successfulInteractions / metrics.totalInteractions) * 100) : 0}%
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-xs">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                    Success: {metrics?.successfulInteractions || 0}
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                    Failed: {metrics?.failedInteractions || 0}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics?.averageProcessingTimeMs || 0} ms</div>
                <p className="text-xs text-muted-foreground">
                  Response time average
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Timeframe</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={timeframe.toString()} onValueChange={(value) => setTimeframe(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Last 24 hours</SelectItem>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Interactions</CardTitle>
                <CardDescription>Number of AI assistant interactions per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={metrics?.dailyInteractions || []}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 25,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        angle={-45} 
                        textAnchor="end" 
                        height={70} 
                        tick={{fontSize: 12}} 
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Command Distribution</CardTitle>
                <CardDescription>Types of commands processed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={prepareCommandDistributionData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {prepareCommandDistributionData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterCommandType} onValueChange={setFilterCommandType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Command Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value={CommandType.NAVIGATION}>Navigation</SelectItem>
                  <SelectItem value={CommandType.SEARCH}>Search</SelectItem>
                  <SelectItem value={CommandType.SETTINGS}>Settings</SelectItem>
                  <SelectItem value={CommandType.HELP}>Help</SelectItem>
                  <SelectItem value={CommandType.UNKNOWN}>Unknown</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterSuccess} onValueChange={setFilterSuccess}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Logs table */}
          <div className="rounded-md border">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-medium">Timestamp</th>
                    <th scope="col" className="px-4 py-3 text-left font-medium">Command</th>
                    <th scope="col" className="px-4 py-3 text-left font-medium">Response</th>
                    <th scope="col" className="px-4 py-3 text-left font-medium">Type</th>
                    <th scope="col" className="px-4 py-3 text-left font-medium">Status</th>
                    <th scope="col" className="px-4 py-3 text-left font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 whitespace-nowrap">{formatTimestamp(log.timestamp)}</td>
                        <td className="px-4 py-3">
                          <div className="max-w-[250px] truncate" title={log.command}>
                            {log.command}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="max-w-[250px] truncate" title={log.response}>
                            {log.response}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{log.commandType}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          {log.success ? (
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                              <span>Success</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <XCircle className="h-4 w-4 text-red-500 mr-1" />
                              <span>Failed</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{log.processingTimeMs} ms</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-3 text-center text-muted-foreground">
                        No logs found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistantMonitoring;
