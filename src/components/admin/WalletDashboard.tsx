
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { TransactionsList } from './TransactionsList';
import { walletService } from '@/services/wallet';
import { useToast } from "@/hooks/use-toast";
import type { Wallet, WalletCurrency } from '@/types/wallet';
import { FiatCurrency } from '@/types/wallet';
import { 
  useWalletData, 
  useWalletTransactions,
  useFilteredTransactions 
} from '@/hooks/useWalletData';
import { WalletDashboardHeader } from './WalletDashboardHeader';
import { WalletListings } from './WalletListings';
import { WalletDetailsView } from './WalletDetailsView';
import { WalletTransactionDialog } from './WalletTransactionDialog';
import { TransactionsListSkeleton } from './TransactionsListSkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const WalletDashboard: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('wallets');
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionCurrency, setTransactionCurrency] = useState<WalletCurrency>(FiatCurrency.EUR);
  
  const {
    wallets,
    transactions,
    isLoadingWallets,
    isLoadingTransactions,
    refetchWallets,
    refetchTransactions,
    walletsError,
    transactionsError
  } = useWalletData();

  const {
    walletTransactions,
    isLoadingWalletTransactions,
    refetchWalletTransactions,
    error: walletTransactionsError,
    pagination
  } = useWalletTransactions(selectedWallet?.providerId);

  // Use memoized filtered transactions
  const filteredTransactions = useFilteredTransactions(transactions, searchTerm);

  const handleWalletClick = useCallback((wallet: Wallet) => {
    setSelectedWallet(wallet);
    
    // Default to the currency of the wallet's first balance if available
    if (wallet.balances.length > 0) {
      setTransactionCurrency(wallet.balances[0].currency);
    }
    
    setSelectedTab('wallet-details');
  }, []);

  const handleRefresh = useCallback(() => {
    refetchWallets();
    refetchTransactions();
    if (selectedWallet) {
      refetchWalletTransactions();
    }
  }, [refetchWallets, refetchTransactions, refetchWalletTransactions, selectedWallet]);

  const handleAddFunds = async () => {
    if (!selectedWallet || !transactionAmount || isNaN(parseFloat(transactionAmount)) || parseFloat(transactionAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount.",
        variant: "destructive"
      });
      return;
    }

    try {
      if (transactionType === 'deposit') {
        await walletService.addFunds(
          selectedWallet.providerId,
          parseFloat(transactionAmount),
          transactionCurrency
        );
        toast({
          title: "Deposit successful",
          description: `Added ${transactionAmount} ${transactionCurrency} to ${selectedWallet.providerName}'s wallet.`
        });
      } else {
        await walletService.withdrawFunds(
          selectedWallet.providerId,
          parseFloat(transactionAmount),
          transactionCurrency
        );
        toast({
          title: "Withdrawal initiated",
          description: `Withdrawal of ${transactionAmount} ${transactionCurrency} from ${selectedWallet.providerName}'s wallet is pending.`
        });
      }

      setIsTransactionDialogOpen(false);
      setTransactionAmount('');
      handleRefresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const openAddFundsDialog = useCallback(() => {
    setTransactionType('deposit');
    setIsTransactionDialogOpen(true);
  }, []);

  const openWithdrawDialog = useCallback(() => {
    setTransactionType('withdrawal');
    setIsTransactionDialogOpen(true);
  }, []);

  const renderError = (error: Error | null, title: string) => {
    if (!error) return null;
    
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <WalletDashboardHeader 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRefresh={handleRefresh}
          isLoading={isLoadingWallets || isLoadingTransactions}
        />
        
        {walletsError && renderError(walletsError, "Failed to load wallets")}
        {transactionsError && renderError(transactionsError, "Failed to load transactions")}
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="wallets">All Wallets</TabsTrigger>
            <TabsTrigger value="transactions">All Transactions</TabsTrigger>
            {selectedWallet && (
              <TabsTrigger value="wallet-details">
                {selectedWallet.providerName}'s Wallet
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="wallets" className="mt-4">
            <WalletListings 
              wallets={wallets} 
              searchTerm={searchTerm}
              onWalletClick={handleWalletClick}
              isLoading={isLoadingWallets}
            />
          </TabsContent>
          
          <TabsContent value="transactions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Transactions</CardTitle>
                <CardDescription>Complete transaction history across all providers</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingTransactions ? (
                  <TransactionsListSkeleton />
                ) : (
                  <TransactionsList transactions={filteredTransactions || []} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {selectedWallet && (
            <TabsContent value="wallet-details" className="mt-4">
              <WalletDetailsView
                wallet={selectedWallet}
                transactions={walletTransactions}
                isLoading={isLoadingWalletTransactions}
                error={walletTransactionsError}
                onAddFunds={openAddFundsDialog}
                onWithdraw={openWithdrawDialog}
                pagination={pagination}
              />
            </TabsContent>
          )}
        </Tabs>

        <WalletTransactionDialog
          isOpen={isTransactionDialogOpen}
          onOpenChange={setIsTransactionDialogOpen}
          wallet={selectedWallet}
          transactionType={transactionType}
          transactionAmount={transactionAmount}
          transactionCurrency={transactionCurrency}
          onTransactionTypeChange={setTransactionType}
          onTransactionAmountChange={setTransactionAmount}
          onTransactionCurrencyChange={setTransactionCurrency}
          onSubmit={handleAddFunds}
        />
      </div>
    </ErrorBoundary>
  );
};
