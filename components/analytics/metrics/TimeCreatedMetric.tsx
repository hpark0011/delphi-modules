import * as React from "react";
import type { DateRange } from "@/app/analytics/types";
import { useAnalyticsMetric } from "@/hooks/useAnalyticsMetric";
import { getMetricConfig } from "@/lib/analytics/metric-configs";
import { ChartFactory } from "@/components/analytics/charts/ChartFactory";
import { MetricLoadingState } from "@/components/analytics/MetricLoadingState";
import { MetricErrorState } from "@/components/analytics/MetricErrorState";

interface TimeCreatedMetricProps {
  dateRange: DateRange;
  analyticsData: any;
  globalLoading: boolean;
  onRetry?: () => void;
}

export function TimeCreatedMetric({
  dateRange,
  analyticsData,
  globalLoading,
  onRetry,
}: TimeCreatedMetricProps) {
  const config = getMetricConfig("timeCreated");
  const { chartData, isLoading, error } = useAnalyticsMetric({
    metricId: "timeCreated",
    dateRange,
    analyticsData,
    globalLoading,
  });

  if (isLoading) {
    return <MetricLoadingState title={config.label} />;
  }

  if (error) {
    return (
      <MetricErrorState
        title={config.label}
        error={error}
        onRetry={onRetry}
      />
    );
  }

  return (
    <ChartFactory
      type={config.chartType}
      data={chartData}
      title={config.label}
      color={config.color}
      dataKey={config.dataKey}
    />
  );
}