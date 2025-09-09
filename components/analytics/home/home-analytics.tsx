import { Engagements } from "@/app/analytics/page";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnalyticsSectionWrapper } from "../dashboard-ui";

export function HomeAnalytics({ engagements }: { engagements: Engagements }) {
  return (
    <AnalyticsSectionWrapper className='rounded-[20px] gap-1 flex flex-col'>
      <Link
        href='/analytics/engagement'
        className='flex items-center justify-between group hover:opacity-80 transition-opacity py-2 pr-2 pl-3'
      >
        <p className='text-sm font-medium text-[#63635E] dark:text-neutral-400'>
          Analytics this week
        </p>
        <ChevronRight className='size-4 text-[#8D8D86] dark:text-neutral-500 group-hover:translate-x-1 transition-transform' />
      </Link>

      <div className='flex flex-col rounded-[18px] overflow-hidden shadow-card-primary bg-card'>
        {/* Conversations Card */}
        <div className='bg-transparent  p-4 py-3 rounded-[18px] pr-3  '>
          <div className='flex w-full flex-col gap-2'>
            <p className='text-sm  text-[#63635E] dark:text-neutral-400 leading-[1.2] w-full text-start'>
              Conversations
            </p>
            <div className='flex items-center justify-between w-full'>
              <p className='text-[24px] leading-1 font-medium tracking-[-0.04em] text-[#21201C] dark:text-[#EEEEEC]'>
                {engagements.conversations.value}
              </p>
              <span
                className={cn(
                  "text-sm font-medium flex items-center gap-1 px-2 py-0.5 rounded-full",
                  engagements.conversations.isPositive
                    ? "text-trend-positive bg-trend-positive/10"
                    : "text-trend-negative bg-trend-negative/10"
                )}
              >
                +{engagements.conversations.change}%
              </span>
            </div>
          </div>
        </div>

        <div className='h-[1px] bg-[#EBEBE9] dark:bg-[#21201C]' />

        {/* Active Users Card */}
        <div className='bg-transparent p-4 py-3 rounded-[18px] pr-3  '>
          <div className='flex w-full flex-col gap-2'>
            <p className='text-sm  text-[#63635E] dark:text-neutral-400 leading-[1.2] w-full text-start'>
              Active Users
            </p>
            <div className='flex items-center justify-between'>
              <p className='text-[24px] leading-1 font-medium tracking-[-0.04em] text-[#21201C] dark:text-[#EEEEEC]'>
                {engagements.activeUsers.value}
              </p>
              <span
                className={cn(
                  "text-sm font-medium flex items-center gap-1 px-2 py-0.5 rounded-full",
                  engagements.activeUsers.isPositive
                    ? "text-trend-positive bg-trend-positive/10"
                    : "text-trend-negative bg-trend-negative/10"
                )}
              >
                +{engagements.activeUsers.change}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsSectionWrapper>
  );
}
