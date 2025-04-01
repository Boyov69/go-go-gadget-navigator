
import React from 'react';
import { WalletCard } from './WalletCard';
import type { Wallet } from '@/types/wallet';
import { WalletCardSkeleton } from './WalletCardSkeleton';
import { useFilteredWallets } from '@/hooks/useWalletData';

interface WalletListingsProps {
  wallets: Wallet[] | undefined;
  searchTerm: string;
  onWalletClick: (wallet: Wallet) => void;
  isLoading?: boolean;
}

export const WalletListings: React.FC<WalletListingsProps> = React.memo(({ 
  wallets, 
  searchTerm, 
  onWalletClick,
  isLoading 
}) => {
  // Use the memoized filtered wallets
  const filteredWallets = useFilteredWallets(wallets, searchTerm);

  if (isLoading) {
    // Show skeleton UI during loading
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, index) => (
          <WalletCardSkeleton key={index} />
        ))}
      </div>
    );
  }

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
});

WalletListings.displayName = 'WalletListings';
