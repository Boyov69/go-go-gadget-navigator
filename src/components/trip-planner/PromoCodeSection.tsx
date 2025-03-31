
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

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
        <div className="relative flex-1">
          <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            placeholder="Promo Code"
            className="pl-8"
          />
        </div>
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
