"use client";

import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import { SCORE_PER_ITEM } from "@/app/studio/_constants/training-queue";
import { useTrainingQueue, type QueueItem } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { useEffect, useMemo, useState } from "react";
import { useMindDialog } from "../mind-dialog";
import { ActiveTrainingQueue } from "./active-training-queue";
import { type TrainingItem } from "./training-history";
import { TrainingSummary } from "./training-summary";
// import { TrainingHistory } from "./training-history";

// Re-export for backward compatibility
export type { TrainingItemStatus as TrainingStatus } from "@/utils/training-status-helpers";
export type { TrainingItem };

export function TrainingStatusTab() {
  const { queue } = useTrainingQueue();
  const { current, nextLevelThreshold, lastTrainingDate } = useMindScore();
  const { initialFilter, clearInitialFilter } = useMindDialog();
  const [showCompletedStatus, setShowCompletedStatus] = useState(false);
  const [queueSnapshot, setQueueSnapshot] = useState<QueueItem[]>([]);
  const [hasUserDismissedCompletion, setHasUserDismissedCompletion] =
    useState(false);

  // Use centralized queue status hook
  // showCompletedStatus = true means user has NOT reviewed (showing completion message)
  // useTrainingStatus expects hasUserReviewed (opposite), so we negate it
  const {
    hasActiveItems,
    finishedCount,
    totalCount,
    queueStatus,
    completedCount,
    failedCount,
  } = useTrainingStatus(!showCompletedStatus);

  // Handler for "View summary" button click
  // Accepts boolean parameter to match interface but ignores it
  const handleViewSummary = (_value: boolean) => {
    setShowCompletedStatus(false);
    setHasUserDismissedCompletion(true);
  };

  // Detect completion and handle state transitions
  useEffect(() => {
    // Check if all items are done processing using centralized logic
    const allDone = finishedCount === totalCount && totalCount > 0;

    // Completion Detection: When all items are done and no active items
    // Guard: Only set showCompletedStatus if user hasn't dismissed it
    if (
      allDone &&
      !hasActiveItems &&
      !showCompletedStatus &&
      !hasUserDismissedCompletion
    ) {
      // Capture queue snapshot (all items with final states: completed, failed, deleted)
      setQueueSnapshot([...queue]);
      setShowCompletedStatus(true);
    }

    // Reset on New Items: When new items are added during completion state
    if (queue.length > 0 && showCompletedStatus && hasActiveItems) {
      setShowCompletedStatus(false);
      setQueueSnapshot([]);
      setHasUserDismissedCompletion(false); // Reset dismissal flag when new items are added
    }
  }, [
    queue,
    hasActiveItems,
    showCompletedStatus,
    finishedCount,
    totalCount,
    hasUserDismissedCompletion,
  ]);

  // Calculate summary statistics using memoized values from hook
  const summaryStats = useMemo(() => {
    // Use memoized counts from useTrainingStatus hook for better performance
    // Total trained items (completed + failed + deleted)
    const deleted = finishedCount - completedCount - failedCount;
    const totalTrained = completedCount + failedCount + deleted;

    return {
      totalTrained,
      completed: completedCount,
      failed: failedCount,
    };
  }, [completedCount, failedCount, finishedCount]);

  // Calculate derived values for TrainingSummary
  const scoreIncrease = summaryStats.completed * SCORE_PER_ITEM;
  const remainingToNextLevel = nextLevelThreshold - current;

  return (
    <div className='flex flex-col gap-4'>
      {/* Active training queue - Show when queue is active or finished */}
      {(queueStatus === "active" || queueStatus === "finished") && (
        <ActiveTrainingQueue
          showCompletedStatus={showCompletedStatus}
          setShowCompletedStatus={handleViewSummary}
          finishedCount={finishedCount}
          totalCount={totalCount}
          queueSnapshot={queueSnapshot}
          initialFilter={initialFilter}
          onFilterApplied={clearInitialFilter}
        />
      )}

      {/* Training Summary - Only show when queue is dull (default state) */}
      {queueStatus === "dull" && (
        <TrainingSummary
          summaryStats={summaryStats}
          scoreIncrease={scoreIncrease}
          remainingToNextLevel={remainingToNextLevel}
          trainingDate={lastTrainingDate}
        />
      )}

      {/* Training History */}
      {/* <TrainingHistory /> */}
    </div>
  );
}
