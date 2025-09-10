"use client";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
            <div className='flex items-center gap-1.5'>
              <span className='font-medium text-[#63635E]'>
                Unanswered Questions
              </span>
              <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                32
              </span>
            </div>

            <div className='flex items-center gap-1'>
              <button className='hover:bg-[#EBEBE9] rounded-[6px] p-1'>
                <ChevronLeft className='size-4 text-[#8D8D86]' />
              </button>
              <button className='hover:bg-[#EBEBE9] rounded-[6px] p-1'>
                <ChevronRight className='size-4 text-[#8D8D86]' />
              </button>
            </div>
          </ModuleCardHeader>
        </ModuleCard>
        <ModuleCard className=' w-full rounded-[24px]'>
          <ModuleCardHeader>
            <div className='flex items-center gap-1.5'>
              <span className='font-medium text-[#63635E]'>
                Product Mentions
              </span>
              <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                32
              </span>
            </div>

            <div className='flex items-center gap-1'>
              <button className='hover:bg-[#EBEBE9] rounded-[6px] p-1'>
                <ChevronLeft className='size-4 text-[#8D8D86]' />
              </button>
              <button className='hover:bg-[#EBEBE9] rounded-[6px] p-1'>
                <ChevronRight className='size-4 text-[#8D8D86]' />
              </button>
            </div>
          </ModuleCardHeader>
        </ModuleCard>
      </div>
      <div className='mt-2'>
        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader>
            <div className='flex items-center gap-1.5'>
              <span className='font-medium text-[#63635E]'>Insights</span>
              <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                32
              </span>
            </div>
          </ModuleCardHeader>
        </ModuleCard>
      </div>
    </AnalyticsSectionWrapper>
  );
}
