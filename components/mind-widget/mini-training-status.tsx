"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { isFinishedStatus } from "@/app/analytics/_components/mindscore/training-status-utils";

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export function MiniTrainingStatus() {
  const { queue } = useTrainingQueue();

  const finished = queue.filter((item) => isFinishedStatus(item.status)).length;
  const total = queue.length;

  return (
    <motion.div
      className='flex items-center gap-1 text-text-muted'
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={SPRING_CONFIG}
    >
      <Icon name='LoaderCircleIcon' className='size-4 animate-spin' />
      <span className='text-[13px]'>
        Learning {finished}
        <span className='mx-0.5'>/</span>
        {total}
      </span>
    </motion.div>
  );
}
