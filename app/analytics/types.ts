export interface AnalyticsData {
  dateRange: DateRange;
  metrics: MetricsData;
  chartData: ChartDataPoint[];
  activeUsersChart: Array<{ date: string; value: number }>;
  conversationsChart: Array<{ date: string; value: number }>;
  answeredQuestionsChart: Array<{ date: string; value: number }>;
  timeCreatedChart: Array<{ date: string; value: number }>;
  isLoading?: boolean;
  error?: Error | null;
}

export interface DateRange {
  start: Date;
  end: Date;
  period: PeriodType;
}

export type PeriodType = "1d" | "7d" | "30d";

export interface MetricsData {
  activeUsers: MetricValue;
  conversations: MetricValue;
  answeredQuestions: QuestionMetric;
  timeCreated: TimeMetric;
}

export interface MetricValue {
  value: number;
  change: number;
  isPositive: boolean;
  formatted?: string;
}

export interface QuestionMetric extends MetricValue {
  answered: number;
  total: number;
}

export interface TimeMetric extends MetricValue {
  hours: number;
  minutes: number;
}

export interface ChartDataPoint {
  date: string;
  dateFormatted: string;
  answered: number;
  unanswered: number;
  total: number;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
  badge?: string | number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface SidebarUser {
  name: string;
  avatar?: string;
  credits?: number;
}

export type TabType = "engagement" | "audience" | "actions";

export interface AnalyticsTab {
  id: TabType;
  label: string;
  disabled?: boolean;
  icon?: string;
}
