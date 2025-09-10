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
import { ArrowLeft } from "lucide-react";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dateRange, setDateRange] = React.useState<DateRange>(
    getInitialDateRange()
  );
  const pathname = usePathname();

  // Check if we're on the analytics home page or a detail page
  const isHomePage = pathname === "/analytics";

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
            {isHomePage ? (
              // For home page, render children directly without header/nav
              <div>{children}</div>
            ) : (
              // For detail pages, show header and navigation
              <div>
                <div className='flex flex-col w-full'>
                  <Link
                    href='/analytics'
                    className='flex group w-fit items-center gap-1.5 text-sm mx-3 text-[#8D8D86]'
                  >
                    <ArrowLeft className='size-3.5 group-hover:-translate-x-0.5 transition-transform' />
                    Home
                  </Link>
                  <div className='flex items-center justify-between mb-6 px-3'>
                    <h1 className='text-2xl'>Analytics</h1>
                    <DateRangePicker
                      dateRange={dateRange}
                      onDateRangeChange={handleDateRangeChange}
                    />
                  </div>
                </div>

                <nav className='flex-row items-center gap-0.5 p-1 bg-extra-light box-content h-fit rounded-full mx-0.5 inline-flex'>
                  {navItems.map((item) => (
                    <Link
                      key={item.value}
                      href={item.href}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-sm transition-all",
                        currentTab !== item.value &&
                          "hover:bg-[#EBEBE9] dark:hover:bg-[#262626]",
                        currentTab === item.value &&
                          "bg-white shadow-card-primary dark:bg-[#262626]"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className='mt-4'>{children}</div>
              </div>
            )}
          </DashboardMainWrapper>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
