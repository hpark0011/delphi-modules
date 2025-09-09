"use client";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";

export function ActionsTab() {
  return (
    <AnalyticsSectionWrapper>
      <div className='grid grid-cols-2 gap-2'>
        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader>
            hello<span>hello</span>
          </ModuleCardHeader>
        </ModuleCard>
        <ModuleCard className=' w-full rounded-[24px]'>
          <ModuleCardHeader>hello</ModuleCardHeader>
        </ModuleCard>
      </div>
    </AnalyticsSectionWrapper>
  );
}
