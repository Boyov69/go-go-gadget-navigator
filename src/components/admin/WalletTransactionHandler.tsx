
import React, { useState } from 'react';
import { walletService } from '@/services/wallet';
import { useToast } from "@/hooks/use-toast";
import type { Wallet, WalletCurrency } from '@/types/wallet';
import { WalletTransactionDialog } from './WalletTransactionDialog';
import { FiatCurrency } from '@/types/wallet';

interface WalletTransactionHandlerProps {
  selectedWallet: Wallet | null;
  isTransactionDialogOpen: boolean;
  setIsTransactionDialogOpen: (isOpen: boolean) => void;
  refetchWallets: () => void;
  refetchTransactions: () => void;
  refetchWalletTransactions: () => void;
}

export const WalletTransactionHandler: React.FC<WalletTransactionHandlerProps> = ({
  selectedWallet,
  isTransactionDialogOpen,
  setIsTransactionDialogOpen,
  refetchWallets,
  refetchTransactions,
  refetchWalletTransactions
}) => {
  const { toast } = useToast();
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionCurrency, setTransactionCurrency] = useState<WalletCurrency>(FiatCurrency.EUR);

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
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
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
  );
};
