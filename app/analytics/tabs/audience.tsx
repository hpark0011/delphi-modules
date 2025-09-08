"use client";

import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";

export function AudienceTab() {
  return (
    <AnalyticsSectionWrapper>
      <div className='flex items-center justify-between px-4 py-3'>
        <p className='text-lg font-medium'>Audience</p>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div className='bg-white w-full rounded-[24px] p-4'>hello</div>
        <div className='bg-white w-full rounded-[24px] p-4'>hello</div>
      </div>
    </AnalyticsSectionWrapper>
  );
}
