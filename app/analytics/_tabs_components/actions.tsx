"use client";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";

export function ActionsTab() {
  return (
    <AnalyticsSectionWrapper>
      <div className='grid grid-cols-2 gap-2'>
        <ModuleCard className='bg-white w-full rounded-[24px] p-4'>
          <ModuleCardHeader>hello</ModuleCardHeader>
        </ModuleCard>
        <ModuleCard className='bg-white w-full rounded-[24px] p-4'>
          <ModuleCardHeader>hello</ModuleCardHeader>
        </ModuleCard>
      </div>
    </AnalyticsSectionWrapper>
  );
}
