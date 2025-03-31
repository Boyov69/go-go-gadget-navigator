
import React from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StopInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

const StopInput: React.FC<StopInputProps> = ({ 
  value, 
  onChange, 
  placeholder,
  onRemove,
  showRemoveButton = false
}) => {
  return (
    <div className="relative">
      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <div className="flex gap-1">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-8"
        />
        {showRemoveButton && onRemove && (
          <button 
            className="p-2 bg-accent rounded-md"
            onClick={onRemove}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default StopInput;
