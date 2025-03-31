
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StopInput from "./StopInput";

interface MultiStopSectionProps {
  stops: string[];
  onStopChange: (index: number, value: string) => void;
  onAddStop: () => void;
  onRemoveStop: (index: number) => void;
}

const MultiStopSection: React.FC<MultiStopSectionProps> = ({
  stops,
  onStopChange,
  onAddStop,
  onRemoveStop
}) => {
  return (
    <div className="space-y-2">
      {stops.map((stop, index) => (
        <StopInput
          key={index}
          value={stop}
          onChange={(value) => onStopChange(index, value)}
          placeholder={`Stop ${index + 1}`}
          onRemove={() => onRemoveStop(index)}
          showRemoveButton={true}
        />
      ))}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full border-dashed" 
        onClick={onAddStop}
      >
        <Plus className="h-3.5 w-3.5 mr-1" /> Add Stop
      </Button>
    </div>
  );
};

export default MultiStopSection;
