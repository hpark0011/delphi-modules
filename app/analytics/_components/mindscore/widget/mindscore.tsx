"use client";

import React, { useState, useEffect } from "react";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { MindDialog, useMindDialog } from "../mind-dialog";
import { MindProgressBar } from "../mind-progress-bar";
import { MindScoreProvider, useMindScore } from "../mind-score-context";
import { TrainingQueueProvider } from "../training-queue-context";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { ActiveTrainingStatus } from "./active-training-status";
import { LastTrainedDate } from "./last-trained-date";
import {
  TrainingCompletedStatus,
  type TrainingCompletedStatusProps,
} from "./training-completed-status";

function MindScoreTrigger() {
  const { openWithTab } = useMindDialog();
  const {
    current,
    level,
    progressToNextLevel,
    nextLevelThreshold,
    progressCap,
    lastIncrement,
    lastDecrement,
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
        lastDecrement={lastDecrement}
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

interface TrainingStatusTriggerProps {
  showCompletedStatus: boolean;
  setShowCompletedStatus: (show: boolean) => void;
  completedCount: number;
  failedCount: number;
}

function TrainingStatusTrigger({
  showCompletedStatus,
  setShowCompletedStatus,
  completedCount,
  failedCount,
}: TrainingStatusTriggerProps) {
  const { queue } = useTrainingQueue();

  // Only show "Learning" status if there are items still being processed (queued or training)
  const hasActiveItems = queue.some(
    (item) => item.status === "queued" || item.status === "training"
  );

  // Show completed status if flag is set and there are no active items
  // (queue may still contain completed/failed/deleting items for history)
  if (showCompletedStatus && !hasActiveItems) {
    return (
      <TrainingCompletedStatus
        setShowCompletedStatus={setShowCompletedStatus}
        completedCount={completedCount}
        failedCount={failedCount}
      />
    );
  }

  if (hasActiveItems) {
    return <ActiveTrainingStatus />;
  }

  return <LastTrainedDate />;
}

function MindScoreContent() {
  const { queue, clearQueue } = useTrainingQueue();
  const [showCompletedStatus, setShowCompletedStatus] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  // Only show "Learning" status if there are items still being processed (queued or training)
  const hasActiveItems = queue.some(
    (item) => item.status === "queued" || item.status === "training"
  );

  // Detect completion and handle queue clearing
  useEffect(() => {
    // Check if all items are done processing (either completed, failed, or deleting)
    const allDone =
      queue.length > 0 &&
      queue.every(
        (item) =>
          item.status === "completed" ||
          item.status === "failed" ||
          item.status === "deleting"
      );

    console.log("queue", queue);
    console.log("allDone", allDone);

    // Completion Detection: When all items are done (completed or failed) and no active items
    if (allDone && !hasActiveItems) {
      // Capture counts before clearing queue
      const completed = queue.filter(
        (item) => item.status === "completed"
      ).length;
      const failed = queue.filter((item) => item.status === "failed").length;
      setCompletedCount(completed);
      setFailedCount(failed);
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
      setCompletedCount(0);
      setFailedCount(0);
    }
  }, [queue, hasActiveItems, showCompletedStatus, clearQueue]);

  return (
    <AnalyticsSectionWrapper
      className={cn("w-full p-0.5 rounded-[20px] flex flex-col items-center")}
    >
      <MindDialog defaultTab='training-status'>
        <MindScoreTrigger />
        <TrainingStatusTrigger
          showCompletedStatus={showCompletedStatus}
          setShowCompletedStatus={setShowCompletedStatus}
          completedCount={completedCount}
          failedCount={failedCount}
        />
      </MindDialog>
    </AnalyticsSectionWrapper>
  );
}

export function MindScoreWidget() {
  return (
    <MindScoreProvider>
      <TrainingQueueProvider>
        <MindScoreContent />
      </TrainingQueueProvider>
    </MindScoreProvider>
  );
}
