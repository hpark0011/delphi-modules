"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { ExpandableQueueList } from "./expandable-queue-list";
import { isFinishedStatus } from "../training-status-utils";

export function ActiveTrainingStatus() {
  const { queue } = useTrainingQueue();
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate finished items (completed, failed, or deleting)
  const finished = queue.filter((item) => isFinishedStatus(item.status)).length;
  const total = queue.length;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className='w-full relative'>
      {/* Status / Trigger */}
      <div
        className='w-full items-center flex justify-start py-2 px-[11px] pr-3 gap-1.5 text-text-muted hover:text-blue-500 cursor-pointer'
        onClick={handleToggle}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <Icon name='LoaderCircleIcon' className='size-4.5 animate-spin' />
        <div className='text-[13px] w-full'>
          Learning {finished}
          <span className='mx-0.5'>/</span>
          {total}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className='ml-1'
        >
          <ChevronDown className='size-3.5' />
        </motion.div>
      </div>

      {/* Expanded Queue List */}
      <ExpandableQueueList
        items={queue}
        isExpanded={isExpanded}
        enableAutoScroll={true}
      />
    </div>
  );
}
