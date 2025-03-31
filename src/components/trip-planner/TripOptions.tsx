
import React from "react";
import { Plus } from "lucide-react";

interface TripOptionsProps {
  showMultiStops: boolean;
  showPromoCode: boolean;
  onToggleMultiStops: () => void;
  onTogglePromoCode: () => void;
}

const TripOptions: React.FC<TripOptionsProps> = ({
  showMultiStops,
  showPromoCode,
  onToggleMultiStops,
  onTogglePromoCode
}) => {
  return (
    <div className="flex justify-between text-xs">
      <button 
        className="text-primary flex items-center gap-1"
        onClick={onToggleMultiStops}
      >
        {!showMultiStops ? (
          <>
            <Plus className="h-3.5 w-3.5" /> Add Multiple Stops
          </>
        ) : (
          <>Remove Multiple Stops</>
        )}
      </button>
      <button 
        className="text-primary flex items-center gap-1"
        onClick={onTogglePromoCode}
      >
        {!showPromoCode ? (
          <>
            <Plus className="h-3.5 w-3.5" /> Add Promo Code
          </>
        ) : (
          <>Remove Promo Code</>
        )}
      </button>
    </div>
  );
};

export default TripOptions;
