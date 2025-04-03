
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { VehicleCategory } from '@/types/providerApi';
import { Leaf, ArrowDown, Bike, Car, Bus, Zap } from 'lucide-react';

// Example data for the carbon dashboard
const mockUserCarbonData = {
  totalEmissionsGrams: 35800,
  offsetEmissionsGrams: 12500,
  carbonSaved: 25000,
  footprintBreakdown: {
    [VehicleCategory.CAR]: 18500,
    [VehicleCategory.TAXI]: 8000,
    [VehicleCategory.BUS]: 3200,
    [VehicleCategory.BIKE]: 0,
    [VehicleCategory.TRAIN]: 2100,
    [VehicleCategory.E_SCOOTER]: 4000
  },
  monthlyStats: [
    { month: 'Jan', emissionsGrams: 4200, offsetGrams: 1000 },
    { month: 'Feb', emissionsGrams: 3900, offsetGrams: 1500 },
    { month: 'Mar', emissionsGrams: 4500, offsetGrams: 2000 },
    { month: 'Apr', emissionsGrams: 3600, offsetGrams: 1800 },
    { month: 'May', emissionsGrams: 4100, offsetGrams: 2200 },
    { month: 'Jun', emissionsGrams: 3800, offsetGrams: 2000 }
  ]
};

const COLORS = ['#2ecc71', '#3498db', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];

const CarbonDashboard: React.FC = () => {
  // Format breakdown data for the pie chart
  const breakdownData = Object.entries(mockUserCarbonData.footprintBreakdown)
    .map(([category, value]) => ({
      name: category,
      value
    }));

  // Calculate carbon offsetting progress percentage
  const offsetPercentage = (mockUserCarbonData.offsetEmissionsGrams / mockUserCarbonData.totalEmissionsGrams) * 100;

  // Calculate kg from grams for better readability
  const totalEmissionsKg = mockUserCarbonData.totalEmissionsGrams / 1000;
  const offsetEmissionsKg = mockUserCarbonData.offsetEmissionsGrams / 1000;
  const carbonSavedKg = mockUserCarbonData.carbonSaved / 1000;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-500" />
            Your Carbon Footprint
          </CardTitle>
          <CardDescription>
            Track and reduce your travel carbon emissions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Emissions</p>
              <p className="text-2xl font-bold">{totalEmissionsKg.toFixed(1)} kg</p>
              <p className="text-xs text-muted-foreground">CO₂ equivalent</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Carbon Offset</p>
              <p className="text-2xl font-bold">{offsetEmissionsKg.toFixed(1)} kg</p>
              <p className="text-xs text-green-600">CO₂ neutralized</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Carbon Saved</p>
              <p className="text-2xl font-bold">{carbonSavedKg.toFixed(1)} kg</p>
              <div className="flex items-center justify-center text-xs text-blue-600">
                <ArrowDown className="h-3 w-3 mr-1" />
                vs. car trips
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Carbon Offsetting Progress</span>
              <span>{offsetPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={offsetPercentage} className="h-2" />
          </div>

          <Tabs defaultValue="breakdown">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="breakdown">Transport Breakdown</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="breakdown" className="pt-4">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                    >
                      {breakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${(Number(value) / 1000).toFixed(1)} kg CO₂`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="flex items-center text-xs gap-1">
                  <Car className="h-4 w-4" />
                  <span>Car: {(mockUserCarbonData.footprintBreakdown[VehicleCategory.CAR] / 1000).toFixed(1)} kg</span>
                </div>
                <div className="flex items-center text-xs gap-1">
                  <Bus className="h-4 w-4" />
                  <span>Bus: {(mockUserCarbonData.footprintBreakdown[VehicleCategory.BUS] / 1000).toFixed(1)} kg</span>
                </div>
                <div className="flex items-center text-xs gap-1">
                  <Bike className="h-4 w-4" />
                  <span>Bike: 0 kg</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="pt-4">
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockUserCarbonData.monthlyStats}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value / 1000}kg`} />
                    <Tooltip formatter={(value) => `${(Number(value) / 1000).toFixed(1)} kg CO₂`} />
                    <Bar dataKey="emissionsGrams" fill="#3498db" name="Emissions" />
                    <Bar dataKey="offsetGrams" fill="#2ecc71" name="Offset" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonDashboard;
