"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from "lucide-react";
import { KPICard } from "@/components/analytics/kpi-card";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { StackedBarChart } from "@/components/analytics/stacked-bar-chart";
import {
  fetchAnalyticsData,
  getInitialDateRange,
} from "@/lib/analytics-service";
import type { AnalyticsData, DateRange } from "@/app/analytics/types";
import { DashboardMainWrapper } from "@/components/analytics/dashboard-ui";

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
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-6 px-3'>
          <h1 className='text-2xl'>Analytics</h1>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>

        <Tabs defaultValue='engagement' className='w-full space-y-7'>
          <TabsList className='flex-row items-center gap-1'>
            <TabsTrigger value='engagement'>Engagement</TabsTrigger>
            <TabsTrigger value='audience'>Audience</TabsTrigger>
            <TabsTrigger value='actions'>Actions</TabsTrigger>
            <TabsTrigger value='broadcasts'>Broadcasts</TabsTrigger>
          </TabsList>

          <TabsContent value='engagement'>
            <div className='space-y-2 bg-[#F6F6F5] dark:bg-[#111110] p-1 rounded-[28px]'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
                <KPICard
                  label='Active Users'
                  metric={analyticsData.metrics.activeUsers}
                />
                <KPICard
                  label='Conversations'
                  metric={analyticsData.metrics.conversations}
                />
                <KPICard
                  label='Answered Questions'
                  metric={analyticsData.metrics.answeredQuestions}
                />
                <KPICard
                  label='Time Created'
                  metric={analyticsData.metrics.timeCreated}
                />
              </div>

              <StackedBarChart data={analyticsData.chartData} />
            </div>
          </TabsContent>

          <TabsContent value='audience'>
            <div className='py-12 text-center'>
              <p className='text-lg font-medium mb-2'>Audience Analytics</p>
              <p className='text-sm'>Coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value='actions'>
            <div className='py-12 text-center'>
              <Lock className='h-12 w-12 mx-auto mb-4' />
              <p className='text-lg font-medium mb-2'>Actions Analytics</p>
              <p className='text-sm'>This feature is locked</p>
            </div>
          </TabsContent>

          <TabsContent value='broadcasts'>
            <div className='py-12 text-center'>
              <p className='text-lg font-medium mb-2'>Broadcasts Analytics</p>
              <p className='text-sm'>Coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardMainWrapper>
  );
}
