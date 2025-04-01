
import { WalletCurrency, WalletCurrencyType } from '@/types/wallet';

// Currency symbol mappings
export const currencySymbols: Record<WalletCurrency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  BTC: "₿",
  ETH: "Ξ",
  USDT: "₮",
  SOL: "◎"
};

/**
 * Formats currency amount with appropriate decimal places
 */
export const formatCurrencyAmount = (
  amount: number, 
  currency: WalletCurrency, 
  type?: WalletCurrencyType
): string => {
  // Determine if this is a crypto currency that needs more decimal places
  const isCrypto = type === WalletCurrencyType.CRYPTO || 
    ['BTC', 'ETH', 'USDT', 'SOL'].includes(currency);
  
  // For small crypto amounts, show 8 decimal places
  const decimals = isCrypto 
    ? (amount < 1 ? 8 : 4) 
    : 2;
  
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

/**
 * Formats currency with symbol and appropriate decimals
 */
export const formatCurrency = (
  amount: number, 
  currency: WalletCurrency, 
  type?: WalletCurrencyType
): string => {
  const symbol = currencySymbols[currency] || '';
  const formattedAmount = formatCurrencyAmount(amount, currency, type);
  return `${symbol}${formattedAmount}`;
};
