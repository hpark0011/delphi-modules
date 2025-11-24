"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import {
  isFinishedItemStatus,
  getTrainingQueueStatus,
  hasActiveItems,
} from "@/components/mind-dialog/training-status-utils";
import { useMindDialog } from "@/components/mind-dialog/mind-dialog";
import { useEffect, useRef, useState } from "react";

type BadgeState = "loading" | "newItem" | "finished";

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 30,
};

const NEW_ITEM_DISPLAY_DURATION = 2000;

function StatusIcon({ state }: { state: BadgeState }) {
  return (
    <span
      className={`relative flex items-center justify-center ${state === "finished" ? "size-5" : "size-4"}`}
    >
      <AnimatePresence mode='sync'>
        <motion.span
          key={state}
          className='absolute left-0 top-0'
          initial={{ y: -20, scale: 0.5, filter: "blur(6px)" }}
          animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ y: 20, scale: 0.5, filter: "blur(6px)" }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {state === "loading" && (
            <Icon name='LoaderCircleIcon' className='size-4 animate-spin' />
          )}
          {state === "newItem" && (
            <Icon name='MicFillIcon' className='size-4' />
          )}
          {state === "finished" && (
            <Icon
              name='CheckedCircleFillIcon'
              className='size-5 text-[#09CE6B]'
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface StatusLabelProps {
  state: BadgeState;
  finished: number;
  total: number;
  newItemName: string;
}

function StatusLabel({
  state,
  finished,
  total,
  newItemName,
}: StatusLabelProps) {
  const [labelWidth, setLabelWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);

  const labelText =
    state === "loading"
      ? `Learning ${finished} / ${total}`
      : state === "newItem"
        ? newItemName
        : "Completed!";

  const isNewItem = state === "newItem";

  useEffect(() => {
    if (measureRef.current) {
      const { width } = measureRef.current.getBoundingClientRect();
      setLabelWidth(isNewItem ? Math.min(width, 160) : width);
    }
  }, [labelText, isNewItem]);

  return (
    <>
      {/* Hidden copy to measure width */}
      <div
        ref={measureRef}
        className='absolute invisible whitespace-nowrap text-[13px]'
      >
        {labelText}
      </div>

      <motion.span
        className='relative overflow-hidden'
        animate={{ width: labelWidth }}
        transition={SPRING_CONFIG}
      >
        <AnimatePresence mode='sync' initial={false}>
          <motion.div
            key={state + labelText}
            className={`text-[13px] ${isNewItem ? "max-w-[160px] truncate" : "whitespace-nowrap"}`}
            initial={{
              y: -20,
              opacity: 0,
              filter: "blur(10px)",
              position: "absolute",
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              position: "relative",
            }}
            exit={{
              y: 20,
              opacity: 0,
              filter: "blur(10px)",
              position: "absolute",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {labelText}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

export function MiniTrainingStatus() {
  const { queue } = useTrainingQueue();
  const { openWithTab } = useMindDialog();

  const finished = queue.filter((item) =>
    isFinishedItemStatus(item.status)
  ).length;
  const total = queue.length;

  // Use centralized queue status logic
  // Note: This widget doesn't track user review state, so we assume user hasn't reviewed
  // (hasUserReviewed = false) to show "finished" state when appropriate
  const queueStatus = getTrainingQueueStatus(queue, false);

  // Derived base state from queue status
  // "active" → "loading", everything else → "finished"
  const baseState: "loading" | "finished" =
    queueStatus === "active" ? "loading" : "finished";

  // Single override state for temporary "newItem" display
  // Initialize with first item's name on mount
  const [newItemOverride, setNewItemOverride] = useState<string | null>(() => {
    return queue.length > 0 ? queue[queue.length - 1].name : null;
  });

  const prevQueueLengthRef = useRef(queue.length);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle initial mount - start timer to clear override
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setNewItemOverride(null);
    }, NEW_ITEM_DISPLAY_DURATION);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Detect new items added after initial mount
  useEffect(() => {
    if (queue.length > prevQueueLengthRef.current) {
      const newestItem = queue[queue.length - 1];
      if (newestItem) {
        setNewItemOverride(newestItem.name);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setNewItemOverride(null);
        }, NEW_ITEM_DISPLAY_DURATION);
      }
    }
    prevQueueLengthRef.current = queue.length;
  }, [queue]);

  // Display state: override takes priority over base state
  const displayState: BadgeState =
    newItemOverride !== null ? "newItem" : baseState;

  const handleClick = () => {
    openWithTab("training-status");
  };

  return (
    <motion.div
      className={`flex items-center ${displayState === "finished" ? "gap-0.5" : "gap-1.5"} text-text-muted cursor-pointer hover:text-blue-500`}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={SPRING_CONFIG}
      onClick={handleClick}
    >
      <StatusIcon state={displayState} />
      <StatusLabel
        state={displayState}
        finished={finished}
        total={total}
        newItemName={newItemOverride ?? ""}
      />
    </motion.div>
  );
}
