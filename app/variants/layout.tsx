"use client";

import { DashboardMainWrapper } from "@/components/analytics/dashboard-ui";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import * as React from "react";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className='flex h-screen w-full'>
        <AppSidebar />
        <SidebarInset className='flex-1 overflow-auto md:peer-data-[variant=inset]:shadow-none border-border border'>
          <DashboardMainWrapper>
            <div>{children}</div>
          </DashboardMainWrapper>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
