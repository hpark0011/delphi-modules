"use client";

import type { AnalyticsData } from "@/app/analytics/types";
import { AreaChartComponent } from "@/components/analytics/charts/area-chart";
import {
  AnalyticsSectionWrapper,
  Divider,
} from "@/components/analytics/dashboard-ui";
import { KPICard } from "@/components/analytics/kpi-card";
import { StackedQuestionsChart } from "@/components/analytics/charts/stacked-questions-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";

interface EngagementTabProps {
  analyticsData: AnalyticsData | null;
  isLoading: boolean;
}

export function EngagementTab({
  analyticsData,
  isLoading,
}: EngagementTabProps) {
  console.log("isLoading:::::", isLoading);
  console.log("analyticsData::::", analyticsData);
  if (isLoading || !analyticsData) {
    return (
      <AnalyticsSectionWrapper>
        {/* <div className='animate-pulse'>
          <div className='flex gap-1 justify-between mb-6'>
            {[1, 2, 3, 4].map((i) => (
              <React.Fragment key={i}>
                <div className='h-24 bg-white/50 rounded-3xl flex-1'></div>
                {i < 4 && (
                  <div className='w-[3px] h-16 bg-[#EBEBE9] rounded-full self-center' />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className='h-96 bg-white/50 rounded-3xl'></div>
        </div> */}
      </AnalyticsSectionWrapper>
    );
  }

  return (
    <AnalyticsSectionWrapper>
      <Tabs defaultValue='activeUsers' className='w-full'>
        <TabsList className='flex w-full gap-1 h-auto p-0 justify-between'>
          <TabsTrigger
            value='activeUsers'
            className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card  bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900'
          >
            <KPICard
              label='Active Users'
              metric={analyticsData.metrics.activeUsers}
            />
          </TabsTrigger>
          <Divider />
          <TabsTrigger
            value='conversations'
            className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card  bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900'
          >
            <KPICard
              label='Conversations'
              metric={analyticsData.metrics.conversations}
            />
          </TabsTrigger>
          <Divider />
          <TabsTrigger
            value='answeredQuestions'
            className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card  bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900'
          >
            <KPICard
              label='Answered Questions'
              metric={analyticsData.metrics.answeredQuestions}
            />
          </TabsTrigger>
          <Divider />
          <TabsTrigger
            value='timeCreated'
            className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card  bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900'
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
            color=' #EF5F28'
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
          <StackedQuestionsChart data={analyticsData.answeredQuestionsChart} />
        </TabsContent>

        <TabsContent value='timeCreated'>
          <AreaChartComponent
            data={analyticsData.timeCreatedChart}
            title='Time Created'
            color='#22c55e'
          />
        </TabsContent>
      </Tabs>
    </AnalyticsSectionWrapper>
  );
}
