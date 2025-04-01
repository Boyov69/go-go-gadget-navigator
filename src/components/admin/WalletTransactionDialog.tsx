
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, WalletCurrency, FiatCurrency, CryptoCurrency } from '@/types/wallet';

interface WalletTransactionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  wallet: Wallet | null;
  transactionType: 'deposit' | 'withdrawal';
  transactionAmount: string;
  transactionCurrency: WalletCurrency;
  onTransactionTypeChange: (type: 'deposit' | 'withdrawal') => void;
  onTransactionAmountChange: (amount: string) => void;
  onTransactionCurrencyChange: (currency: WalletCurrency) => void;
  onSubmit: () => void;
}

export const WalletTransactionDialog: React.FC<WalletTransactionDialogProps> = React.memo(({
  isOpen,
  onOpenChange,
  wallet,
  transactionType,
  transactionAmount,
  transactionCurrency,
  onTransactionTypeChange,
  onTransactionAmountChange,
  onTransactionCurrencyChange,
  onSubmit
}) => {
  // Determine step size based on currency
  const getStepSize = (currency: WalletCurrency) => {
    if (currency === 'BTC' || currency === 'ETH') return "0.00000001";
    return "0.01";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {transactionType === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
          </DialogTitle>
          <DialogDescription>
            {transactionType === 'deposit' 
              ? `Add funds to ${wallet?.providerName}'s wallet.`
              : `Withdraw funds from ${wallet?.providerName}'s wallet.`
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="currency" className="text-sm font-medium">Currency</label>
            <Select
              value={transactionCurrency}
              onValueChange={(value) => onTransactionCurrencyChange(value as WalletCurrency)}
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
              step={getStepSize(transactionCurrency)}
              placeholder="Enter amount"
              value={transactionAmount}
              onChange={(e) => onTransactionAmountChange(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            {transactionType === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

WalletTransactionDialog.displayName = 'WalletTransactionDialog';
