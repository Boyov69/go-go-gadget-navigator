
export enum WalletCurrencyType {
  FIAT = "fiat",
  CRYPTO = "crypto"
}

export enum FiatCurrency {
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP"
}

export enum CryptoCurrency {
  BTC = "BTC",
  ETH = "ETH",
  USDT = "USDT",
  SOL = "SOL"
}

export type WalletCurrency = FiatCurrency | CryptoCurrency;

export interface Transaction {
  id: string;
  providerId: string;
  amount: number;
  currency: WalletCurrency;
  type: "deposit" | "withdrawal" | "payment" | "refund";
  status: "pending" | "completed" | "failed";
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  id: string;
  providerId: string;
  providerName: string;
  balances: {
    currency: WalletCurrency;
    type: WalletCurrencyType;
    amount: number;
  }[];
  lastUpdated: string;
}

// Mock wallet service
class WalletService {
  // Mock data
  private wallets: Wallet[] = [
    {
      id: "wallet-1",
      providerId: "provider-1",
      providerName: "Express Transport",
      balances: [
        { currency: FiatCurrency.EUR, type: WalletCurrencyType.FIAT, amount: 5420.50 },
        { currency: CryptoCurrency.BTC, type: WalletCurrencyType.CRYPTO, amount: 0.15 }
      ],
      lastUpdated: new Date().toISOString()
    },
    {
      id: "wallet-2",
      providerId: "provider-2",
      providerName: "Cargo Masters",
      balances: [
        { currency: FiatCurrency.EUR, type: WalletCurrencyType.FIAT, amount: 1250.75 },
        { currency: CryptoCurrency.ETH, type: WalletCurrencyType.CRYPTO, amount: 2.5 }
      ],
      lastUpdated: new Date().toISOString()
    },
    {
      id: "wallet-3",
      providerId: "provider-3",
      providerName: "Swift Delivery",
      balances: [
        { currency: FiatCurrency.USD, type: WalletCurrencyType.FIAT, amount: 3750.25 },
        { currency: CryptoCurrency.SOL, type: WalletCurrencyType.CRYPTO, amount: 45.8 }
      ],
      lastUpdated: new Date().toISOString()
    }
  ];

  private transactions: Transaction[] = [
    {
      id: "tx-1",
      providerId: "provider-1",
      amount: 500,
      currency: FiatCurrency.EUR,
      type: "deposit",
      status: "completed",
      description: "Monthly payment",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "tx-2",
      providerId: "provider-1",
      amount: 0.05,
      currency: CryptoCurrency.BTC,
      type: "deposit",
      status: "completed",
      description: "Crypto payment",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "tx-3",
      providerId: "provider-2",
      amount: 250.75,
      currency: FiatCurrency.EUR,
      type: "withdrawal",
      status: "pending",
      description: "Withdrawal request",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

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

export const walletService = new WalletService();
