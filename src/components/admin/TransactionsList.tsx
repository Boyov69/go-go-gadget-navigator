
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction, WalletCurrency } from '@/services/wallet';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface TransactionsListProps {
  transactions: Transaction[];
}

const currencySymbols: Record<WalletCurrency, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  BTC: "₿",
  ETH: "Ξ",
  USDT: "₮",
  SOL: "◎"
};

export const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'default';
      case 'withdrawal':
        return 'secondary';
      case 'payment':
        return 'outline';
      case 'refund':
        return 'success';
      default:
        return 'default';
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No transactions found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
            <TableCell>{transaction.providerId}</TableCell>
            <TableCell>
              <Badge variant={getTypeVariant(transaction.type)}>
                {transaction.type}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">
              {transaction.type === "withdrawal" ? "-" : "+"}{currencySymbols[transaction.currency]}
              {transaction.amount.toLocaleString(undefined, {
                minimumFractionDigits: transaction.currency === "BTC" || transaction.currency === "ETH" ? 8 : 2,
                maximumFractionDigits: transaction.currency === "BTC" || transaction.currency === "ETH" ? 8 : 2
              })} {transaction.currency}
            </TableCell>
            <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1.5">
                {getStatusIcon(transaction.status)}
                <Badge variant={getStatusVariant(transaction.status)}>
                  {transaction.status}
                </Badge>
              </div>
            </TableCell>
            <TableCell className="max-w-[200px] truncate">{transaction.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
