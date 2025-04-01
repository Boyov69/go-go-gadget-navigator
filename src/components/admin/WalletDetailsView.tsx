
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from '@/services/wallet';
import { WalletCard } from './WalletCard';
import { TransactionsList } from './TransactionsList';
import { Loader2 } from 'lucide-react';
import type { Transaction } from '@/services/wallet';

interface WalletDetailsViewProps {
  wallet: Wallet;
  transactions: Transaction[] | undefined;
  isLoading: boolean;
  onAddFunds: () => void;
  onWithdraw: () => void;
}

export function WalletDetailsView({
  wallet,
  transactions,
  isLoading,
  onAddFunds,
  onWithdraw
}: WalletDetailsViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>{wallet.providerName}</CardTitle>
          <CardDescription>Wallet Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <WalletCard wallet={wallet} />
          
          <div className="space-y-2">
            <Button 
              className="w-full" 
              onClick={onAddFunds}
            >
              Add Funds
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onWithdraw}
            >
              Withdraw Funds
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Transactions for {wallet.providerName}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <TransactionsList transactions={transactions || []} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
