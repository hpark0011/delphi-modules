"use client";

import type { DateRange } from "@/app/analytics/types";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardMainWrapper } from "@/components/analytics/dashboard-ui";
import { DateRangePicker } from "@/components/analytics/date-range-picker";
import Link from "next/link";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { getInitialDateRange } from "@/lib/analytics-service";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = React.useState<DateRange>(
    getInitialDateRange()
  );
  const pathname = usePathname();

  // Determine current tab based on pathname
  const currentTab = pathname.split("/").pop() || "engagement";

  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
  };

  const navItems = [
    { value: "engagement", label: "Engagement", href: "/analytics/engagement" },
    { value: "audience", label: "Audience", href: "/analytics/audience" },
    { value: "actions", label: "Actions", href: "/analytics/actions" },
    { value: "broadcasts", label: "Broadcasts", href: "/analytics/broadcasts" },
  ];

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

              <nav className='flex-row items-center gap-0.5 p-1 bg-extra-light box-content h-fit rounded-full mx-0.5 inline-flex'>
                {navItems.map((item) => (
                  <Link
                    key={item.value}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-1.5 transition-all hover:bg-[#EBEBE9]",
                      currentTab === item.value && "bg-white shadow-card-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className='mt-6'>
                {children}
              </div>
            </div>
          </DashboardMainWrapper>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
