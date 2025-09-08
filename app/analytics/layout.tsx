"use client";

import type { AnalyticsData, DateRange } from "@/app/analytics/types";
import { ActionsTab } from "@/app/analytics/_tabs_components/actions";
import { AudienceTab } from "@/app/analytics/_tabs_components/audience";
import { BroadcastsTab } from "@/app/analytics/_tabs_components/broadcasts";
import { EngagementTab } from "@/app/analytics/_tabs_components/engagement";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardMainWrapper } from "@/components/analytics/dashboard-ui";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  fetchAnalyticsData,
  getInitialDateRange,
} from "@/lib/analytics-service";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

export default function AnalyticsLayout({}: { children: React.ReactNode }) {
  const [analyticsData, setAnalyticsData] =
    React.useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = React.useState<DateRange>(
    getInitialDateRange()
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Determine current tab based on pathname
  const currentTab = pathname.split("/").pop() || "engagement";

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

  const handleTabChange = (value: string) => {
    router.push(`/analytics/${value}`);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className='flex h-screen w-full'>
        <AppSidebar />
        <SidebarInset className='flex-1 overflow-auto md:peer-data-[variant=inset]:shadow-none border-border border'>
          <DashboardMainWrapper>
            <div className=''>
              <div className='flex items-center justify-between mb-6 px-3'>
                <h1 className='text-2xl'>Analytics</h1>
                <DateRangePicker
                  dateRange={dateRange}
                  onDateRangeChange={handleDateRangeChange}
                />
              </div>

              <Tabs
                value={currentTab}
                onValueChange={handleTabChange}
                className='w-full gap-4'
              >
                <TabsList className='flex-row items-center gap-0.5 p-1 bg-extra-light box-content h-fit rounded-full mx-1'>
                  <TabsTrigger
                    value='engagement'
                    className='data-[state=active]:bg-white rounded-full px-3 data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9]'
                  >
                    Engagement
                  </TabsTrigger>
                  <TabsTrigger
                    value='audience'
                    className='data-[state=active]:bg-white rounded-full px-3 data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9]'
                  >
                    Audience
                  </TabsTrigger>
                  <TabsTrigger
                    value='actions'
                    className='data-[state=active]:bg-white rounded-full px-3 data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9]'
                  >
                    Actions
                  </TabsTrigger>
                  <TabsTrigger
                    value='broadcasts'
                    className='data-[state=active]:bg-white rounded-full px-3 data-[state=active]:shadow-card-primary hover:bg-[#EBEBE9]'
                  >
                    Broadcasts
                  </TabsTrigger>
                </TabsList>

                {isLoading || !analyticsData ? (
                  <div className='animate-pulse'>
                    <div className='h-8 rounded w-32 mb-8'></div>
                    <div className='grid grid-cols-4 gap-4 mb-8'>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className='h-32 rounded'></div>
                      ))}
                    </div>
                    <div className='h-96 rounded'></div>
                  </div>
                ) : (
                  <div>
                    {currentTab === "engagement" && (
                      <EngagementTab analyticsData={analyticsData} />
                    )}
                    {currentTab === "audience" && <AudienceTab />}
                    {currentTab === "actions" && <ActionsTab />}
                    {currentTab === "broadcasts" && <BroadcastsTab />}
                  </div>
                )}
              </Tabs>
            </div>
          </DashboardMainWrapper>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
