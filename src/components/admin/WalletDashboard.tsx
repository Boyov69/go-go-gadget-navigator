
import React, { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { Wallet } from '@/types/wallet';
import { 
  useWalletData, 
  useWalletTransactions,
  useFilteredTransactions 
} from '@/hooks/useWalletData';
import { WalletDashboardHeader } from './WalletDashboardHeader';
import { WalletTransactionTabs } from './WalletTransactionTabs';
import { WalletTransactionHandler } from './WalletTransactionHandler';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { FiatCurrency } from '@/types/wallet';

export const WalletDashboard: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('wallets');
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  
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
      // No need to set transaction currency here as it's handled in WalletTransactionHandler
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

  const openAddFundsDialog = useCallback(() => {
    setIsTransactionDialogOpen(true);
  }, []);

  const openWithdrawDialog = useCallback(() => {
    setIsTransactionDialogOpen(true);
  }, []);

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <WalletDashboardHeader 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRefresh={handleRefresh}
          isLoading={isLoadingWallets || isLoadingTransactions}
        />
        
        <WalletTransactionTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          wallets={wallets}
          transactions={transactions}
          filteredTransactions={filteredTransactions}
          searchTerm={searchTerm}
          selectedWallet={selectedWallet}
          isLoadingWallets={isLoadingWallets}
          isLoadingTransactions={isLoadingTransactions}
          isLoadingWalletTransactions={isLoadingWalletTransactions}
          walletTransactions={walletTransactions}
          walletsError={walletsError}
          transactionsError={transactionsError}
          walletTransactionsError={walletTransactionsError}
          pagination={pagination}
          handleWalletClick={handleWalletClick}
          openAddFundsDialog={openAddFundsDialog}
          openWithdrawDialog={openWithdrawDialog}
        />
        
        <WalletTransactionHandler
          selectedWallet={selectedWallet}
          isTransactionDialogOpen={isTransactionDialogOpen}
          setIsTransactionDialogOpen={setIsTransactionDialogOpen}
          refetchWallets={refetchWallets}
          refetchTransactions={refetchTransactions}
          refetchWalletTransactions={refetchWalletTransactions}
        />
      </div>
    </ErrorBoundary>
  );
};
