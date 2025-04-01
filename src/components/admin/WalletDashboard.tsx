import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WalletCard } from './WalletCard';
import { TransactionsList } from './TransactionsList';
import { walletService, Transaction, FiatCurrency, CryptoCurrency, WalletCurrency } from '@/services/wallet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search } from 'lucide-react';
import type { Wallet } from '@/services/wallet';

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
    data: wallets, 
    isLoading: isLoadingWallets, 
    refetch: refetchWallets 
  } = useQuery({
    queryKey: ['admin-wallets'],
    queryFn: () => walletService.getAllWallets()
  });

  const { 
    data: transactions, 
    isLoading: isLoadingTransactions, 
    refetch: refetchTransactions 
  } = useQuery({
    queryKey: ['admin-transactions'],
    queryFn: () => walletService.getAllTransactions()
  });

  const { 
    data: selectedWalletTransactions,
    isLoading: isLoadingWalletTransactions,
    refetch: refetchWalletTransactions
  } = useQuery({
    queryKey: ['wallet-transactions', selectedWallet?.id],
    queryFn: () => selectedWallet ? walletService.getTransactions(selectedWallet.providerId) : Promise.resolve([]),
    enabled: !!selectedWallet
  });

  const filteredWallets = wallets?.filter(wallet => 
    wallet.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.providerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTransactions = transactions?.filter(transaction => 
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.providerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWalletClick = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setSelectedTab('wallet-details');
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
      refetchWallets();
      refetchTransactions();
      refetchWalletTransactions();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z"></path>
            <path d="M4 3h16"></path>
          </svg>
          Provider Wallets
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search wallets or transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={() => {
            refetchWallets();
            refetchTransactions();
            if (selectedWallet) {
              refetchWalletTransactions();
            }
          }}>
            Refresh
          </Button>
        </div>
      </div>
      
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
          {filteredWallets && filteredWallets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWallets.map(wallet => (
                <WalletCard 
                  key={wallet.id} 
                  wallet={wallet}
                  onClick={() => handleWalletClick(wallet)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "No wallets match your search" : "No provider wallets found"}
            </div>
          )}
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>{selectedWallet.providerName}</CardTitle>
                  <CardDescription>Wallet Details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <WalletCard wallet={selectedWallet} />
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setTransactionType('deposit');
                        setIsTransactionDialogOpen(true);
                      }}
                    >
                      Add Funds
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setTransactionType('withdrawal');
                        setIsTransactionDialogOpen(true);
                      }}
                    >
                      Withdraw Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Transactions for {selectedWallet.providerName}</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingWalletTransactions ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <TransactionsList transactions={selectedWalletTransactions || []} />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>

      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {transactionType === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
            </DialogTitle>
            <DialogDescription>
              {transactionType === 'deposit' 
                ? `Add funds to ${selectedWallet?.providerName}'s wallet.`
                : `Withdraw funds from ${selectedWallet?.providerName}'s wallet.`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="currency" className="text-sm font-medium">Currency</label>
              <Select
                value={transactionCurrency}
                onValueChange={(value) => setTransactionCurrency(value as WalletCurrency)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={FiatCurrency.EUR}>{FiatCurrency.EUR} - Euro</SelectItem>
                  <SelectItem value={FiatCurrency.USD}>{FiatCurrency.USD} - US Dollar</SelectItem>
                  <SelectItem value={FiatCurrency.GBP}>{FiatCurrency.GBP} - British Pound</SelectItem>
                  <SelectItem value={CryptoCurrency.BTC}>{CryptoCurrency.BTC} - Bitcoin</SelectItem>
                  <SelectItem value={CryptoCurrency.ETH}>{CryptoCurrency.ETH} - Ethereum</SelectItem>
                  <SelectItem value={CryptoCurrency.USDT}>{CryptoCurrency.USDT} - Tether</SelectItem>
                  <SelectItem value={CryptoCurrency.SOL}>{CryptoCurrency.SOL} - Solana</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">Amount</label>
              <Input
                id="amount"
                type="number"
                step={transactionCurrency.includes("BTC") || transactionCurrency.includes("ETH") ? "0.00000001" : "0.01"}
                placeholder="Enter amount"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransactionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFunds}>
              {transactionType === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
