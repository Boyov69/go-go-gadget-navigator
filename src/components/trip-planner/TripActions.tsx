
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

interface TripActionsProps {
  onSchedule: () => void;
  onFindRoute: () => void;
}

const TripActions: React.FC<TripActionsProps> = ({ 
  onSchedule, 
  onFindRoute 
}) => {
  return (
    <div className="pt-2 flex gap-2">
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
  );
};

export default TripActions;
