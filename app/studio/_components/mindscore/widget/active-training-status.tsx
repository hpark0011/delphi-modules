"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/components/ui/icon";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandableQueueList } from "./expandable-queue-list";
import { isFinishedStatus } from "../../../../../components/mind-dialog/training-status-utils";

export function ActiveTrainingStatus() {
  const { queue } = useTrainingQueue();
  const [isExpanded, setIsExpanded] = useState(true);
  const [newlyAddedCount, setNewlyAddedCount] = useState<number | null>(null);
  const previousQueueLengthRef = useRef(queue.length);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMountRef = useRef(true);

  // Calculate finished items (completed, failed, or deleting)
  const finished = queue.filter((item) => isFinishedStatus(item.status)).length;
  const total = queue.length;

  // Track when items are added to the queue
  useEffect(() => {
    // On initial mount, initialize ref and show notification if items exist
    if (isInitialMountRef.current) {
      previousQueueLengthRef.current = queue.length;
      isInitialMountRef.current = false;

      // Show notification if component mounted with items already in queue
      if (queue.length > 0) {
        setNewlyAddedCount(queue.length);

        // Clear existing timeout if any
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Auto-hide notification after 3 seconds
        timeoutRef.current = setTimeout(() => {
          setNewlyAddedCount(null);
        }, 3000);
      }
      return;
    }

    const currentLength = queue.length;
    const previousLength = previousQueueLengthRef.current;

    // Only show notification if items were added (not removed)
    if (currentLength > previousLength) {
      const addedCount = currentLength - previousLength;
      setNewlyAddedCount(addedCount);

      // Clear existing timeout if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Auto-hide notification after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setNewlyAddedCount(null);
      }, 3000);
    }

    // Update the ref for next comparison
    previousQueueLengthRef.current = currentLength;

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [queue.length]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className='w-full relative'>
      {/* Status / Trigger */}
      <div
        className='w-full items-center flex justify-start py-2 px-[10px] pr-3 gap-1.5 text-text-muted hover:text-blue-500 cursor-pointer h-[36px]'
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
        {/* Training Status Text */}
        <div className='flex items-center gap-1 w-full'>
          <div className='flex items-center gap-1 w-fit'>
            <Icon name='LoaderCircleIcon' className='size-4 animate-spin' />
            <div className='text-[13px]'>
              Learning {finished}
              <span className='mx-0.5'>/</span>
              {total}
            </div>
          </div>

          {/* Items added confirmation text */}
          <AnimatePresence mode='wait'>
            {newlyAddedCount !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className='text-[13px] whitespace-nowrap ml-1 font-medium text-blue-500 tracking-tighter px-1.5 pr-2 py-[1px] bg-white rounded-sm dark:bg-white/10'
              >
                <span className=''>+{newlyAddedCount}</span>{" "}
                {newlyAddedCount === 1 ? "Item added" : "Items added"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Icon */}
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
