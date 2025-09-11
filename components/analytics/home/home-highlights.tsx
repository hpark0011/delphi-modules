import { Engagements } from "@/app/analytics/page";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnalyticsSectionWrapper } from "../dashboard-ui";
import { Fragment } from "react";

interface MetricCardProps {
  href: string;
  label: string;
  value: string | number;
  change: number;
  isPositive: boolean;
}

function MetricCard({
  href,
  label,
  value,
  change,
  isPositive,
}: MetricCardProps) {
  return (
    <Link
      href={href}
      className='bg-card p-3.5 py-3 pr-3 hover:bg-[#f2f2f2] dark:hover:bg-[#262626] transition-all cursor-pointer'
    >
      <div className='flex w-full flex-col gap-2'>
        <p className='text-[13px] text-[#63635E] dark:text-neutral-400 leading-[1.2] w-full text-start'>
          {label}
        </p>
        <div className='flex items-center justify-between'>
          <p className='text-[24px] leading-1 font-medium tracking-[-0.04em] text-[#21201C] dark:text-[#EEEEEC]'>
            {value}
          </p>
          <span
            className={cn(
              "text-[13px] font-medium flex items-center gap-1 px-2 py-0.5 rounded-full",
              isPositive
                ? "text-trend-positive bg-trend-positive/10"
                : "text-trend-negative bg-trend-negative/10"
            )}
          >
            +{change}%
          </span>
        </div>
      </div>
    </Link>
  );
}

export function HomeHighlights({ engagements }: { engagements: Engagements }) {
  const metrics = [
    {
      label: "Active Users",
      ...engagements.activeUsers,
    },
    {
      label: "Conversations",
      ...engagements.conversations,
    },
  ];

  return (
    <AnalyticsSectionWrapper className='rounded-[20px] gap-1 flex flex-col'>
      <Link
        href='/analytics/engagement'
        className='flex items-center justify-between group hover:opacity-80 transition-opacity py-2 pr-2 pl-3'
      >
        <p className='text-sm font-medium text-[#8D8D86] dark:text-neutral-400'>
          Analytics this week
        </p>
        <ChevronRight className='size-4 text-[#8D8D86] dark:text-neutral-500 group-hover:translate-x-1 transition-transform' />
      </Link>

      <div className='flex flex-col rounded-[18px] overflow-hidden shadow-card-primary bg-card'>
        {metrics.map((metric, index) => (
          <Fragment key={metric.label}>
            <MetricCard
              key={metric.label}
              href='/analytics/engagement'
              label={metric.label}
              value={metric.value}
              change={metric.change}
              isPositive={metric.isPositive}
            />
            {index < metrics.length - 1 && (
              <div className='h-[1px] bg-[#EBEBE9] dark:bg-[#21201C]' />
            )}
          </Fragment>
        ))}
      </div>
    </AnalyticsSectionWrapper>
  );
}
