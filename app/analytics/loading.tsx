import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { Icon } from "@/components/ui/icon";

export default function AnalyticsLoading() {
  return (
    <div className='space-y-6 px-13'>
      {/* Header Section */}
      <div>
        <h1 className='text-[28px] leading-[1.2] font-medium mb-2 text-[#21201C] dark:text-[#EEEEEC] px-3'>
          Good Afternoon, John!
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
                <div className='flex items-center gap-3 p-2'>
                  <div className='w-8 h-8 bg-[#FF8D28]/10 rounded-full flex items-center justify-center'>
                    <Icon
                      name='BookClosedFillIcon'
                      className='size-6 text-[#FF8D28]'
                    />
                  </div>
                  <h2 className='text-lg font-medium'>Train your Delphi</h2>
                </div>
                <div className='flex items-end text-xs text-[#8D8D86] dark:text-neutral-400 flex-col mr-4'>
                  <div className='animate-pulse h-2 w-[120px] rounded-xs bg-light' />
                </div>
              </div>

              {/* Cards */}
              <div className='grid grid-cols-2 gap-2'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='animate-pulse h-24 bg-light rounded-3xl flex-1'
                  />
                ))}
              </div>
            </div>
          </AnalyticsSectionWrapper>

          <AnalyticsSectionWrapper className='p-4 py-3 rounded-[20px] flex gap-3 flex-row items-center justify-between'>
            {/* Bottom Section - Next Actions */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-2 size-8 bg-[#F1F0EF] rounded-full justify-center'>
                <span className='text-[#8D8D86] dark:text-neutral-500'>▶</span>
              </div>
              <div className='text-[#8D8D86]'>Next up</div>
            </div>
            <div className='text-[#8D8D86] pr-2'>Test your Delphi</div>
          </AnalyticsSectionWrapper>
        </div>

        <div className='flex flex-col space-y-2 w-full max-w-[392px]'></div>
      </div>
    </div>
  );
}
