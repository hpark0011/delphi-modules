"use client";

import type { AnalyticsData } from "@/app/analytics/types";
import { EngagementTab } from "@/app/analytics/_tabs_components/engagement";
import { fetchAnalyticsData } from "@/lib/analytics-service";
import * as React from "react";

export default function EngagementPage() {
  const [analyticsData, setAnalyticsData] =
    React.useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch engagement data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading || !analyticsData) {
    return (
      <div className="animate-pulse">
        <div className="h-8 rounded w-32 mb-8"></div>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded"></div>
          ))}
        </div>
        <div className="h-96 rounded"></div>
      </div>
    );
  }

  return <EngagementTab analyticsData={analyticsData} />;
}