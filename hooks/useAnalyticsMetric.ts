import * as React from "react";
import type { AnalyticsData, DateRange } from "@/app/analytics/types";
import type { MetricId } from "@/lib/analytics/metric-configs";

interface MetricData {
  chartData: any[];
  metricValue: any;
  isLoading: boolean;
  error: Error | null;
}

interface UseAnalyticsMetricProps {
  metricId: MetricId;
  dateRange: DateRange;
  analyticsData: AnalyticsData | null;
  globalLoading: boolean;
}

export function useAnalyticsMetric({
  metricId,
  dateRange,
  analyticsData,
  globalLoading,
}: UseAnalyticsMetricProps): MetricData {
  const [error, setError] = React.useState<Error | null>(null);

  const chartData = React.useMemo(() => {
    if (!analyticsData) return [];

    switch (metricId) {
      case "activeUsers":
        return analyticsData.activeUsersChart;
      case "conversations":
        return analyticsData.conversationsChart;
      case "answeredQuestions":
        return analyticsData.answeredQuestionsChart;
      case "timeCreated":
        return analyticsData.timeCreatedChart;
      default:
        return [];
    }
  }, [analyticsData, metricId]);

  const metricValue = React.useMemo(() => {
    if (!analyticsData) return null;

    return analyticsData.metrics[metricId];
  }, [analyticsData, metricId]);

  React.useEffect(() => {
    // Reset error when data changes
    setError(null);
  }, [analyticsData, dateRange]);

  return {
    chartData,
    metricValue,
    isLoading: globalLoading,
    error,
  };
}