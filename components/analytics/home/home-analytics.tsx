import { Engagements } from "@/app/analytics/page";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnalyticsSectionWrapper } from "../dashboard-ui";

export function HomeAnalytics({ engagements }: { engagements: Engagements }) {
  return (
    <AnalyticsSectionWrapper className='space-y-4 rounded-[20px]'>
      <Link
        href='/analytics/engagement'
        className='flex items-center justify-between group hover:opacity-80 transition-opacity'
      >
        <p className='text-sm font-medium text-[#63635E] dark:text-neutral-400'>
          Analytics this week
        </p>
        <ChevronRight className='w-5 h-5 text-[#8D8D86] dark:text-neutral-500 group-hover:translate-x-1 transition-transform' />
      </Link>

      <div className='flex flex-col bg-white rounded-[18px] overflow-hidden'>
        {/* Conversations Card */}
        <div className='bg-white dark:bg-[#1C1C1A] p-4 py-3'>
          <div className='space-y-2'>
            <p className='text-sm font-medium text-[#63635E] dark:text-neutral-400'>
              Conversations
            </p>
            <div className='flex items-baseline justify-between'>
              <p className='text-3xl font-medium tracking-[-0.04em] text-[#21201C] dark:text-[#EEEEEC]'>
                {engagements.conversations.value}
              </p>
              <span
                className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  engagements.conversations.isPositive
                    ? "text-trend-positive"
                    : "text-trend-negative"
                )}
              >
                +{engagements.conversations.change}%
              </span>
            </div>
          </div>
        </div>

        <div className='h-[1px] bg-[#EBEBE9] dark:bg-[#21201C]' />

        {/* Active Users Card */}
        <div className='bg-white dark:bg-[#1C1C1A] p-4 py-3 '>
          <div className='space-y-2'>
            <p className='text-sm font-medium text-[#63635E] dark:text-neutral-400'>
              Active Users
            </p>
            <div className='flex items-baseline justify-between'>
              <p className='text-3xl font-medium tracking-[-0.04em] text-[#21201C] dark:text-[#EEEEEC]'>
                {engagements.activeUsers.value}
              </p>
              <span
                className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  engagements.activeUsers.isPositive
                    ? "text-trend-positive"
                    : "text-trend-negative"
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
