
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, DollarSign } from "lucide-react";

interface TripActionsProps {
  onSchedule: () => void;
  onFindRoute: () => void;
  onComparePrice?: () => void;
}

const TripActions: React.FC<TripActionsProps> = ({ 
  onSchedule, 
  onFindRoute,
  onComparePrice 
}) => {
  return (
    <div className="pt-2 flex flex-col gap-2">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 gap-2"
          onClick={onSchedule}
        >
          <Clock className="h-4 w-4" />
          Schedule
        </Button>
        <Button 
          className="flex-1 gap-2"
          onClick={onFindRoute}
        >
          Find Route <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      {onComparePrice && (
        <Button 
          variant="secondary" 
          className="w-full gap-2"
          onClick={onComparePrice}
        >
          <DollarSign className="h-4 w-4" />
          Compare Prices
        </Button>
      )}
    </div>
  );
};

export default TripActions;
