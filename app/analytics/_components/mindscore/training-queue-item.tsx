"use client";

import { Icon } from "@/components/ui/icon";
import type { QueueItem } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { RingPercentage } from "./ring-percentage";
import type { TrainingStatus } from "./training-status-tab";

function getStatusIcon(status: TrainingStatus) {
  switch (status) {
    case "completed":
      return "CheckedCircleFillIcon";
    case "training":
      return "LoaderCircleIcon";
    case "queued":
      return "CircleDashedIcon";
    case "failed":
      return "ExclamationmarkTriangleFillIcon";
    default:
      return "CircleDashedIcon";
  }
}

interface TrainingQueueItemProps {
  item: QueueItem;
  className?: string;
}

export function TrainingQueueItem({ item, className }: TrainingQueueItemProps) {
  return (
    <div
      className={cn(
        "px-2 py-0.5",
        "hover:bg-extra-light/50 transition-colors",
        className
      )}
    >
      <div className='flex items-center gap-1'>
        {/* Icon or Ring Percentage */}
        <div className='flex-shrink-0'>
          {item.status === "training" || item.status === "queued" ? (
            <div className='size-5 flex items-center justify-center'>
              <RingPercentage
                value={item.progress}
                size={14}
                strokeWidth={2}
                progressColor={
                  item.status === "training" ? "#3b82f6" : "#8D8D86"
                }
                trackColor='var(--color-neutral-200)'
                showLabel={false}
                animate={true}
                ariaLabel={`${item.name} progress`}
              />
            </div>
          ) : (
            <Icon
              name={getStatusIcon(item.status) as any}
              className={cn(
                "size-5",
                item.status === "completed"
                  ? "text-[#09CE6B]"
                  : item.status === "failed"
                    ? "text-orange-500"
                    : "text-[#8D8D86]"
              )}
            />
          )}
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2'>
            <p className='text-sm font-medium text-text-primary truncate'>
              {item.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
