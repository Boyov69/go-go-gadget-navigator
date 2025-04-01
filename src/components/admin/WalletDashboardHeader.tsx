
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from 'lucide-react';

interface WalletDashboardHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export function WalletDashboardHeader({ 
  searchTerm, 
  onSearchChange, 
  onRefresh,
  isLoading 
}: WalletDashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9Z"></path>
          <path d="M4 3h16"></path>
        </svg>
        Provider Wallets
      </h2>

      <div className="flex items-center gap-2">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search wallets or transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <Button onClick={onRefresh} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Refresh
        </Button>
      </div>
    </div>
  );
}
