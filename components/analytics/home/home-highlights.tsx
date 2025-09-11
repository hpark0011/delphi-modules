import { Highlights } from "@/app/analytics/page";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnalyticsSectionWrapper } from "../dashboard-ui";
import { Fragment } from "react";

interface HighlightCardProps {
  href: string;
  label: string;
  value: string | number;
  valueColor?: string;
}

function HighlightCard({
  href,
  label,
  value,
  valueColor = "text-[#FF8D28]",
}: HighlightCardProps) {
  return (
    <Link
      href={href}
      className='bg-card p-3.5 py-3 pr-3 hover:bg-[#f2f2f2] dark:hover:bg-[#262626] transition-all cursor-pointer'
    >
      <div className='flex w-full items-center justify-between'>
        <p className='text-[13px] text-[#63635E] dark:text-neutral-400 leading-[1.2]'>
          {label}
        </p>
        <p className={cn("text-[18px] font-medium tracking-[-0.02em]", valueColor)}>
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
      href: "/analytics/insights?tab=unanswered",
      value: highlights.unansweredQuestions.value,
    },
    {
      label: "Product Mentions",
      href: "/analytics/insights?tab=mentions",
      value: highlights.productMentions.value,
    },
    {
      label: "People Highlights",
      href: "/analytics/insights?tab=people",
      value: highlights.peopleHighlights.value,
    },
    {
      label: "Insights",
      href: "/analytics/insights?tab=insights",
      value: highlights.insights.value,
    },
  ];

  return (
    <AnalyticsSectionWrapper className='rounded-[20px] gap-1 flex flex-col'>
      <Link
        href='/analytics/insights'
        className='flex items-center justify-between group hover:opacity-80 transition-opacity py-2 pr-2 pl-3'
      >
        <p className='text-sm font-medium text-[#8D8D86] dark:text-neutral-400'>
          Insights
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
              valueColor={item.label === "Insights" ? "text-[#8D8D86]" : "text-[#FF8D28]"}
            />
            {index < highlightItems.length - 1 && (
              <div className='h-[1px] bg-[#EBEBE9] dark:bg-[#21201C]' />
            )}
          </Fragment>
        ))}
      </div>
    </AnalyticsSectionWrapper>
  );
}