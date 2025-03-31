
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PromoCodeSectionProps {
  promoCode: string;
  onPromoCodeChange: (value: string) => void;
}

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  promoCode,
  onPromoCodeChange
}) => {
  return (
    <div className="relative">
      <div className="flex gap-1 items-center">
        <Input
          type="text"
          value={promoCode}
          onChange={(e) => onPromoCodeChange(e.target.value)}
          placeholder="Promo Code"
          className=""
        />
        <Button 
          size="sm" 
          variant="outline"
          className="whitespace-nowrap"
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default PromoCodeSection;
