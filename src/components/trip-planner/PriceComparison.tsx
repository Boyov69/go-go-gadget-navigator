
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Provider {
  id: string;
  name: string;
  price: number;
  rating: number;
  features: string[];
  eta: string;
  recommended?: boolean;
}

interface PriceComparisonProps {
  providers: Provider[];
  onSelect: (providerId: string) => void;
  onClose: () => void;
}

const PriceComparison: React.FC<PriceComparisonProps> = ({ 
  providers, 
  onSelect,
  onClose 
}) => {
  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Compare Providers</span>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {providers.map((provider) => (
            <div 
              key={provider.id} 
              className={`p-4 border rounded-lg ${provider.recommended ? 'border-primary bg-primary/5' : 'border-border'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {provider.name}
                    {provider.recommended && (
                      <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                        Best Value
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">ETA: {provider.eta}</div>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-3.5 h-3.5 ${i < provider.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs ml-1">({provider.rating.toFixed(1)})</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">€{provider.price.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Fixed price</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-1">
                {provider.features.map((feature, index) => (
                  <div key={index} className="text-xs flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-3" 
                size="sm"
                onClick={() => onSelect(provider.id)}
              >
                Select
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceComparison;
