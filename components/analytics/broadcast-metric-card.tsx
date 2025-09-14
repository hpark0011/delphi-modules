"use client";

import { cn } from "@/lib/utils";

interface BroadcastMetricCardProps {
  label: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease";
  unit?: string;
  className?: string;
}

export function BroadcastMetricCard({
  label,
  value,
  change,
  changeType,
  unit = "%",
  className,
}: BroadcastMetricCardProps) {
  const isPositive = changeType === "increase";

  const trendColor = isPositive
    ? "text-[var(--color-trend-positive)]"
    : "text-[var(--color-trend-negative)]";

  return (
    <div
      className={cn(
        "bg-white dark:bg-card rounded-[24px] p-4 py-3 flex flex-col gap-4 w-full",
        className
      )}
    >
      <p className='text-sm font-medium text-[#63635E] dark:text-neutral-400 w-full text-start'>
        {label}
      </p>
      <div className='flex flex-col gap-0'>
        <div className='flex items-baseline gap-2'>
          <span className='text-3xl tracking-[-0.04em] text-text-[#21201C] dark:text-text-[#EEEEEC]'>
            {value}
            {unit}
          </span>
          <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
            <span className={cn("text-sm font-medium", trendColor)}>
              {isPositive ? "+" : "-"}
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <p className='text-sm text-[#8D8D86]'>from 2% (last week)</p>
      </div>
    </div>
  );
}
