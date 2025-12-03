"use client";

import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TrainingResultBadgesProps {
  completedCount: number;
  failedCount: number;
  onCompletedClick?: () => void;
  onFailedClick?: () => void;
  className?: string;
  countTextSize?: string;
  disableTooltips?: boolean;
}

export function TrainingResultBadges({
  completedCount,
  failedCount,
  onCompletedClick,
  onFailedClick,
  className,
  countTextSize = "text-[13px]",
  disableTooltips = false,
}: TrainingResultBadgesProps) {
  const completedBadge = (
    <div
      className={`text-green-500 min-w-[18px] text-center flex items-center ${onCompletedClick ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
      onClick={onCompletedClick}
      role={onCompletedClick ? "button" : undefined}
      tabIndex={onCompletedClick ? 0 : undefined}
      onKeyDown={
        onCompletedClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCompletedClick();
              }
            }
          : undefined
      }
    >
      <Icon name='CheckedCircleFillIcon' className='size-5' />
      <span className={cn("font-medium", countTextSize)}>
        {completedCount}
      </span>
    </div>
  );

  const failedBadge = (
    <div
      className={`text-orange-500 min-w-[18px] text-center flex items-center ${onFailedClick ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
      onClick={onFailedClick}
      role={onFailedClick ? "button" : undefined}
      tabIndex={onFailedClick ? 0 : undefined}
      onKeyDown={
        onFailedClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onFailedClick();
              }
            }
          : undefined
      }
    >
      <Icon
        name='ExclamationmarkTriangleFillIcon'
        className='size-4.5'
      />
      <span className={cn("font-medium", countTextSize)}>
        {failedCount}
      </span>
    </div>
  );

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {completedCount > 0 && (
        disableTooltips ? (
          completedBadge
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              {completedBadge}
            </TooltipTrigger>
            <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
              Completed
            </TooltipContent>
          </Tooltip>
        )
      )}
      {failedCount > 0 && (
        disableTooltips ? (
          failedBadge
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              {failedBadge}
            </TooltipTrigger>
            <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
              Failed
            </TooltipContent>
          </Tooltip>
        )
      )}
    </div>
  );
}
