import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import * as React from "react";

export default function EngagementLoading() {
  return (
    <AnalyticsSectionWrapper className='h-[320px] bg-red-500'>
      <div className='animate-pulse'>
        <div className='flex gap-1 justify-between mb-6'>
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div className='h-24 bg-white/50 rounded-3xl flex-1'></div>
              {i < 4 && (
                <div className='w-[3px] h-16 bg-[#EBEBE9] rounded-full self-center' />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className='h-96 bg-white/50 rounded-3xl'>loading....</div>
      </div>
    </AnalyticsSectionWrapper>
  );
}
