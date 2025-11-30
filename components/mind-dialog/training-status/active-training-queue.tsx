"use client";

import { MindStatusIcon } from "@/components/mind-status-notification";
// import { Button } from "@/components/ui/button";
// import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTrainingQueue, type QueueItem } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { type TrainingItemStatus } from "@/utils/training-status-helpers";
import { useEffect, useMemo, useState } from "react";
import { TrainingQueueItem } from "../../../app/studio/_components/mindscore/training-queue-item";

interface ActiveTrainingQueueProps {
  showCompletedStatus: boolean;
  setShowCompletedStatus: (value: boolean) => void;
  finishedCount: number;
  totalCount: number;
  queueSnapshot: QueueItem[];
  initialFilter?: TrainingItemStatus | "all" | null;
  onFilterApplied?: () => void;
}

const statusFilters: Array<{
  value: TrainingItemStatus | "all";
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "queued", label: "Queued" },
  { value: "training", label: "Training" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
];

export function ActiveTrainingQueue({
  showCompletedStatus,
  // setShowCompletedStatus,
  finishedCount,
  totalCount,
  queueSnapshot,
  initialFilter,
  onFilterApplied,
}: ActiveTrainingQueueProps) {
  const { queue } = useTrainingQueue();
  const [selectedStatus, setSelectedStatus] = useState<
    TrainingItemStatus | "all"
  >("all");

  const activeCount = totalCount - finishedCount;

  // Apply initial filter when provided from context (e.g., badge click)
  useEffect(() => {
    if (initialFilter) {
      setSelectedStatus(initialFilter);
      onFilterApplied?.();
    }
  }, [initialFilter, onFilterApplied]);

  const filteredQueue = useMemo(() => {
    const sourceQueue = showCompletedStatus ? queueSnapshot : queue;
    if (selectedStatus === "all") {
      return sourceQueue;
    }
    return sourceQueue.filter((item) => item.status === selectedStatus);
  }, [showCompletedStatus, queueSnapshot, queue, selectedStatus]);

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
          <div className='flex items-center gap-2'>
            {/* Status Filter */}
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(value as TrainingItemStatus | "all")
              }
            >
              <SelectTrigger
                size='sm'
                className='data-[size=sm]:h-6 bg-transparent px-2 text-[13px] w-fit rounded-sm hover:bg-base gap-1.5'
              >
                <div className='flex items-center gap-2 pb-[1px]'>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {statusFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* {showCompletedStatus && (
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
          )} */}
        </div>
      </div>

      {/* Active Training Queue List */}
      <div className='bg-light dark:bg-[#1A1A1A] rounded-xl py-2.5 mb-4 px-2.5 max-h-[322px] overflow-y-auto'>
        <div className='flex flex-col gap-0.5 w-full'>
          {filteredQueue.length === 0 ? (
            <div className='flex items-center justify-center py-8 text-[#8D8D86] dark:text-neutral-500'>
              <p className='text-sm'>No items found</p>
            </div>
          ) : (
            filteredQueue.map((item: QueueItem) => (
              <TrainingQueueItem
                key={item.id}
                item={item}
                docIconSize='size-5'
                fontSize='text-[14px]'
                containerClassName='hover:bg-extra-light/100 rounded-md py-1 px-2 pl-1.5'
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
