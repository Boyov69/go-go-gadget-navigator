
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

export interface WalletServiceInterface {
  getAllWallets(): Promise<Wallet[]>;
  getWalletByProviderId(providerId: string): Promise<Wallet | null>;
  getTransactions(providerId: string): Promise<Transaction[]>;
  getAllTransactions(): Promise<Transaction[]>;
  addFunds(providerId: string, amount: number, currency: WalletCurrency): Promise<Transaction>;
  withdrawFunds(providerId: string, amount: number, currency: WalletCurrency): Promise<Transaction>;
  updateTransactionStatus(transactionId: string, status: "pending" | "completed" | "failed"): Promise<Transaction>;
}
