"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { MindDialog, useMindDialog } from "./mind-dialog";
import { MindProgressBar } from "./mind-progress-bar";
import { MindScoreProvider, useMindScore } from "./mind-score-context";
import { TrainingQueueProvider } from "./training-queue-context";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrainingQueueItem } from "./training-queue-item";
import { cn } from "@/lib/utils";

function MindScoreTrigger() {
  const { openWithTab } = useMindDialog();
  const {
    current,
    level,
    progressToNextLevel,
    nextLevelThreshold,
    progressCap,
    lastIncrement,
  } = useMindScore();

  return (
    <div
      className='w-full flex flex-col gap-2 relative cursor-pointer rounded-[18px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.3),0_1px_1px_0_rgba(0,0,0,0.15)] overflow-hidden bg-black/87 border border-white/20 hover:bg-black/84 dark:border-white/3 dark:bg-black/40'
      onClick={() => openWithTab("add-knowledge")}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openWithTab("add-knowledge");
        }
      }}
    >
      {/* Progress Bar */}
      <MindProgressBar
        progressToNextLevel={progressToNextLevel}
        nextLevelThreshold={nextLevelThreshold}
        progressCap={progressCap}
        lastIncrement={lastIncrement}
      />

      {/* Mind Score Value */}
      <div className='flex flex-col gap-2 w-full justify-center items-center relative z-10'>
        <div className='flex flex-col items-center justify-center h-[160px] text-white gap-0.5'>
          {/* Mind Score Value */}
          <p className='font-medium text-center text-6xl tracking-tighter'>
            {current}
          </p>
          <p className='text-sm font-medium text-center text-text-muted'>
            {level}
          </p>
        </div>
      </div>
    </div>
  );
}

function ActiveTrainingStatus() {
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
        className='w-full items-center flex justify-center p-2 gap-1 text-text-muted hover:text-blue-400 cursor-pointer'
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
        <div className='text-[13px]'>
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

function LastTrainedDate() {
  const { openWithTab } = useMindDialog();

  return (
    <div
      className='w-full items-center flex justify-center p-2 gap-1 text-text-muted hover:text-blue-400 cursor-pointer'
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
      <div className='text-[13px]'>Last trained at Nov 17, 2025</div>
      <Icon name='ArrowUpRightIcon' className='size-4' />
    </div>
  );
}

interface TrainingCompletedStatusProps {
  setShowCompletedStatus: (show: boolean) => void;
}

function TrainingCompletedStatus({
  setShowCompletedStatus,
}: TrainingCompletedStatusProps) {
  const { openWithTab } = useMindDialog();

  return (
    <div
      className='w-full items-center flex justify-center p-2 gap-1 text-text-muted hover:text-blue-400 cursor-pointer'
      onClick={() => {
        setShowCompletedStatus(false);
        openWithTab("training-status");
      }}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShowCompletedStatus(false);
          openWithTab("training-status");
        }
      }}
    >
      <div className='text-[13px]'>Training completed</div>
      <Icon name='ArrowUpRightIcon' className='size-4' />
    </div>
  );
}

function TrainingStatusTrigger() {
  const { queue, clearQueue } = useTrainingQueue();
  const [showCompletedStatus, setShowCompletedStatus] = useState(false);

  // Only show "Learning" status if there are items still being processed (queued or training)
  const hasActiveItems = queue.some(
    (item) => item.status === "queued" || item.status === "training"
  );

  // Detect completion and handle queue clearing
  useEffect(() => {
    const allCompleted =
      queue.length > 0 && queue.every((item) => item.status === "completed");

    // Completion Detection: When all items are completed and no active items
    if (allCompleted && !hasActiveItems) {
      setShowCompletedStatus(true);
      // Clear queue after a short delay to ensure state update
      const timer = setTimeout(() => {
        clearQueue();
      }, 100);
      return () => clearTimeout(timer);
    }

    // Reset on New Items: When new items are added (queue has items and active items)
    if (queue.length > 0 && showCompletedStatus && hasActiveItems) {
      setShowCompletedStatus(false);
    }
  }, [queue, hasActiveItems, showCompletedStatus, clearQueue]);

  if (showCompletedStatus && queue.length === 0) {
    return (
      <TrainingCompletedStatus
        setShowCompletedStatus={setShowCompletedStatus}
      />
    );
  }

  return <>{hasActiveItems ? <ActiveTrainingStatus /> : <LastTrainedDate />}</>;
}

export function NewMindscore() {
  return (
    <MindScoreProvider>
      <TrainingQueueProvider>
        <AnalyticsSectionWrapper className='w-full p-0.5 rounded-[20px] flex flex-col items-center'>
          <MindDialog defaultTab='training-status'>
            <MindScoreTrigger />
            <TrainingStatusTrigger />
          </MindDialog>
        </AnalyticsSectionWrapper>
      </TrainingQueueProvider>
    </MindScoreProvider>
  );
}
