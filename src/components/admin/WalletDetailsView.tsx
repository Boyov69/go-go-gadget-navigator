
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Transaction } from '@/types/wallet';
import { WalletCard } from './WalletCard';
import { TransactionsList } from './TransactionsList';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TransactionsListSkeleton } from './TransactionsListSkeleton';

interface WalletDetailsViewProps {
  wallet: Wallet;
  transactions: Transaction[] | undefined;
  isLoading: boolean;
  error?: Error | null;
  onAddFunds: () => void;
  onWithdraw: () => void;
  pagination?: {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
  };
}

export const WalletDetailsView: React.FC<WalletDetailsViewProps> = React.memo(({
  wallet,
  transactions,
  isLoading,
  error,
  onAddFunds,
  onWithdraw,
  pagination
}) => {
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
            <TransactionsListSkeleton />
          ) : error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message || 'Failed to load transactions'}
              </AlertDescription>
            </Alert>
          ) : (
            <TransactionsList 
              transactions={transactions || []} 
              pagination={pagination}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
});

WalletDetailsView.displayName = 'WalletDetailsView';
