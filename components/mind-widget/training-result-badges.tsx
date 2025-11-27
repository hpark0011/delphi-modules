"use client";

import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TrainingResultBadgesProps {
  completedCount: number;
  failedCount: number;
}

export function TrainingResultBadges({
  completedCount,
  failedCount,
}: TrainingResultBadgesProps) {
  return (
    <div className='flex items-center gap-1'>
      {completedCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='text-green-500 min-w-[18px] text-center cursor-default flex items-center'>
              <Icon name='CheckedCircleFillIcon' className='size-5' />
              <span className='text-[12px] font-medium'>{completedCount}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
            completed
          </TooltipContent>
        </Tooltip>
      )}
      {failedCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='text-orange-500 min-w-[18px] text-center cursor-default flex items-center'>
              <Icon
                name='ExclamationmarkTriangleFillIcon'
                className='size-4.5'
              />
              <span className='text-[12px] font-medium'>{failedCount}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
            failed
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
