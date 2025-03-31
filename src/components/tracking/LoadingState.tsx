
import React from "react";
import { Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoadingState: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="h-5 w-5" />
          Finding Your Driver
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-60">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-primary border-b-primary/20 border-l-primary/20 animate-spin" />
          <p className="text-muted-foreground">Connecting with nearby drivers...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
