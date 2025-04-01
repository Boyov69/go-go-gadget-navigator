
import { 
  Wallet, 
  Transaction, 
  WalletCurrency, 
  WalletCurrencyType,
  CryptoCurrency,
  WalletServiceInterface,
  FiatCurrency
} from '@/types/wallet';
import { mockWallets, mockTransactions } from './mockWalletData';

// Mock wallet service implementation
class MockWalletService implements WalletServiceInterface {
  private wallets: Wallet[] = [...mockWallets];
  private transactions: Transaction[] = [...mockTransactions];

  // Get all wallets (super admin only)
  async getAllWallets(): Promise<Wallet[]> {
    return Promise.resolve([...this.wallets]);
  }

  // Get wallet by provider ID (provider can access their own)
  async getWalletByProviderId(providerId: string): Promise<Wallet | null> {
    const wallet = this.wallets.find(w => w.providerId === providerId);
    return Promise.resolve(wallet || null);
  }

  // Get transactions for wallet
  async getTransactions(providerId: string): Promise<Transaction[]> {
    return Promise.resolve(this.transactions.filter(t => t.providerId === providerId));
  }

  // Get all transactions (super admin only)
  async getAllTransactions(): Promise<Transaction[]> {
    return Promise.resolve([...this.transactions]);
  }

  // Add funds to wallet
  async addFunds(providerId: string, amount: number, currency: WalletCurrency): Promise<Transaction> {
    const wallet = this.wallets.find(w => w.providerId === providerId);
    if (!wallet) throw new Error("Wallet not found");

    const balance = wallet.balances.find(b => b.currency === currency);
    if (balance) {
      balance.amount += amount;
    } else {
      wallet.balances.push({
        currency,
        type: Object.values(CryptoCurrency).includes(currency as CryptoCurrency) 
          ? WalletCurrencyType.CRYPTO 
          : WalletCurrencyType.FIAT,
        amount
      });
    }

    wallet.lastUpdated = new Date().toISOString();

    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      providerId,
      amount,
      currency,
      type: "deposit",
      status: "completed",
      description: `Deposit of ${amount} ${currency}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.transactions.push(transaction);
    return Promise.resolve(transaction);
  }

  // Withdraw funds from wallet
  async withdrawFunds(providerId: string, amount: number, currency: WalletCurrency): Promise<Transaction> {
    const wallet = this.wallets.find(w => w.providerId === providerId);
    if (!wallet) throw new Error("Wallet not found");

    const balance = wallet.balances.find(b => b.currency === currency);
    if (!balance || balance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    balance.amount -= amount;
    wallet.lastUpdated = new Date().toISOString();

    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      providerId,
      amount,
      currency,
      type: "withdrawal",
      status: "pending", // Usually pending until approved
      description: `Withdrawal of ${amount} ${currency}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.transactions.push(transaction);
    return Promise.resolve(transaction);
  }

  // Update transaction status (admin only)
  async updateTransactionStatus(transactionId: string, status: "pending" | "completed" | "failed"): Promise<Transaction> {
    const transaction = this.transactions.find(t => t.id === transactionId);
    if (!transaction) throw new Error("Transaction not found");

    transaction.status = status;
    transaction.updatedAt = new Date().toISOString();

    return Promise.resolve(transaction);
  }
}

// Create a real API service implementation that can be used later
class ApiWalletService implements WalletServiceInterface {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Implementation for future real API calls
  async getAllWallets(): Promise<Wallet[]> {
    // This would be replaced with actual API call
    return Promise.resolve([]);
  }

  async getWalletByProviderId(providerId: string): Promise<Wallet | null> {
    // This would be replaced with actual API call
    return Promise.resolve(null);
  }

  async getTransactions(providerId: string): Promise<Transaction[]> {
    // This would be replaced with actual API call
    return Promise.resolve([]);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    // This would be replaced with actual API call
    return Promise.resolve([]);
  }

  async addFunds(providerId: string, amount: number, currency: WalletCurrency): Promise<Transaction> {
    // This would be replaced with actual API call
    throw new Error("Not implemented");
  }

  async withdrawFunds(providerId: string, amount: number, currency: WalletCurrency): Promise<Transaction> {
    // This would be replaced with actual API call
    throw new Error("Not implemented");
  }

  async updateTransactionStatus(transactionId: string, status: "pending" | "completed" | "failed"): Promise<Transaction> {
    // This would be replaced with actual API call
    throw new Error("Not implemented");
  }
}

// Export the mock service by default
// In the future, this could be switched to the API implementation
export const walletService: WalletServiceInterface = new MockWalletService();

// Re-export types from the types file
export type { Wallet, Transaction, WalletCurrency, WalletServiceInterface };
export { WalletCurrencyType, FiatCurrency, CryptoCurrency };
