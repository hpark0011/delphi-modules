"use client";

import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";

export function AudienceTab() {
  return (
    <AnalyticsSectionWrapper>
      <div className='flex items-center justify-between px-4 py-3'>
        <p className='text-lg font-medium'>Audience</p>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <ModuleCard className='bg-white w-full rounded-[24px] p-4'>
          <ModuleCardHeader>
            Most Active Users<span className='text-[#8D8D86]'>Messages</span>
          </ModuleCardHeader>
        </ModuleCard>
        <ModuleCard className='bg-white w-full rounded-[24px] p-4'>
          <ModuleCardHeader>Languages</ModuleCardHeader>
        </ModuleCard>
      </div>
    </AnalyticsSectionWrapper>
  );
}
