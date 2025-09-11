"use client";

import type { AnalyticsData } from "@/app/analytics/types";
import { AreaChartComponent } from "@/components/analytics/charts/area-chart";
import { StackedQuestionsChart } from "@/components/analytics/charts/stacked-questions-chart";
import {
  AnalyticsSectionWrapper,
  Divider,
} from "@/components/analytics/dashboard-ui";
import { KPICard } from "@/components/analytics/kpi-card";
import {
  ModuleCard,
  ModuleCardContent,
  ModuleCardHeader,
} from "@/components/analytics/module-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EngagementLoading from "../engagement/loading";
import { BroadcastData } from "../types/broadcast";
import { BroadcastMetricCard } from "@/components/analytics/broadcast-metric-card";

interface EngagementTabProps {
  analyticsData: AnalyticsData | null;
  isLoading: boolean;
}

const broadcastData: BroadcastData = {
  latestBroadcast: {
    title: "Summit Last Chance 20% - 8/31/25",
    date: "8/31/25",
  },
  metrics: {
    openRate: {
      value: 30.2,
      change: -4.2,
      changeType: "decrease",
      unit: "percentage",
    },
    engagementRate: {
      value: 22.8,
      change: 12.2,
      changeType: "increase",
      unit: "percentage",
    },
    clickRate: {
      value: 12.3,
      change: -4.2,
      changeType: "decrease",
      unit: "percentage",
    },
    unsubscribeRate: {
      value: 5.6,
      change: -3.2,
      changeType: "decrease",
      unit: "percentage",
    },
  },
  funnelData: [
    { stage: "Broadcast Sent", percentage: 100, count: 2600 },
    { stage: "Open Rate", percentage: 30.2, count: 785 },
    { stage: "Engagement Rate", percentage: 22.8, count: 592 },
    { stage: "Click Rate", percentage: 12.3, count: 320 },
    { stage: "Unsubscribe Rate", percentage: 5.6, count: 146 },
  ],
};

export function EngagementTab({
  analyticsData,
  isLoading,
}: EngagementTabProps) {
  if (isLoading || !analyticsData) {
    return <EngagementLoading />;
  }

  return (
    <div className='flex flex-col w-full gap-4'>
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
            <StackedQuestionsChart
              data={analyticsData.answeredQuestionsChart}
            />
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

      <AnalyticsSectionWrapper>
        <div className='p-4 py-3 flex flex-col gap-1 mb-1'>
          <div className='text-sm font-medium text-[#8D8D86] dark:text-neutral-400'>
            Latest Broadcast
          </div>
          <div className='flex flex-row gap-4 items-center'>
            <div className='text-lg'>Summit Last Chance 20% off</div>
            <div className='flex flex-row items-center bg-light rounded-md h-6'>
              <div className='text-sm px-2'>8/31/25</div>
              <div className='h-full w-[1px] bg-neutral-300/50' />
              <div className='flex flex-row px-0.5'>
                <button className='hover:bg-extra-light rounded-sm p-1'>
                  <ChevronLeft className='size-3.5 text-[#8D8D86]' />
                </button>
                <button className='hover:bg-extra-light rounded-sm p-1'>
                  <ChevronRight className='size-3.5 text-[#8D8D86]' />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ModuleCard className='rounded-[24px]'>
          <div className='flex flex-row items-center'>
            <BroadcastMetricCard
              label='Open Rate'
              value={broadcastData.metrics.openRate.value.toString()}
              change={broadcastData.metrics.openRate.change}
              changeType={broadcastData.metrics.openRate.changeType}
            />
            <Divider />
            <BroadcastMetricCard
              label='Engagement Rate'
              value={broadcastData.metrics.engagementRate.value.toString()}
              change={broadcastData.metrics.engagementRate.change}
              changeType={broadcastData.metrics.engagementRate.changeType}
            />
            <Divider />
            <BroadcastMetricCard
              label='Click Rate'
              value={broadcastData.metrics.clickRate.value.toString()}
              change={broadcastData.metrics.clickRate.change}
              changeType={broadcastData.metrics.clickRate.changeType}
            />
            <Divider />
            <BroadcastMetricCard
              label='Unsubscribe Rate'
              value={broadcastData.metrics.unsubscribeRate.value.toString()}
              change={broadcastData.metrics.unsubscribeRate.change}
              changeType={broadcastData.metrics.unsubscribeRate.changeType}
            />
          </div>
        </ModuleCard>
      </AnalyticsSectionWrapper>
    </div>
  );
}
