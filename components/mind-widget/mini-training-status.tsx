"use client";

import { Icon } from "@/components/ui/icon";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { isFinishedStatus } from "@/app/analytics/_components/mindscore/training-status-utils";

export function MiniTrainingStatus() {
  const { queue } = useTrainingQueue();

  const finished = queue.filter((item) => isFinishedStatus(item.status)).length;
  const total = queue.length;

  return (
    <div className='flex items-center gap-1 text-text-muted'>
      <Icon name='LoaderCircleIcon' className='size-4 animate-spin' />
      <span className='text-[13px]'>
        Learning {finished}
        <span className='mx-0.5'>/</span>
        {total}
      </span>
    </div>
  );
}
