
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Car, Bus, Train, Check, FileText, Award } from "lucide-react";

interface SupplierRegistrationProps {
  onRegistered: () => void;
}

const SupplierRegistration: React.FC<SupplierRegistrationProps> = ({ onRegistered }) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      serviceType: "",
      vehicleCount: "",
      licenseNumber: "",
    },
  });

  const handleSubmit = (data: any) => {
    console.log("Registration data:", data);
    toast({
      title: "Registration Successful",
      description: "Your application has been received and is being processed.",
      duration: 3000,
    });
    onRegistered();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Become a Service Provider</CardTitle>
          <CardDescription>
            Register your transportation service and start earning by providing rides to our users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="company@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="taxi">Taxi Service</SelectItem>
                        <SelectItem value="rideshare">Rideshare</SelectItem>
                        <SelectItem value="bus">Bus Service</SelectItem>
                        <SelectItem value="shuttle">Airport Shuttle</SelectItem>
                        <SelectItem value="train">Train Service</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vehicleCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Vehicles</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transportation License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="License number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your valid transport service license issued by authorities
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">Submit Application</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Benefits of Joining</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Access to thousands of potential customers</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Secure and prompt payments</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Smart route optimization</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>24/7 support for providers</span>
              </li>
              <li className="flex gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Advanced booking management</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span>Valid transportation service license</span>
              </div>
              <div className="flex gap-2">
                <Award className="h-5 w-5 text-muted-foreground" />
                <span>Insurance coverage</span>
              </div>
              <div className="flex gap-2">
                <Car className="h-5 w-5 text-muted-foreground" />
                <span>Vehicles meeting safety standards</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierRegistration;
