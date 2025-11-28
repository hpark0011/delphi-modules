"use client";

import { MindStatusIcon } from "@/components/mind-status-notification";
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

  const activeCount = totalCount - finishedCount;

  return (
    <div className='flex flex-col gap-3 mt-4'>
      {/* Active Training Queue Header */}
      <div className='text-[14px] font-medium text-text-muted dark:text-neutral-500 px-3 flex items-center justify-between gap-0.5 tracking-tight'>
        <div className='flex items-center gap-2 w-full justify-between'>
          <div className='flex items-center gap-1'>
            <MindStatusIcon
              status={showCompletedStatus ? "finished" : "active"}
            />
            <span className={cn(showCompletedStatus && "text-text-primary")}>
              {showCompletedStatus
                ? `Learning Completed!`
                : `Learning ${activeCount} Items`}
            </span>
          </div>
          {showCompletedStatus && (
            <>
              <Button
                variant='glossy'
                size='sm'
                onClick={() => setShowCompletedStatus(false)}
                className='text-[12px] shadow-md shrink-0 h-7.5 rounded-full has-[>svg]:pl-2 has-[>svg]:pr-3 gap-0.5 '
              >
                <Icon
                  name='DocPlainTextFillIcon'
                  className='size-4 text-white/90'
                />
                <span className='text-[13px]'>View summary</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Active Training Queue List */}
      <div className='bg-light dark:bg-[#1A1A1A] rounded-xl py-2.5 mb-4 px-2.5 max-h-[322px] overflow-y-auto'>
        <div className='flex flex-col gap-0.5 w-full'>
          {(showCompletedStatus ? queueSnapshot : queue).map(
            (item: QueueItem) => (
              <TrainingQueueItem
                key={item.id}
                item={item}
                docIconSize='size-5'
                fontSize='text-[14px]'
                containerClassName='hover:bg-extra-light/100 rounded-md py-1 px-2 pl-1.5'
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
