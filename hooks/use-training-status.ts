"use client";

import { QueueItem, useTrainingQueue } from "./use-training-queue";
import {
  hasActiveItems,
  getFinishedItemCount,
  getTrainingQueueStatus,
  type TrainingQueueStatus,
} from "@/utils/training-status-utils";

/**
 * Hook to get training queue status information
 *
 * @param hasUserReviewed - Whether the user has reviewed/dismissed the completion notification
 * @returns {object} Training status information
 * @property {boolean} hasActiveItems - True if there are items being queued or trained
 * @property {number} finishedCount - Number of items that finished processing (completed, failed, or deleted)
 * @property {number} totalCount - Total number of items in the queue
 * @property {boolean} isIdle - True if there are no active items and the queue is empty
 * @property {TrainingQueueStatus} queueStatus - The overall status of the training queue (dull, active, finished)
 */
export function useTrainingStatus(hasUserReviewed: boolean = false) {
  const { queue } = useTrainingQueue();

  const activeItemsExist = hasActiveItems(queue);
  const finishedCount = getFinishedItemCount(queue);
  const totalCount = queue.length;
  const queueStatus = getTrainingQueueStatus(queue, hasUserReviewed);

  return {
    hasActiveItems: activeItemsExist,
    finishedCount,
    totalCount,
    isIdle: !activeItemsExist && queue.length === 0,
    queueStatus,
  };
}
