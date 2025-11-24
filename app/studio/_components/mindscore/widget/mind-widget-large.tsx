"use client";

import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { useTrainingQueue, type QueueItem } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  MindDialog,
  useMindDialog,
} from "@/components/mind-dialog/mind-dialog";
import { MindProgressBar } from "../mind-progress-bar";
import { MindScoreProvider, useMindScore } from "../mind-score-context";
import { TrainingQueueProvider } from "@/components/mind-dialog/training-queue-context";
import {
  getTrainingQueueStatus,
  isFinishedItemStatus,
} from "@/utils/training-status-utils";
import { ActiveTrainingStatus } from "./active-training-status";
import { LastTrainedDate } from "./last-trained-date";
import { TrainingCompletedStatus } from "./training-completed-status";

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
  queue: QueueItem[];
}

function TrainingStatusTrigger({
  showCompletedStatus,
  setShowCompletedStatus,
  completedCount,
  failedCount,
  queue,
}: TrainingStatusTriggerProps) {
  // Use centralized queue status logic
  // showCompletedStatus = true means user has NOT reviewed (showing completion message)
  const queueStatus = getTrainingQueueStatus(queue, !showCompletedStatus);

  // Show completed status when user hasn't reviewed (regardless of queue state)
  // This handles both "finished" (items still in queue) and "dull" (empty queue) states
  if (showCompletedStatus) {
    return (
      <TrainingCompletedStatus
        setShowCompletedStatus={setShowCompletedStatus}
        completedCount={completedCount}
        failedCount={failedCount}
        queueSnapshot={queue}
      />
    );
  }

  // Show active training status when queue is active
  if (queueStatus === "active") {
    return <ActiveTrainingStatus />;
  }

  // Default: show last trained date (dull state)
  return <LastTrainedDate />;
}

function MindScoreContent() {
  const { queue } = useTrainingQueue();
  const [showCompletedStatus, setShowCompletedStatus] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  // Detect completion and handle state updates
  useEffect(() => {
    // Manual detection: all items finished and user hasn't been shown completion
    const allFinished =
      queue.length > 0 &&
      queue.every((item) => isFinishedItemStatus(item.status));

    if (allFinished && !showCompletedStatus) {
      const completed = queue.filter(
        (item) => item.status === "completed"
      ).length;
      const failed = queue.filter((item) => item.status === "failed").length;
      setCompletedCount(completed);
      setFailedCount(failed);
      setShowCompletedStatus(true);
      // No queue clearing - keep finished items for history
      // No snapshot needed - use queue directly
    }

    // Reset when new items added (queue becomes active)
    // Use queueStatus to detect when new active items are added
    const queueStatus = getTrainingQueueStatus(queue, !showCompletedStatus);
    if (queueStatus === "active" && showCompletedStatus) {
      setShowCompletedStatus(false);
      setCompletedCount(0);
      setFailedCount(0);
    }
  }, [queue, showCompletedStatus]);

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
          queue={queue}
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
