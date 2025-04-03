
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { TransactionsList } from './TransactionsList';
import { WalletListings } from './WalletListings';
import { WalletDetailsView } from './WalletDetailsView';
import { TransactionsListSkeleton } from './TransactionsListSkeleton';
import type { Wallet } from '@/types/wallet';

interface WalletTransactionTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  wallets: any[];
  transactions: any[];
  filteredTransactions: any[];
  searchTerm: string;
  selectedWallet: Wallet | null;
  isLoadingWallets: boolean;
  isLoadingTransactions: boolean;
  isLoadingWalletTransactions: boolean;
  walletTransactions: any[];
  walletsError: Error | null;
  transactionsError: Error | null;
  walletTransactionsError: Error | null;
  pagination: any;
  handleWalletClick: (wallet: Wallet) => void;
  openAddFundsDialog: () => void;
  openWithdrawDialog: () => void;
}

export const WalletTransactionTabs: React.FC<WalletTransactionTabsProps> = ({
  selectedTab,
  setSelectedTab,
  wallets,
  transactions,
  filteredTransactions,
  searchTerm,
  selectedWallet,
  isLoadingWallets,
  isLoadingTransactions,
  isLoadingWalletTransactions,
  walletTransactions,
  walletsError,
  transactionsError,
  walletTransactionsError,
  pagination,
  handleWalletClick,
  openAddFundsDialog,
  openWithdrawDialog
}) => {
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
    <>
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
    </>
  );
};
