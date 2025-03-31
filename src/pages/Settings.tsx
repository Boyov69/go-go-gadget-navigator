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
import { useLanguage, SupportedLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const SettingsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  
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
  const [distanceUnit, setDistanceUnit] = useState("km");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: t("settings.saveChanges"),
      description: "Your settings have been updated successfully",
      duration: 3000,
    });
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value as SupportedLanguage);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar}>
          <LanguageSelector />
        </Navbar>
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">{t("settings.title")}</h1>
            </div>
            
            <Tabs defaultValue="general">
              <div className="flex flex-col sm:flex-row gap-4">
                <TabsList className="h-full flex flex-row sm:flex-col justify-start mb-0 sm:mb-4 w-full sm:w-48 lg:w-56 p-1 sm:p-2">
                  <TabsTrigger value="general" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Settings className="h-4 w-4" />
                    <span>{t("settings.general.title")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <User className="h-4 w-4" />
                    <span>{t("settings.profile.title")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Bell className="h-4 w-4" />
                    <span>{t("settings.notifications.title")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Shield className="h-4 w-4" />
                    <span>{t("settings.privacy.title")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="location" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Moon className="h-4 w-4" />
                    <span>{t("settings.appearance.title")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="language" className="w-full justify-start gap-2 pl-2 lg:pl-3">
                    <Globe className="h-4 w-4" />
                    <span>{t("settings.language.title")}</span>
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
                        <CardTitle>{t("settings.general.title")}</CardTitle>
                        <CardDescription>
                          {t("settings.general.description")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="distanceUnit">{t("settings.general.distanceUnit")}</Label>
                          <select 
                            id="distanceUnit"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={distanceUnit}
                            onChange={(e) => setDistanceUnit(e.target.value)}
                          >
                            <option value="km">{t("settings.general.kilometers")}</option>
                            <option value="mi">{t("settings.general.miles")}</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="autoSave" 
                            checked={true} 
                            onCheckedChange={() => {}}
                          />
                          <Label htmlFor="autoSave">{t("settings.general.autoSave")}</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="offlineMode" 
                            checked={false} 
                            onCheckedChange={() => {}}
                          />
                          <Label htmlFor="offlineMode">{t("settings.general.offline")}</Label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>{t("settings.saveChanges")}</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="profile" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("settings.profile.title")}</CardTitle>
                        <CardDescription>
                          {t("settings.profile.description")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("settings.profile.fullName")}</Label>
                          <Input 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("settings.profile.email")}</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t("settings.profile.phone")}</Label>
                          <Input 
                            id="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>{t("settings.updateProfile")}</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("settings.notifications.title")}</CardTitle>
                        <CardDescription>
                          {t("settings.notifications.description")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="emailNotifications" 
                            checked={emailNotifications} 
                            onCheckedChange={setEmailNotifications}
                          />
                          <Label htmlFor="emailNotifications">{t("settings.notifications.email")}</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="pushNotifications" 
                            checked={pushNotifications} 
                            onCheckedChange={setPushNotifications}
                          />
                          <Label htmlFor="pushNotifications">{t("settings.notifications.push")}</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="marketingEmails" 
                            checked={marketingEmails} 
                            onCheckedChange={setMarketingEmails}
                          />
                          <Label htmlFor="marketingEmails">{t("settings.notifications.marketing")}</Label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>{t("settings.savePreferences")}</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="appearance" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("settings.appearance.title")}</CardTitle>
                        <CardDescription>
                          {t("settings.appearance.description")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="darkMode" 
                            checked={darkMode} 
                            onCheckedChange={setDarkMode}
                          />
                          <Label htmlFor="darkMode">{t("settings.appearance.darkMode")}</Label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>{t("settings.savePreferences")}</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="privacy" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("settings.privacy.title")}</CardTitle>
                        <CardDescription>
                          {t("settings.privacy.description")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="locationSharing" defaultChecked />
                          <Label htmlFor="locationSharing">{t("settings.privacy.location")}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="dataCollection" defaultChecked />
                          <Label htmlFor="dataCollection">{t("settings.privacy.data")}</Label>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>{t("settings.savePreferences")}</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="language" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("settings.language.title")}</CardTitle>
                        <CardDescription>
                          {t("settings.language.description")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Label htmlFor="language">{t("settings.language.appLanguage")}</Label>
                          <select 
                            id="language"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={language}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                          >
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="es">Español</option>
                            <option value="nl">Nederlands</option>
                            <option value="it">Italiano</option>
                          </select>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleSaveSettings}>{t("settings.saveLanguage")}</Button>
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
