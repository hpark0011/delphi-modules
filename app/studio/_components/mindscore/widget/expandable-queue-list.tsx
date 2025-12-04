"use client";

import { useRef, useEffect } from "react";
import { Icon } from "@/components/ui/icon";
import { useMindDialog } from "@/components/mind-dialog/mind-dialog-2";
import type { QueueItem } from "@/hooks/use-training-queue";
import { motion, AnimatePresence } from "framer-motion";
import { TrainingQueueItem } from "../training-queue-item";
import { cn } from "@/lib/utils";

interface ExpandableQueueListProps {
  items: QueueItem[];
  isExpanded: boolean;
  enableAutoScroll?: boolean;
}

export function ExpandableQueueList({
  items,
  isExpanded,
  enableAutoScroll = true,
}: ExpandableQueueListProps) {
  const { openWithTab } = useMindDialog();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousItemsLengthRef = useRef(items.length);

  // Auto-scroll to bottom when new items are added (only if enabled)
  useEffect(() => {
    if (
      enableAutoScroll &&
      isExpanded &&
      items.length > previousItemsLengthRef.current &&
      scrollContainerRef.current
    ) {
      const container = scrollContainerRef.current;
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 0);
    }
    previousItemsLengthRef.current = items.length;
  }, [items.length, isExpanded, enableAutoScroll]);

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='overflow-hidden w-full relative rounded-b-2xl bg-transparent'
        >
          <div className='h-2 w-full bg-gradient-to-b from-extra-light to-transparent absolute top-0 left-0' />
          <div
            ref={scrollContainerRef}
            className={cn("overflow-hidden", "max-h-[104px] overflow-y-auto")}
          >
            <AnimatePresence mode='popLayout'>
              {items.map((item) => (
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
              className='text-[13px] flex items-center justify-start gap-0.5 py-1.5 pb-2 text-text-muted cursor-pointer hover:text-blue-500 bg-gradient-to-t from-extra-light to-transparent px-3 w-full text-center'
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
  );
}
