import {
  AnalyticsSectionWrapper,
  Divider,
} from "@/components/analytics/dashboard-ui";

import * as React from "react";

export default function EngagementLoading() {
  return (
    <AnalyticsSectionWrapper className='h-fit'>
      <div className='animate-pulse'>
        <div className='flex justify-between mb-4 items-center'>
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <div className='w-full rounded-3xl h-[94px] bg-light' />
              {i < 4 && <Divider className='min-w-[3px]' />}
            </React.Fragment>
          ))}
        </div>
        <div className='h-[536px] bg-light rounded-3xl flex items-center justify-center text-sm text-text-muted'>
          loading....
        </div>
      </div>
    </AnalyticsSectionWrapper>
  );
}
