"use client";

import type { AnalyticsData, DateRange } from "@/app/analytics/types";
import { ActionsTab } from "@/app/analytics/tabs/actions";
import { AudienceTab } from "@/app/analytics/tabs/audience";
import { BroadcastsTab } from "@/app/analytics/tabs/broadcasts";
import { EngagementTab } from "@/app/analytics/tabs/engagement";
import { DashboardMainWrapper } from "@/components/analytics/dashboard-ui";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchAnalyticsData,
  getInitialDateRange,
} from "@/lib/analytics-service";
import * as React from "react";

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] =
    React.useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange>(
    getInitialDateRange()
  );
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAnalyticsData(dateRange);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dateRange]);

  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
  };

  if (isLoading || !analyticsData) {
    return (
      <DashboardMainWrapper>
        <div className='animate-pulse'>
          <div className='h-8 rounded w-32 mb-8'></div>
          <div className='grid grid-cols-4 gap-4 mb-8'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='h-32  rounded'></div>
            ))}
          </div>
          <div className='h-96  rounded'></div>
        </div>
      </DashboardMainWrapper>
    );
  }

  return (
    <DashboardMainWrapper>
      <div className=''>
        <div className='flex items-center justify-between mb-6 px-3'>
          <h1 className='text-2xl'>Analytics</h1>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>

        <Tabs defaultValue='engagement' className='w-full'>
          <TabsList className='flex-row items-center gap-0.5 mb-7'>
            <TabsTrigger value='engagement'>Engagement</TabsTrigger>
            <TabsTrigger value='audience'>Audience</TabsTrigger>
            <TabsTrigger value='actions'>Actions</TabsTrigger>
            <TabsTrigger value='broadcasts'>Broadcasts</TabsTrigger>
          </TabsList>

          <TabsContent value='engagement'>
            <EngagementTab analyticsData={analyticsData} />
          </TabsContent>

          <TabsContent value='audience'>
            <AudienceTab />
          </TabsContent>

          <TabsContent value='actions'>
            <ActionsTab />
          </TabsContent>

          <TabsContent value='broadcasts'>
            <BroadcastsTab />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardMainWrapper>
  );
}
