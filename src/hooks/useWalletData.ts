
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from 'react';
import { walletService } from '@/services/wallet';
import type { Wallet, Transaction } from '@/types/wallet';

export function useWalletData() {
  const [walletsError, setWalletsError] = useState<Error | null>(null);
  const [transactionsError, setTransactionsError] = useState<Error | null>(null);
  
  const { 
    data: wallets, 
    isLoading: isLoadingWallets, 
    refetch: refetchWallets,
    error: walletsQueryError
  } = useQuery({
    queryKey: ['admin-wallets'],
    queryFn: () => walletService.getAllWallets(),
    meta: {
      onError: (error: Error) => {
        setWalletsError(error);
        console.error('Error fetching wallets:', error);
      }
    }
  });

  const { 
    data: transactions, 
    isLoading: isLoadingTransactions, 
    refetch: refetchTransactions,
    error: transactionsQueryError
  } = useQuery({
    queryKey: ['admin-transactions'],
    queryFn: () => walletService.getAllTransactions(),
    meta: {
      onError: (error: Error) => {
        setTransactionsError(error);
        console.error('Error fetching transactions:', error);
      }
    }
  });

  return {
    wallets,
    transactions,
    isLoadingWallets,
    isLoadingTransactions,
    refetchWallets,
    refetchTransactions,
    walletsError: walletsError || walletsQueryError as Error | null, 
    transactionsError: transactionsError || transactionsQueryError as Error | null
  };
}

export function useWalletTransactions(providerId: string | undefined) {
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const { 
    data: walletTransactions,
    isLoading: isLoadingWalletTransactions,
    refetch: refetchWalletTransactions,
    error: queryError
  } = useQuery({
    queryKey: ['wallet-transactions', providerId, page, pageSize],
    queryFn: () => providerId ? walletService.getTransactions(providerId) : Promise.resolve([]),
    enabled: !!providerId,
    meta: {
      onError: (error: Error) => {
        setError(error);
        console.error('Error fetching wallet transactions:', error);
      }
    }
  });
  
  // Calculate paginated transactions
  const paginatedTransactions = useMemo(() => {
    if (!walletTransactions) return [];
    
    const startIndex = (page - 1) * pageSize;
    return walletTransactions.slice(startIndex, startIndex + pageSize);
  }, [walletTransactions, page, pageSize]);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!walletTransactions) return 0;
    return Math.ceil(walletTransactions.length / pageSize);
  }, [walletTransactions, pageSize]);

  return {
    walletTransactions: paginatedTransactions,
    allTransactions: walletTransactions,
    isLoadingWalletTransactions,
    refetchWalletTransactions,
    error: error || queryError as Error | null,
    pagination: {
      page,
      pageSize,
      setPage,
      setPageSize,
      totalPages,
      totalItems: walletTransactions?.length || 0
    }
  };
}

export function useFilteredWallets(wallets: Wallet[] | undefined, searchTerm: string) {
  return useMemo(() => {
    if (!wallets) return [];
    
    if (!searchTerm) return wallets;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return wallets.filter(wallet => 
      wallet.providerName.toLowerCase().includes(lowerSearchTerm) ||
      wallet.id.toLowerCase().includes(lowerSearchTerm) ||
      wallet.providerId.toLowerCase().includes(lowerSearchTerm)
    );
  }, [wallets, searchTerm]);
}

export function useFilteredTransactions(transactions: Transaction[] | undefined, searchTerm: string) {
  return useMemo(() => {
    if (!transactions) return [];
    
    if (!searchTerm) return transactions;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return transactions.filter(transaction => 
      transaction.id.toLowerCase().includes(lowerSearchTerm) ||
      transaction.providerId.toLowerCase().includes(lowerSearchTerm) ||
      transaction.description.toLowerCase().includes(lowerSearchTerm)
    );
  }, [transactions, searchTerm]);
}
