"use client";

// import { MindWidgetLarge } from "@/components/mind-widget/mind-widget-large";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { HomeAnalytics } from "@/components/analytics/home/home-analytics";
import { HomeHighlights } from "@/components/analytics/home/home-highlights";
import { MindWidgetLargeRect } from "@/app/studio/_components/mindscore/widget/mind-widget-large-rect";
// import { MindSolidIcon } from "@/delphi-ui/icons/MindSolid";
import { CircleDashedIcon } from "lucide-react";
import { Icon } from "@/components/ui/icon";

import {
  mockEngagements,
  mockHighlights,
  mockTrainingCards,
} from "./_lib/mock-studio-data";

export default function AnalyticsPage() {
  const engagements = mockEngagements;
  const highlights = mockHighlights;
  const trainingCards = mockTrainingCards;

  // const highlights = [];

  return (
    <div className='space-y-4 px-13'>
      {/* Header Section */}
      <div>
        <h1 className='text-[24px] leading-[1.2] font-medium mb-2 text-[#21201C] dark:text-[#EEEEEC] px-3'>
          Good Afternoon, Han!
        </h1>
      </div>

      {/* Top Section: Training and Mind Score */}
      <div className='flex gap-2'>
        <div className='w-full flex flex-col gap-2'>
          {/* Train your Delphi Section */}
          <AnalyticsSectionWrapper className='w-full p-2 rounded-[20px]'>
            {/* Header */}
            <div className='space-y-2 w-full'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2.5 p-2'>
                  <div className='w-8 h-8 bg-[#FF8D28]/10 rounded-lg flex items-center justify-center'>
                    <Icon
                      name='ChecklistIcon'
                      className='size-6 text-[#FF8D28]'
                    />
                  </div>
                  <h2 className='text-lg font-medium'>Today's Tasks</h2>
                </div>
              </div>

              {/* Cards */}
              <div className='grid grid-cols-2 gap-2'>
                {trainingCards.slice(0, 2).map((card, index) => (
                  <div
                    key={index}
                    className='group p-3 rounded-[20px] bg-card dark:bg-[#262626] hover:bg-[#EBEBE9] dark:hover:bg-[#2C2C2A] transition-colors cursor-pointer shadow-card-primary flex flex-col gap-3 w-full h-[144px]'
                  >
                    <CircleDashedIcon className='size-5 min-h-5 text-[#CFCECA]' />
                    <div className='flex flex-col w-full h-full'>
                      <h3 className='text-sm font-medium text-[#21201C] dark:text-[#EEEEEC]'>
                        {card.title}
                      </h3>
                      <p className='text-xs leading-[1.4] text-[#8D8D86] dark:text-neutral-500'>
                        {card.description}
                      </p>
                    </div>

                    <div className='h-[24px] min-h-[24px] px-3 w-fit rounded-full bg-[#F0EEE4] dark:bg-[#363636] flex items-center justify-center'>
                      <span className='text-sm text-[#71624B] dark:text-neutral-400'>
                        +{card.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnalyticsSectionWrapper>

          <AnalyticsSectionWrapper className='p-4 py-3 rounded-[20px] flex gap-3 flex-row items-center justify-between'>
            {/* Bottom Section - Next Actions */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-2 size-8 bg-[#F1F0EF] dark:bg-light rounded-full justify-center'>
                <span className='text-[#8D8D86] dark:text-neutral-500'>▶</span>
              </div>
              <div className='text-[#8D8D86]'>Next up</div>
            </div>
            <div className='text-[#8D8D86] pr-2'>Test your Delphi</div>
          </AnalyticsSectionWrapper>
        </div>

        <div className='flex flex-col space-y-2 w-full max-w-[360px]'>
          {/*  */}
          <MindWidgetLargeRect />

          {/* Mind Score Card */}
          {/* <MindWidgetLarge /> */}

          {/* Analytics Section */}
          <HomeAnalytics engagements={engagements} />

          {/* Highlights Section */}
          <HomeHighlights highlights={highlights} />

          {/* Upgrade Broadcast Section */}
          {/* <UpgradeBroadcast /> */}
        </div>
      </div>
    </div>
  );
}
