
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Award, Car } from "lucide-react";

const SupplierRequirements: React.FC = () => {
  return (
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
  );
};

export default SupplierRequirements;
