export type ChartType = "area" | "bar" | "stacked" | "line";

export interface MetricConfig {
  id: string;
  label: string;
  color: string;
  chartType: ChartType;
  dataKey: string;
}

export const METRIC_CONFIGS: Record<string, MetricConfig> = {
  activeUsers: {
    id: "activeUsers",
    label: "Active Users",
    color: "#22c55e",
    chartType: "area",
    dataKey: "value",
  },
  conversations: {
    id: "conversations", 
    label: "Conversations",
    color: "#3b82f6",
    chartType: "area",
    dataKey: "value",
  },
  answeredQuestions: {
    id: "answeredQuestions",
    label: "Answered Questions", 
    color: "#f59e0b",
    chartType: "stacked",
    dataKey: "answered",
  },
  timeCreated: {
    id: "timeCreated",
    label: "Time Created",
    color: "#8b5cf6", 
    chartType: "area",
    dataKey: "value",
  },
} as const;

export type MetricId = keyof typeof METRIC_CONFIGS;

export function getMetricConfig(id: MetricId): MetricConfig {
  return METRIC_CONFIGS[id];
}

export function getAllMetricConfigs(): MetricConfig[] {
  return Object.values(METRIC_CONFIGS);
}