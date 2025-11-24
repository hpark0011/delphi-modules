"use client";

import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { usePathname } from "next/navigation";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if we're on the studio home page or a detail page
  const isHomePage = pathname === "/studio";

  const navItems = [
    { value: "engagement", label: "Engagement", href: "/analytics/engagement" },
    { value: "audience", label: "Audience", href: "/analytics/audience" },
    { value: "highlights", label: "Highlights", href: "/analytics/highlights" },
    { value: "broadcasts", label: "Broadcasts", href: "/analytics/broadcasts" },
  ];

  return (
    <DashboardLayout
      showHeader={!isHomePage}
      headerTitle='Analytics'
      showBackButton={!isHomePage}
      backButtonHref='/studio'
      backButtonLabel='Main'
      showDatePicker={!isHomePage}
      showTabs={!isHomePage}
      tabs={navItems}
      isFullWidth={isHomePage}
    >
      {children}
    </DashboardLayout>
  );
}
