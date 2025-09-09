"use client";

import type { AnalyticsData } from "@/app/analytics/types";
import { EngagementTab } from "@/app/analytics/_tabs_components/engagement";
import { fetchAnalyticsData } from "@/lib/analytics-service";
import * as React from "react";

export default function EngagementPage() {
  const [analyticsData, setAnalyticsData] =
    React.useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  console.log("analyticsData::::", analyticsData);
  console.log("isLoading::::", isLoading);

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

  return <EngagementTab analyticsData={analyticsData} isLoading={isLoading} />;
}
