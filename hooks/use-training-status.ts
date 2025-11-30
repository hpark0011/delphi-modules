"use client";

import { useMemo } from "react";
import {
  getFinishedItemCount,
  getTrainingQueueStatus,
  hasActiveItems,
} from "@/utils/training-status-helpers";
import { useTrainingQueue } from "./use-training-queue";

/**
 * Hook to get training queue status information
 *
 * @param hasUserReviewed - Whether the user has reviewed/dismissed the completion notification
 * @returns {object} Training status information
 * @property {boolean} hasActiveItems - True if there are items being queued or trained
 * @property {number} finishedCount - Number of items that finished processing (completed, failed, or deleted)
 * @property {number} totalCount - Total number of items in the queue
 * @property {number} activeCount - Number of items still being processed
 * @property {number} completedCount - Number of items that completed successfully
 * @property {number} failedCount - Number of items that failed during processing
 * @property {boolean} isIdle - True if there are no active items and the queue is empty
 * @property {TrainingQueueStatus} queueStatus - The overall status of the training queue (dull, active, finished)
 */
export function useTrainingStatus(hasUserReviewed: boolean = false) {
  const { queue } = useTrainingQueue();

  const activeItemsExist = hasActiveItems(queue);
  const finishedCount = getFinishedItemCount(queue);
  const totalCount = queue.length;
  const queueStatus = getTrainingQueueStatus(queue, hasUserReviewed);
  const activeCount = totalCount - finishedCount; // Count of items still being processed

  // Memoize counts to avoid recalculating on every render
  const { completedCount, failedCount } = useMemo(() => {
    return {
      completedCount: queue.filter((item) => item.status === "completed")
        .length,
      failedCount: queue.filter((item) => item.status === "failed").length,
    };
  }, [queue]);

  return {
    hasActiveItems: activeItemsExist,
    finishedCount,
    totalCount,
    activeCount,
    completedCount,
    failedCount,
    isIdle: !activeItemsExist && queue.length === 0,
    queueStatus,
  };
}
