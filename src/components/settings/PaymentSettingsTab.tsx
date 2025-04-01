
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Trash2, Edit, Check, Wallet, Shield, CreditCardIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define payment method types
interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'paypal' | 'applepay' | 'googlepay';
  name: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const PaymentSettingsTab: React.FC = () => {
  const { toast } = useToast();
  
  // Sample payment methods data
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: 'credit',
      name: 'Visa Credit Card',
      last4: '4242',
      expiry: '04/25',
      isDefault: true
    },
    {
      id: "pm_2",
      type: 'debit',
      name: 'Mastercard Debit',
      last4: '8765',
      expiry: '09/26',
      isDefault: false
    },
    {
      id: "pm_3",
      type: 'paypal',
      name: 'PayPal Account',
      last4: '',
      expiry: '',
      isDefault: false
    },
    {
      id: "pm_4",
      type: 'applepay',
      name: 'Apple Pay',
      last4: '1234',
      expiry: '',
      isDefault: false
    },
    {
      id: "pm_5",
      type: 'googlepay',
      name: 'Google Pay',
      last4: '5678',
      expiry: '',
      isDefault: false
    }
  ]);

  const [selectedMethod, setSelectedMethod] = useState<string>("pm_1");

  const handleSaveSettings = () => {
    toast({
      title: "Payment Methods",
      description: "Your payment methods have been updated",
      duration: 3000,
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    
    toast({
      title: "Default Payment Method",
      description: "Your default payment method has been updated",
      duration: 3000,
    });
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
    
    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed",
      duration: 3000,
    });
  };

  // Return the icon based on payment method type
  const getPaymentIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'credit':
      case 'debit':
        return <CreditCard className="h-5 w-5" />;
      case 'paypal':
        return <Wallet className="h-5 w-5" />;
      case 'applepay':
      case 'googlepay':
        return <CreditCardIcon className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Manage your payment methods and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Payment method navigation */}
          <div className="md:col-span-1 border rounded-lg p-3 h-[300px]">
            <h3 className="font-medium mb-3">Your Payment Methods</h3>
            <ScrollArea className="h-[250px] pr-4">
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className={`p-3 rounded-md cursor-pointer flex items-center space-x-3 ${
                      selectedMethod === method.id ? 'bg-primary/10 border border-primary/30' : 'hover:bg-accent'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    {getPaymentIcon(method.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{method.name}</p>
                      {method.last4 && (
                        <p className="text-xs text-muted-foreground">•••• {method.last4}</p>
                      )}
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">Default</span>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Payment method details */}
          <div className="md:col-span-2">
            {paymentMethods.find(m => m.id === selectedMethod) && (
              <div className="border rounded-lg p-4">
                {(() => {
                  const method = paymentMethods.find(m => m.id === selectedMethod)!;
                  return (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-lg">{method.name}</h3>
                          {method.type === 'credit' && <p className="text-muted-foreground text-sm">Credit Card</p>}
                          {method.type === 'debit' && <p className="text-muted-foreground text-sm">Debit Card</p>}
                          {method.type === 'paypal' && <p className="text-muted-foreground text-sm">PayPal Account</p>}
                          {method.type === 'applepay' && <p className="text-muted-foreground text-sm">Apple Pay</p>}
                          {method.type === 'googlepay' && <p className="text-muted-foreground text-sm">Google Pay</p>}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(method.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {method.last4 && (
                          <div className="rounded-md bg-muted p-3 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Card Number</p>
                              <p className="text-muted-foreground">•••• •••• •••• {method.last4}</p>
                            </div>
                            {method.expiry && (
                              <div className="text-right">
                                <p className="text-sm font-medium">Expires</p>
                                <p className="text-muted-foreground">{method.expiry}</p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          {!method.isDefault && (
                            <Button 
                              variant="secondary" 
                              onClick={() => handleSetDefault(method.id)}
                              className="flex-1"
                            >
                              <Check className="h-4 w-4 mr-1" /> Set as Default
                            </Button>
                          )}
                          <Button variant="outline" className="flex-1">Update Details</Button>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm mt-4">
                          <Shield className="h-4 w-4 text-muted-foreground" /> 
                          <span className="text-muted-foreground">Your payment information is stored securely</span>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add New Payment Method
        </Button>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveSettings}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSettingsTab;
