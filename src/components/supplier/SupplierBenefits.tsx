
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const SupplierBenefits: React.FC = () => {
  return (
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
  );
};

export default SupplierBenefits;
