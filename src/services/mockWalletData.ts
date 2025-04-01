
import { Wallet, Transaction, FiatCurrency, CryptoCurrency, WalletCurrencyType } from '@/types/wallet';

// Mock wallet data
export const mockWallets: Wallet[] = [
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

// Mock transaction data
export const mockTransactions: Transaction[] = [
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
