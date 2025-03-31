import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings, User, Bell, Shield, MapPin, Moon, Globe, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  // User profile settings
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+1 123 456 7890");
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Appearance settings
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [distanceUnit, setDistanceUnit] = useState("km");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully",
      duration: 3000,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            </div>
            
            <Tabs defaultValue="general">
              <div className="flex flex-col sm:flex-row gap-4">
                <TabsList className="h-full flex flex-row sm:flex-col justify-start mb-0 sm:mb-4 w-full sm:w-48 lg:w-56 p-1 sm:p-2">
                  <TabsTrigger value="general" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Settings className="h-4 w-4" />
                    <span>General</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Shield className="h-4 w-4" />
                    <span>Privacy</span>
                  </TabsTrigger>
                  <TabsTrigger value="location" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Moon className="h-4 w-4" />
                    <span>Appearance</span>
                  </TabsTrigger>
                  <TabsTrigger value="language" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Globe className="h-4 w-4" />
                    <span>Language</span>
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex-1">
                  <TabsContent value="general" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                          Manage your general application settings.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="distanceUnit">Distance Unit</Label>
                          <select 
                            id="distanceUnit"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={distanceUnit}
                            onChange={(e) => setDistanceUnit(e.target.value)}
                          >
                            <option value="km">Kilometers</option>
                            <option value="mi">Miles</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="autoSave" 
                            checked={true} 
                            onCheckedChange={() => {}}
                          />
                          <Label htmlFor="autoSave">Auto-save route history</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="offlineMode" 
                            checked={false} 
                            onCheckedChange={() => {}}
                          />
                          <Label htmlFor="offlineMode">Enable offline mode</Label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="profile" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Settings</CardTitle>
                        <CardDescription>
                          Manage your profile information.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>Update Profile</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                          Choose how you want to be notified.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="emailNotifications" 
                            checked={emailNotifications} 
                            onCheckedChange={setEmailNotifications}
                          />
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="pushNotifications" 
                            checked={pushNotifications} 
                            onCheckedChange={setPushNotifications}
                          />
                          <Label htmlFor="pushNotifications">Push Notifications</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="marketingEmails" 
                            checked={marketingEmails} 
                            onCheckedChange={setMarketingEmails}
                          />
                          <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>Save Preferences</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="appearance" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>
                          Customize how the application looks.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="darkMode" 
                            checked={darkMode} 
                            onCheckedChange={setDarkMode}
                          />
                          <Label htmlFor="darkMode">Dark Mode</Label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>Save Preferences</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  {/* Other tab contents would be similar but with different form fields */}
                  <TabsContent value="privacy" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription>
                          Manage your privacy preferences.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="locationSharing" defaultChecked />
                          <Label htmlFor="locationSharing">Share my location</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="dataCollection" defaultChecked />
                          <Label htmlFor="dataCollection">Allow data collection</Label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>Save Preferences</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="language" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Language Settings</CardTitle>
                        <CardDescription>
                          Select your preferred language.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Label htmlFor="language">Application Language</Label>
                          <select 
                            id="language"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                          >
                            <option value="english">English</option>
                            <option value="dutch">Dutch</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                          </select>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>Save Language</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  {/* Other tab contents would follow the same pattern */}
                </div>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
