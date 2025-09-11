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
import EngagementLoading from "../engagement/loading";

interface EngagementTabProps {
  analyticsData: AnalyticsData | null;
  isLoading: boolean;
}

export function EngagementTab({
  analyticsData,
  isLoading,
}: EngagementTabProps) {
  if (isLoading || !analyticsData) {
    return <EngagementLoading />;
  }

  return (
    <AnalyticsSectionWrapper>
      <Tabs defaultValue='activeUsers' className='w-full gap-4'>
        <TabsList className='flex w-full gap-0 h-auto p-0 justify-between'>
          <TabsTrigger
            value='activeUsers'
            className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card  bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900 hover:shadow-[0_0_0_2px_#ebebe9]'
          >
            <KPICard
              label='Active Users'
              metric={analyticsData.metrics.activeUsers}
            />
          </TabsTrigger>
          <Divider />
          <TabsTrigger
            value='conversations'
            className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card  bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900 hover:shadow-[0_0_0_2px_#ebebe9]'
          >
            <KPICard
              label='Conversations'
              metric={analyticsData.metrics.conversations}
            />
          </TabsTrigger>
          <Divider />
          <TabsTrigger
            value='answeredQuestions'
            className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card  bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900 hover:shadow-[0_0_0_2px_#ebebe9]'
          >
            <KPICard
              label='Answered Questions'
              metric={analyticsData.metrics.answeredQuestions}
            />
          </TabsTrigger>
          <Divider />
          <TabsTrigger
            value='timeCreated'
            className='p-0 data-[state=active]:bg-white dark:data-[state=active]:bg-card  bg-transparent h-fit rounded-[24px] data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9] dark:hover:bg-neutral-900 hover:shadow-[0_0_0_2px_#ebebe9]'
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
