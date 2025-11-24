/**
 * Training Status Utilities
 *
 * This file provides centralized utilities for managing training item statuses
 * and training queue statuses.
 */

// ============================================================================
// TRAINING ITEM STATUS
// ============================================================================

/**
 * Training Item Status: The status of an individual item in the training queue
 */
export type TrainingItemStatus =
  | "queued" // Item is waiting to be processed
  | "training" // Item is currently being processed
  | "completed" // Item completed successfully
  | "failed" // Item failed during processing
  | "deleted"; // Item was deleted (final state)

/**
 * Active statuses: items currently being processed
 * These items are still in the queue and being worked on
 */
export const ACTIVE_ITEM_STATUSES: TrainingItemStatus[] = [
  "queued",
  "training",
];

/**
 * Finished statuses: items that completed processing
 * This includes successful completion, failures, and deletions
 */
export const FINISHED_ITEM_STATUSES: TrainingItemStatus[] = [
  "completed",
  "failed",
  "deleted",
];

/**
 * Check if an item status is active (queued or training)
 */
export function isActiveItemStatus(status: TrainingItemStatus): boolean {
  return ACTIVE_ITEM_STATUSES.includes(status);
}

/**
 * Check if an item status is finished (completed, failed, or deleted)
 */
export function isFinishedItemStatus(status: TrainingItemStatus): boolean {
  return FINISHED_ITEM_STATUSES.includes(status);
}

// ============================================================================
// TRAINING QUEUE STATUS
// ============================================================================

/**
 * Training Queue Status: The overall status of the training queue
 *
 * State transitions:
 * dull → (add items) → active → (all complete) → finished → (user reviews) → dull
 *
 * - dull: Default state. No training going on and user has reviewed all updates.
 * - active: When there are items in the training queue (has queued or training items).
 * - finished: All items are finished (failed, completed, or deleted).
 *             No queued or training items, and user hasn't reviewed the recent change.
 *
 * @example
 * // User adds items
 * "dull" → "active"
 *
 * // Training completes
 * "active" → "finished"
 *
 * // User clicks "View summary"
 * "finished" → "dull"
 */
export type TrainingQueueStatus = "dull" | "active" | "finished";

/**
 * Determine the training queue status based on the queue items and review state
 *
 * @param queue - Array of queue items
 * @param hasUserReviewed - Whether the user has reviewed/dismissed the completion notification
 * @returns The current training queue status
 */
export function getTrainingQueueStatus(
  queue: Array<{ status: TrainingItemStatus }>,
  hasUserReviewed: boolean = false
): TrainingQueueStatus {
  // If queue is empty, return dull (default state)
  if (queue.length === 0) {
    return "dull";
  }

  // Check if there are any active items (queued or training)
  const hasActiveItems = queue.some((item) => isActiveItemStatus(item.status));

  // If there are active items, queue is active
  if (hasActiveItems) {
    return "active";
  }

  // All items are finished
  // If user has reviewed, return dull; otherwise return finished
  return hasUserReviewed ? "dull" : "finished";
}

/**
 * Check if the queue has any active items (queued or training)
 */
export function hasActiveItems(
  queue: Array<{ status: TrainingItemStatus }>
): boolean {
  return queue.some((item) => isActiveItemStatus(item.status));
}

/**
 * Get count of finished items (completed, failed, or deleted)
 */
export function getFinishedItemCount(
  queue: Array<{ status: TrainingItemStatus }>
): number {
  return queue.filter((item) => isFinishedItemStatus(item.status)).length;
}

// ============================================================================
// LEGACY EXPORTS (for backward compatibility during migration)
// ============================================================================

/**
 * @deprecated Use TrainingItemStatus instead
 */
export type TrainingStatus = TrainingItemStatus;

/**
 * @deprecated Use ACTIVE_ITEM_STATUSES instead
 */
export const ACTIVE_STATUSES = ACTIVE_ITEM_STATUSES;

/**
 * @deprecated Use FINISHED_ITEM_STATUSES instead
 */
export const FINISHED_STATUSES = FINISHED_ITEM_STATUSES;

/**
 * @deprecated Use isActiveItemStatus instead
 */
export function isActiveStatus(status: TrainingItemStatus): boolean {
  return isActiveItemStatus(status);
}

/**
 * @deprecated Use isFinishedItemStatus instead
 */
export function isFinishedStatus(status: TrainingItemStatus): boolean {
  return isFinishedItemStatus(status);
}
