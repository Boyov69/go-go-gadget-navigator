
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface EarningsData {
  today: number;
  week: number;
  month: number;
}

interface SupplierEarningsCardsProps {
  earnings: EarningsData;
}

const SupplierEarningsCards: React.FC<SupplierEarningsCardsProps> = ({ earnings }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Today's Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            <span className="text-2xl font-bold">${earnings.today.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            <span className="text-2xl font-bold">${earnings.week.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            <span className="text-2xl font-bold">${earnings.month.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierEarningsCards;
