
import { useQuery } from "@tanstack/react-query";
import { walletService, Wallet, Transaction } from '@/services/wallet';

export function useWalletData() {
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

  return {
    wallets,
    transactions,
    isLoadingWallets,
    isLoadingTransactions,
    refetchWallets,
    refetchTransactions
  };
}

export function useWalletTransactions(providerId: string | undefined) {
  const { 
    data: walletTransactions,
    isLoading: isLoadingWalletTransactions,
    refetch: refetchWalletTransactions
  } = useQuery({
    queryKey: ['wallet-transactions', providerId],
    queryFn: () => providerId ? walletService.getTransactions(providerId) : Promise.resolve([]),
    enabled: !!providerId
  });

  return {
    walletTransactions,
    isLoadingWalletTransactions,
    refetchWalletTransactions
  };
}
