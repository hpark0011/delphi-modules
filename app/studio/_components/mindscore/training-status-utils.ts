import type { TrainingStatus } from "./training-status-tab";

/**
 * Active statuses: items currently being processed
 * These items are still in the queue and being worked on
 */
export const ACTIVE_STATUSES: TrainingStatus[] = ["queued", "training"];

/**
 * Finished statuses: items that completed processing
 * This includes successful completion, failures, and deletions
 */
export const FINISHED_STATUSES: TrainingStatus[] = [
  "completed",
  "failed",
  "deleting",
];

/**
 * Check if a status is active (queued or training)
 */
export function isActiveStatus(status: TrainingStatus): boolean {
  return ACTIVE_STATUSES.includes(status);
}

/**
 * Check if a status is finished (completed, failed, or deleting)
 */
export function isFinishedStatus(status: TrainingStatus): boolean {
  return FINISHED_STATUSES.includes(status);
}
