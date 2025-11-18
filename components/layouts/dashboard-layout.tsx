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

interface TabItem {
  value: string;
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;

  // Header configuration
  showHeader?: boolean;
  headerTitle?: string;
  showBackButton?: boolean;
  backButtonHref?: string;
  backButtonLabel?: string;

  // Date picker
  showDatePicker?: boolean;

  // Navigation tabs
  showTabs?: boolean;
  tabs?: TabItem[];

  // Content wrapper styling
  isFullWidth?: boolean;
}

export function DashboardLayout({
  children,
  showHeader = false,
  headerTitle = "",
  showBackButton = false,
  backButtonHref = "/",
  backButtonLabel = "Back",
  showDatePicker = false,
  showTabs = false,
  tabs = [],
  isFullWidth = false,
}: DashboardLayoutProps) {
  const [dateRange, setDateRange] = React.useState<DateRange>(
    getInitialDateRange()
  );
  const pathname = usePathname();

  // Determine current tab based on pathname
  const currentTab = pathname.split("/").pop() || "";

  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className='flex h-screen w-full'>
        <AppSidebar />
        <SidebarInset className='flex-1 overflow-auto md:peer-data-[variant=inset]:shadow-none border-light border '>
          <DashboardMainWrapper
            className={`${isFullWidth ? "px-0" : "px-8 w-full max-w-[1136px] mx-auto"}`}
          >
            {showHeader || showTabs ? (
              <div>
                {showHeader && (
                  <div className='flex flex-col w-full'>
                    {showBackButton && (
                      <Link
                        href={backButtonHref}
                        className='flex group w-fit items-center gap-1.5 text-sm mx-3 text-[#8D8D86]'
                      >
                        <ArrowLeft className='size-3.5 group-hover:-translate-x-0.5 transition-transform' />
                        {backButtonLabel}
                      </Link>
                    )}
                    <div className='flex items-center justify-between mb-6 px-3'>
                      <h1 className='text-2xl'>{headerTitle}</h1>
                      {showDatePicker && (
                        <DateRangePicker
                          dateRange={dateRange}
                          onDateRangeChange={handleDateRangeChange}
                        />
                      )}
                    </div>
                  </div>
                )}

                {showTabs && tabs.length > 0 && (
                  <nav className='flex-row items-center gap-0.5 p-1 bg-extra-light box-content h-fit rounded-full mx-0.5 inline-flex'>
                    {tabs.map((item) => (
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
                )}

                <div className={showTabs ? "mt-4" : ""}>{children}</div>
              </div>
            ) : (
              <div>{children}</div>
            )}
          </DashboardMainWrapper>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
