"use client";

import type { BroadcastData } from "@/app/analytics/types/broadcast";
import { BroadcastMetricCard } from "@/components/analytics/broadcast-metric-card";
import { FunnelChart } from "@/components/analytics/charts/funnel-chart";
import {
  AnalyticsSectionWrapper,
  Divider,
} from "@/components/analytics/dashboard-ui";
import { ModuleCard } from "@/components/analytics/module-ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

export function BroadcastsTab() {
  // Mock data - replace with actual API call
  const broadcastData: BroadcastData = {
    latestBroadcast: {
      title: "Summit Last Chance",
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

  return (
    <div className='flex flex-col w-full gap-4'>
      <AnalyticsSectionWrapper>
        <div className='p-4 py-3 flex flex-col gap-1 mb-1'>
          <div className='text-sm font-medium text-[#8D8D86] dark:text-neutral-400'>
            Latest Broadcast
          </div>
          <div className='flex flex-row gap-4 items-center'>
            <div className='text-xl w-full'>
              {broadcastData.latestBroadcast.title}
            </div>
            <div className='flex flex-row items-center bg-light rounded-md h-6'>
              <div className='text-sm px-2.5'>
                {broadcastData.latestBroadcast.date}
              </div>
              <div className='h-full w-[1px] bg-neutral-300/50' />
              <div className='flex flex-row'>
                <button className='hover:bg-neutral-200 p-1 h-6 w-6'>
                  <ChevronLeft className='size-3.5 text-[#8D8D86]' />
                </button>
                <button className='hover:bg-neutral-200 rounded-r-sm p-1 h-6 w-6'>
                  <ChevronRight className='size-3.5 text-[#8D8D86]' />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ModuleCard className='rounded-[24px] mb-4'>
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

        <FunnelChart data={broadcastData.funnelData} />
      </AnalyticsSectionWrapper>
    </div>
  );
}
