"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useTrainingQueue, type QueueItem } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { TrainingQueueItem } from "../../app/studio/_components/mindscore/training-queue-item";

interface ActiveTrainingQueueProps {
  showCompletedStatus: boolean;
  setShowCompletedStatus: (value: boolean) => void;
  finishedCount: number;
  totalCount: number;
  queueSnapshot: QueueItem[];
}

export function ActiveTrainingQueue({
  showCompletedStatus,
  setShowCompletedStatus,
  finishedCount,
  totalCount,
  queueSnapshot,
}: ActiveTrainingQueueProps) {
  const { queue } = useTrainingQueue();

  return (
    <div className='flex flex-col gap-3 mt-4'>
      {/* Active Training Queue Header */}
      <div className='text-[13px] font-medium text-text-muted dark:text-neutral-500 px-3 flex items-center justify-between gap-0.5 tracking-tight'>
        <div className='flex items-center gap-2 w-full justify-between'>
          <div className='flex items-center gap-0.5'>
            <Icon
              name={
                showCompletedStatus
                  ? "GaugeWithDotsNeedle67PercentIcon"
                  : "LoaderCircleIcon"
              }
              className={cn(
                "size-4.5",
                showCompletedStatus
                  ? "text-neutral-400"
                  : "text-icon-light mr-0.5",
                !showCompletedStatus && "animate-spin"
              )}
            />
            <span className={cn(showCompletedStatus && "text-text-primary")}>
              {showCompletedStatus
                ? `Training completed!`
                : `Learning ${finishedCount} / ${totalCount}`}
            </span>
          </div>
          {showCompletedStatus && (
            <>
              <Button
                variant='glossy'
                size='sm'
                onClick={() => setShowCompletedStatus(false)}
                className='text-[12px] shadow-md shrink-0 h-7 has-[>svg]:px-2.5 has-[>svg]:pr-1.5 gap-1 rounded-md'
              >
                <span className='text-[12px]'>View summary</span>
                <Icon name='ArrowForwardIcon' className='size-4 text-white' />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Active Training Queue List */}
      <div className='bg-light dark:bg-[#1A1A1A] rounded-xl py-3 mb-4 px-2'>
        <div className='flex flex-col gap-0.5 w-full'>
          {(showCompletedStatus ? queueSnapshot : queue).map(
            (item: QueueItem) => (
              <TrainingQueueItem
                key={item.id}
                item={item}
                docIconSize='size-5'
                fontSize='text-[14px]'
                containerClassName='hover:bg-extra-light/100 rounded-md py-1'
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
