"use client";

import type { BroadcastData } from "@/app/analytics/types/broadcast";
import { BroadcastMetricCard } from "@/components/analytics/broadcast-metric-card";
import { FunnelChart } from "@/components/analytics/charts/funnel-chart";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

export function BroadcastsTab() {
  // Mock data - replace with actual API call
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

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Latest Broadcast Header */}
      <AnalyticsSectionWrapper>
        <div className="p-4 flex flex-col gap-2">
          <div className="text-sm font-medium text-[#8D8D86] dark:text-neutral-400">
            Latest Broadcast
          </div>
          <div className="flex items-center gap-4">
            <div className="text-lg font-medium">
              {broadcastData.latestBroadcast.title}
            </div>
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <div className="text-sm px-2.5 py-1">
                {broadcastData.latestBroadcast.date}
              </div>
              <div className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-600" />
              <div className="flex">
                <button className="hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-sm p-1">
                  <ChevronLeft className="size-3.5" />
                </button>
                <button className="hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-sm p-1">
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnalyticsSectionWrapper>

      {/* Metrics Cards */}
      <AnalyticsSectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <BroadcastMetricCard
            label="Open Rate"
            value={broadcastData.metrics.openRate.value.toString()}
            change={broadcastData.metrics.openRate.change}
            changeType={broadcastData.metrics.openRate.changeType}
          />
          <BroadcastMetricCard
            label="Engagement Rate"
            value={broadcastData.metrics.engagementRate.value.toString()}
            change={broadcastData.metrics.engagementRate.change}
            changeType={broadcastData.metrics.engagementRate.changeType}
          />
          <BroadcastMetricCard
            label="Click Rate"
            value={broadcastData.metrics.clickRate.value.toString()}
            change={broadcastData.metrics.clickRate.change}
            changeType={broadcastData.metrics.clickRate.changeType}
          />
          <BroadcastMetricCard
            label="Unsubscribe Rate"
            value={broadcastData.metrics.unsubscribeRate.value.toString()}
            change={broadcastData.metrics.unsubscribeRate.change}
            changeType={broadcastData.metrics.unsubscribeRate.changeType}
          />
        </div>
      </AnalyticsSectionWrapper>

      {/* Funnel Chart */}
      <AnalyticsSectionWrapper>
        <FunnelChart data={broadcastData.funnelData} />
      </AnalyticsSectionWrapper>
    </div>
  );
}