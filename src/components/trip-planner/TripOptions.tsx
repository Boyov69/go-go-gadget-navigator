
import React from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-between text-xs">
      <button 
        className="text-primary flex items-center gap-1"
        onClick={onToggleMultiStops}
      >
        {!showMultiStops ? (
          <>
            <Plus className="h-3.5 w-3.5" /> {t("trip.addStop")}
          </>
        ) : (
          <>{t("trip.removeStops")}</>
        )}
      </button>
      <button 
        className="text-primary flex items-center gap-1"
        onClick={onTogglePromoCode}
      >
        {!showPromoCode ? (
          <>
            <Plus className="h-3.5 w-3.5" /> {t("trip.addPromo")}
          </>
        ) : (
          <>{t("trip.removePromo")}</>
        )}
      </button>
    </div>
  );
};

export default TripOptions;
