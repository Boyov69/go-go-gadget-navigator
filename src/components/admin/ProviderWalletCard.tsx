
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { walletService, Wallet, WalletCurrencyType } from '@/services/wallet';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProviderWalletCardProps {
  providerId: string;
}

export const ProviderWalletCard: React.FC<ProviderWalletCardProps> = ({ providerId }) => {
  const { data: wallet, isLoading, error } = useQuery({
    queryKey: ['provider-wallet', providerId],
    queryFn: () => walletService.getWalletByProviderId(providerId),
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error || !wallet) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            Wallet information not available
          </p>
        </CardContent>
      </Card>
    );
  }

  const fiatBalance = wallet.balances
    .filter((b) => b.type === WalletCurrencyType.FIAT)
    .reduce((total, balance) => total + balance.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Fiat Balance</p>
          <p className="text-2xl font-bold">€{fiatBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>

        <div className="space-y-2">
          {wallet.balances.map((balance, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-sm">{balance.currency}</span>
              <span className="font-medium">{balance.amount.toLocaleString(undefined, {
                minimumFractionDigits: balance.type === WalletCurrencyType.CRYPTO ? 8 : 2,
                maximumFractionDigits: balance.type === WalletCurrencyType.CRYPTO ? 8 : 2
              })}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="w-full">Transaction History</Button>
        <Button className="w-full">Withdraw</Button>
      </CardFooter>
    </Card>
  );
};
