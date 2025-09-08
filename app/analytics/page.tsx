"use client";

import type { AnalyticsData, DateRange } from "@/app/analytics/types";
import {
  DashboardMainWrapper,
  Divider,
} from "@/components/analytics/dashboard-ui";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { KPICard } from "@/components/analytics/kpi-card";
import { AreaChartComponent } from "@/components/analytics/area-chart";
import { StackedQuestionsChart } from "@/components/analytics/stacked-questions-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchAnalyticsData,
  getInitialDateRange,
} from "@/lib/analytics-service";
import { Lock } from "lucide-react";
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
            <div className='bg-[#F6F6F5] dark:bg-[#111110] rounded-[28px] p-1'>
              <Tabs defaultValue='activeUsers' className='w-full'>
                <TabsList className='flex w-full gap-1 h-auto p-0 justify-between'>
                  <TabsTrigger
                    value='activeUsers'
                    className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card dark:data-[state=active]:border-none bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900'
                  >
                    <KPICard
                      label='Active Users'
                      metric={analyticsData.metrics.activeUsers}
                    />
                  </TabsTrigger>
                  <Divider />
                  <TabsTrigger
                    value='conversations'
                    className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card dark:data-[state=active]:border-none bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900'
                  >
                    <KPICard
                      label='Conversations'
                      metric={analyticsData.metrics.conversations}
                    />
                  </TabsTrigger>
                  <Divider />
                  <TabsTrigger
                    value='answeredQuestions'
                    className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card dark:data-[state=active]:border-none bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900'
                  >
                    <KPICard
                      label='Answered Questions'
                      metric={analyticsData.metrics.answeredQuestions}
                    />
                  </TabsTrigger>
                  <Divider />
                  <TabsTrigger
                    value='timeCreated'
                    className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card dark:data-[state=active]:border-none bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900'
                  >
                    <KPICard
                      label='Time Created'
                      metric={analyticsData.metrics.timeCreated}
                    />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='activeUsers'>
                  <AreaChartComponent
                    data={analyticsData.activeUsersChart}
                    title='Active Users'
                    color='#22c55e'
                  />
                </TabsContent>

                <TabsContent value='conversations'>
                  <AreaChartComponent
                    data={analyticsData.conversationsChart}
                    title='Conversations'
                    color='#3b82f6'
                  />
                </TabsContent>

                <TabsContent value='answeredQuestions'>
                  <StackedQuestionsChart
                    data={analyticsData.answeredQuestionsChart}
                  />
                </TabsContent>

                <TabsContent value='timeCreated'>
                  <AreaChartComponent
                    data={analyticsData.timeCreatedChart}
                    title='Time Created'
                    color='#8b5cf6'
                  />
                </TabsContent>
              </Tabs>
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
