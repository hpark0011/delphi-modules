"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout
      showHeader={false}
      showDatePicker={false}
      showTabs={false}
      isFullWidth={false}
    >
      {children}
    </DashboardLayout>
  );
}
