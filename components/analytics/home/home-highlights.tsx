import { Highlights } from "@/app/studio/_lib/mock-studio-data";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnalyticsSectionWrapper } from "../dashboard-ui";
import { Fragment } from "react";

interface HighlightCardProps {
  href: string;
  label: string;
  value: string | number;
}

function HighlightCard({ href, label, value }: HighlightCardProps) {
  return (
    <Link
      href={href}
      className='bg-card p-3.5 py-3 pr-3 hover:bg-[#f2f2f2] dark:hover:bg-white/10 transition-all cursor-pointer'
    >
      <div className='flex w-full items-center justify-between'>
        <p className='text-[13px] text-[#63635E] dark:text-neutral-400 leading-[1.2]'>
          {label}
        </p>
        <p
          className={cn(
            "font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs"
          )}
        >
          {value}
        </p>
      </div>
    </Link>
  );
}

export function HomeHighlights({ highlights }: { highlights: Highlights }) {
  const highlightItems = [
    {
      label: "Unanswered Questions",
      href: "/analytics/highlights?tab=unanswered",
      value: highlights.unansweredQuestions.value,
    },
    {
      label: "Product Mentions",
      href: "/analytics/highlights?tab=mentions",
      value: highlights.productMentions.value,
    },
    {
      label: "People Highlights",
      href: "/analytics/highlights?tab=people",
      value: highlights.peopleHighlights.value,
    },
    {
      label: "Insights",
      href: "/analytics/highlights?tab=insights",
      value: highlights.insights.value,
    },
  ];

  return (
    <AnalyticsSectionWrapper className='rounded-[20px] gap-1 flex flex-col'>
      <Link
        href='/analytics/highlights'
        className='flex items-center justify-between group hover:opacity-80 transition-opacity py-2 pr-2 pl-3'
      >
        <p className='text-sm font-medium text-[#8D8D86] dark:text-neutral-400'>
          Highlights
        </p>
        <ChevronRight className='size-4 text-[#8D8D86] dark:text-neutral-500 group-hover:translate-x-1 transition-transform' />
      </Link>

      <div className='flex flex-col rounded-[18px] overflow-hidden shadow-card-primary bg-card'>
        {highlightItems.map((item, index) => (
          <Fragment key={item.label}>
            <HighlightCard
              key={item.label}
              href={item.href}
              label={item.label}
              value={item.value}
            />
            {index < highlightItems.length - 1 && (
              <div className='h-[1px] bg-[#EBEBE9] dark:bg-[#171715]' />
            )}
          </Fragment>
        ))}
      </div>
    </AnalyticsSectionWrapper>
  );
}
