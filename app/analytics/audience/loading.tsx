import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import * as React from "react";

export default function AudienceLoading() {
  return (
    <AnalyticsSectionWrapper className='h-fit'>
      <div className='animate-pulse'>
        <div className='h-[536px] bg-light rounded-3xl flex items-center justify-center text-sm text-text-muted'>
          loading....
        </div>
      </div>
    </AnalyticsSectionWrapper>
  );
}
