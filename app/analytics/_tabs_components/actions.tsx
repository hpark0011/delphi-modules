"use client";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";

export function ActionsTab() {
  return (
    <AnalyticsSectionWrapper>
      <div className='grid grid-cols-2 gap-2'>
        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader>
            <span className='font-medium text-[#63635E]'>
              Upcoming Meetings
            </span>
            <span className='font-normal text-[#8D8D86]'>Wed Apr 3</span>
          </ModuleCardHeader>
        </ModuleCard>
        <ModuleCard className=' w-full rounded-[24px]'>
          <ModuleCardHeader>
            <span className='font-medium text-[#63635E]'>
              People Highlights
            </span>
          </ModuleCardHeader>
        </ModuleCard>

        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader>
            <span className='font-medium text-[#63635E]'>
              Unanswered Questions
            </span>
          </ModuleCardHeader>
        </ModuleCard>
        <ModuleCard className=' w-full rounded-[24px]'>
          <ModuleCardHeader>
            <span className='font-medium text-[#63635E]'>Product Mentions</span>
          </ModuleCardHeader>
        </ModuleCard>
      </div>
      <div className='mt-2'>
        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader>
            <span className='font-medium text-[#63635E]'>Popular Topics</span>
          </ModuleCardHeader>
        </ModuleCard>
      </div>
    </AnalyticsSectionWrapper>
  );
}
