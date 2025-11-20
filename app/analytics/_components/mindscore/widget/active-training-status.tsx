"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { useMindDialog } from "../mind-dialog";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrainingQueueItem } from "../training-queue-item";
import { cn } from "@/lib/utils";

export function ActiveTrainingStatus() {
  const { queue } = useTrainingQueue();
  const { openWithTab } = useMindDialog();
  const [isExpanded, setIsExpanded] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousQueueLengthRef = useRef(queue.length);

  // Calculate processed items (completed + training)
  const processed = queue.filter(
    (item) => item.status === "completed" || item.status === "training"
  ).length;
  const total = queue.length;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  // Auto-scroll to bottom when new items are added
  useEffect(() => {
    if (
      isExpanded &&
      queue.length > previousQueueLengthRef.current &&
      scrollContainerRef.current
    ) {
      const container = scrollContainerRef.current;
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 0);
    }
    previousQueueLengthRef.current = queue.length;
  }, [queue.length, isExpanded]);

  return (
    <div className='w-full relative'>
      {/* Status / Trigger */}
      <div
        className='w-full items-center flex justify-start py-2 px-[11px] pr-3 gap-1.5 text-text-muted hover:text-blue-400 cursor-pointer'
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
        <Icon name='LoaderCircleIcon' className='size-4 animate-spin' />
        <div className='text-[13px] w-full'>
          Learning {processed}
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
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='overflow-hidden w-full relative rounded-b-2xl bg-transparent'
          >
            <div className='h-2.5 w-full bg-gradient-to-b from-extra-light to-transparent absolute top-0 left-0' />
            <div
              ref={scrollContainerRef}
              className={cn("overflow-hidden", "max-h-[104px] overflow-y-auto")}
            >
              <AnimatePresence mode='popLayout'>
                {queue.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TrainingQueueItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
              <div
                className='text-[13px] flex items-center justify-start gap-0.5 py-1 pb-1.5 text-text-muted cursor-pointer hover:text-blue-400 bg-gradient-to-t from-extra-light to-transparent px-3 w-full text-center'
                onClick={() => openWithTab("training-status")}
                role='button'
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openWithTab("training-status");
                  }
                }}
              >
                <span className='pb-0.5'>View all</span>
                <Icon name='ArrowUpRightIcon' className='size-4' />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
