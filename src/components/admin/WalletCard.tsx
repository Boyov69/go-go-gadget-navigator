
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, WalletCurrencyType } from "@/types/wallet";
import { Banknote, Bitcoin } from "lucide-react";
import { formatCurrency } from "@/utils/currencyUtils";

interface WalletCardProps {
  wallet: Wallet;
  onClick?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = React.memo(({ wallet, onClick }) => {
  const totalFiat = wallet.balances
    .filter(b => b.type === WalletCurrencyType.FIAT)
    .reduce((total, balance) => total + balance.amount, 0);

  return (
    <Card 
      className="transition-shadow hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          {wallet.providerName}
          <Badge variant="outline" className="font-normal">
            ID: {wallet.id.slice(0, 8)}
          </Badge>
        </CardTitle>
        <CardDescription>Last updated: {new Date(wallet.lastUpdated).toLocaleString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Fiat balances */}
          <div className="border-b pb-2">
            <div className="flex items-center gap-2 font-medium mb-1 text-sm text-muted-foreground">
              <Banknote className="h-4 w-4" />
              <span>Fiat Balances</span>
            </div>
            <div className="space-y-1">
              {wallet.balances
                .filter(b => b.type === WalletCurrencyType.FIAT)
                .map((balance, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{balance.currency}</span>
                    <span className="font-semibold">
                      {formatCurrency(balance.amount, balance.currency, balance.type)}
                    </span>
                  </div>
                ))}
              {wallet.balances.filter(b => b.type === WalletCurrencyType.FIAT).length === 0 && (
                <div className="text-sm text-muted-foreground">No fiat balances</div>
              )}
            </div>
          </div>
          
          {/* Crypto balances */}
          <div>
            <div className="flex items-center gap-2 font-medium mb-1 text-sm text-muted-foreground">
              <Bitcoin className="h-4 w-4" />
              <span>Crypto Balances</span>
            </div>
            <div className="space-y-1">
              {wallet.balances
                .filter(b => b.type === WalletCurrencyType.CRYPTO)
                .map((balance, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{balance.currency}</span>
                    <span className="font-semibold">
                      {formatCurrency(balance.amount, balance.currency, balance.type)}
                    </span>
                  </div>
                ))}
              {wallet.balances.filter(b => b.type === WalletCurrencyType.CRYPTO).length === 0 && (
                <div className="text-sm text-muted-foreground">No crypto balances</div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

WalletCard.displayName = 'WalletCard';
