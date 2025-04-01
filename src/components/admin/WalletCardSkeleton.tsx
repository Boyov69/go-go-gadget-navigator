
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const WalletCardSkeleton: React.FC = React.memo(() => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-[180px]" />
        <Skeleton className="h-4 w-[150px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="border-b pb-2">
            <div className="flex items-center gap-2 mb-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

WalletCardSkeleton.displayName = 'WalletCardSkeleton';
