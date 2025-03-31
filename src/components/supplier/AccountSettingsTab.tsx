
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Car, CreditCard, Bell } from "lucide-react";

const AccountSettingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your provider account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <h3 className="font-medium">Profile Details</h3>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">
                Update
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                <h3 className="font-medium">Vehicle Information</h3>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">
                Manage
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <h3 className="font-medium">Payment Methods</h3>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">
                Configure
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-accent/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <h3 className="font-medium">Notifications</h3>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2">
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="destructive" size="sm">Deactivate Account</Button>
      </CardFooter>
    </Card>
  );
};

export default AccountSettingsTab;
