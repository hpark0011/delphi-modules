"use client";

import { useTrainingQueueContext } from "@/app/analytics/_components/mindscore/training-queue-context";

// Re-export QueueItem for backward compatibility
export type { QueueItem } from "@/app/analytics/_components/mindscore/training-queue-context";

interface UseTrainingQueueOptions {
  onItemCompleted?: (points?: number) => void;
}

/**
 * Hook to access the training queue context.
 * This is a thin wrapper around TrainingQueueContext for backward compatibility.
 * The onItemCompleted option is deprecated - score increment is handled automatically in the context.
 */
export function useTrainingQueue(options?: UseTrainingQueueOptions) {
  // Note: onItemCompleted is ignored - score increment is handled in TrainingQueueContext
  // This parameter is kept for backward compatibility but does nothing
  const context = useTrainingQueueContext();

  return {
    queue: context.queue,
    addToQueue: context.addToQueue,
    clearQueue: context.clearQueue,
  };
}
