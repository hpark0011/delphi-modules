"use client";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { Card } from "@/components/ui/card";

export function ActionsTab() {
  return (
    <AnalyticsSectionWrapper>
      <div className='grid grid-cols-2 gap-2'>
        <Card className='bg-white w-full rounded-[24px] p-4'>hello</Card>
        <Card className='bg-white w-full rounded-[24px] p-4'>hello</Card>
      </div>
    </AnalyticsSectionWrapper>
  );
}
