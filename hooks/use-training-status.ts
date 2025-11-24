"use client";

import { QueueItem, useTrainingQueue } from "./use-training-queue";
import {
  isActiveStatus,
  isFinishedStatus,
} from "@/components/mind-dialog/training-status-utils";

/**
 * Hook to get training queue status information
 *
 * @returns {object} Training status information
 * @property {boolean} hasActiveItems - True if there are items being queued or trained
 * @property {number} finishedCount - Number of items that finished processing (completed, failed, or deleting)
 * @property {number} totalCount - Total number of items in the queue
 * @property {boolean} isIdle - True if there are no active items and the queue is empty
 */
export function useTrainingStatus() {
  const { queue } = useTrainingQueue();

  // Get active items (queued or training)
  const activeItems = queue.filter((item: QueueItem) =>
    isActiveStatus(item.status)
  );

  // Get finished items (completed, failed, or deleting)
  const finishedItems = queue.filter((item: QueueItem) =>
    isFinishedStatus(item.status)
  );

  const hasActiveItems = activeItems.length > 0;

  // For "Learning X/Y" display:
  // X = finished items (items that completed processing)
  // Y = total items in queue
  const finishedCount = finishedItems.length;
  const totalCount = queue.length;

  return {
    hasActiveItems,
    finishedCount,
    totalCount,
    isIdle: !hasActiveItems && queue.length === 0,
  };
}
