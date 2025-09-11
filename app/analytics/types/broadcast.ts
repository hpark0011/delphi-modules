export interface BroadcastMetric {
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  unit: 'percentage' | 'number';
}

export interface BroadcastMetrics {
  openRate: BroadcastMetric;
  engagementRate: BroadcastMetric;
  clickRate: BroadcastMetric;
  unsubscribeRate: BroadcastMetric;
}

export interface BroadcastFunnelData {
  stage: string;
  percentage: number;
  count: number;
}

export interface BroadcastData {
  latestBroadcast: {
    title: string;
    date: string;
  };
  metrics: BroadcastMetrics;
  funnelData: BroadcastFunnelData[];
}