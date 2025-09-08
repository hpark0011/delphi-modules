import * as React from "react";
import { AlertCircle } from "lucide-react";

interface MetricErrorStateProps {
  title: string;
  error: Error;
  onRetry?: () => void;
}

export function MetricErrorState({ title, error, onRetry }: MetricErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-medium mb-2">{title} Error</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {error.message || "Failed to load metric data"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-primary hover:underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}