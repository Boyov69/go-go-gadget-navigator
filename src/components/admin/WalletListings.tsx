
import React from 'react';
import { WalletCard } from './WalletCard';
import type { Wallet } from '@/services/wallet';

interface WalletListingsProps {
  wallets: Wallet[] | undefined;
  searchTerm: string;
  onWalletClick: (wallet: Wallet) => void;
}

export function WalletListings({ 
  wallets, 
  searchTerm, 
  onWalletClick 
}: WalletListingsProps) {
  const filteredWallets = wallets?.filter(wallet => 
    wallet.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.providerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!filteredWallets || filteredWallets.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {searchTerm ? "No wallets match your search" : "No provider wallets found"}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredWallets.map(wallet => (
        <WalletCard 
          key={wallet.id} 
          wallet={wallet}
          onClick={() => onWalletClick(wallet)}
        />
      ))}
    </div>
  );
}
