
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentSettingsTab: React.FC = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Payment Methods",
      description: "Your payment methods have been updated",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>
          Manage your payment methods and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 04/25</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSettingsTab;
