
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Transaction } from '@/types/wallet';
import { formatCurrency } from '@/utils/currencyUtils';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink,
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { TransactionsListSkeleton } from './TransactionsListSkeleton';

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading?: boolean;
  pagination?: {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
  };
}

export const TransactionsList: React.FC<TransactionsListProps> = React.memo(({ 
  transactions,
  isLoading,
  pagination
}) => {
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

  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status) {
      case 'completed':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'failed':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getTypeVariant = (type: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (type) {
      case 'deposit':
        return 'default';
      case 'withdrawal':
        return 'secondary';
      case 'payment':
        return 'outline';
      case 'refund':
        return 'secondary';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return <TransactionsListSkeleton />;
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No transactions found.
      </div>
    );
  }

  // Generate pagination items
  const renderPaginationItems = () => {
    if (!pagination || pagination.totalPages <= 1) return null;
    
    const { page, totalPages, setPage } = pagination;
    const items = [];
    
    // Show first page, current page, and last page
    // Add ellipsis where needed
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= page - 1 && i <= page + 1) // Pages around current page
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              isActive={page === i}
              onClick={() => setPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        (i === 2 && page > 3) || // Show ellipsis after first page
        (i === totalPages - 1 && page < totalPages - 2) // Show ellipsis before last page
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    return items;
  };

  return (
    <div className="space-y-4">
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
                {transaction.type === "withdrawal" ? "-" : "+"}
                {formatCurrency(transaction.amount, transaction.currency)}
                {" "}
                <span className="text-xs text-muted-foreground">{transaction.currency}</span>
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

      {pagination && pagination.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => pagination.setPage(Math.max(1, pagination.page - 1))}
                aria-disabled={pagination.page === 1}
                className={pagination.page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationNext
                onClick={() => pagination.setPage(Math.min(pagination.totalPages, pagination.page + 1))}
                aria-disabled={pagination.page === pagination.totalPages}
                className={pagination.page === pagination.totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
});

TransactionsList.displayName = 'TransactionsList';
