
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface SupplierRegistrationFormProps {
  onSubmitSuccess: () => void;
}

const SupplierRegistrationForm: React.FC<SupplierRegistrationFormProps> = ({ onSubmitSuccess }) => {
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
    onSubmitSuccess();
  };

  return (
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
  );
};

export default SupplierRegistrationForm;
