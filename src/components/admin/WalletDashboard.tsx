
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';
import { TransactionsList } from './TransactionsList';
import { walletService, FiatCurrency, WalletCurrency } from '@/services/wallet';
import { useToast } from "@/hooks/use-toast";
import type { Wallet } from '@/services/wallet';
import { useWalletData, useWalletTransactions } from '@/hooks/useWalletData';
import { WalletDashboardHeader } from './WalletDashboardHeader';
import { WalletListings } from './WalletListings';
import { WalletDetailsView } from './WalletDetailsView';
import { WalletTransactionDialog } from './WalletTransactionDialog';

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
    refetchTransactions
  } = useWalletData();

  const {
    walletTransactions,
    isLoadingWalletTransactions,
    refetchWalletTransactions
  } = useWalletTransactions(selectedWallet?.providerId);

  const filteredTransactions = transactions?.filter(transaction => 
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.providerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWalletClick = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setSelectedTab('wallet-details');
  };

  const handleRefresh = () => {
    refetchWallets();
    refetchTransactions();
    if (selectedWallet) {
      refetchWalletTransactions();
    }
  };

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

  const openAddFundsDialog = () => {
    setTransactionType('deposit');
    setIsTransactionDialogOpen(true);
  };

  const openWithdrawDialog = () => {
    setTransactionType('withdrawal');
    setIsTransactionDialogOpen(true);
  };

  if (isLoadingWallets || isLoadingTransactions) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WalletDashboardHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={handleRefresh}
        isLoading={isLoadingWallets || isLoadingTransactions}
      />
      
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
          />
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history across all providers</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionsList transactions={filteredTransactions || []} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {selectedWallet && (
          <TabsContent value="wallet-details" className="mt-4">
            <WalletDetailsView
              wallet={selectedWallet}
              transactions={walletTransactions}
              isLoading={isLoadingWalletTransactions}
              onAddFunds={openAddFundsDialog}
              onWithdraw={openWithdrawDialog}
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
  );
};
