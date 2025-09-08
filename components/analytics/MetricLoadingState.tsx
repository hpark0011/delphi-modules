import * as React from "react";

interface MetricLoadingStateProps {
  title: string;
}

export function MetricLoadingState({ title }: MetricLoadingStateProps) {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-muted rounded w-32 mb-4"></div>
      <div className="h-64 bg-muted rounded-lg"></div>
    </div>
  );
}