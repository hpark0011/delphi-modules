"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { toast } from "sonner";
import type { TrainingStatus } from "./training-status-tab";
import { useMindScore } from "./mind-score-context";

export type TrainingDocType =
  | "interview"
  | "youtube"
  | "x"
  | "website"
  | "podcast"
  | "file"
  | "generic";

export interface QueueItem {
  id: string;
  name: string;
  docType: TrainingDocType;
  status: TrainingStatus;
  progress: number; // 0-100
  shouldFail?: boolean; // If true, item will fail after training completes
  shouldDelete?: boolean; // If true, item will enter deleting state after training completes
}

// Constants
const TRAINING_DURATION = 3500; // 3.5 seconds per item
const PROGRESS_UPDATE_INTERVAL = 50; // Update every 50ms for smooth animation
const SCORE_PER_ITEM = 25; // Points awarded/deducted per item

interface TrainingQueueContextType {
  queue: QueueItem[];
  addToQueue: (
    items: Omit<QueueItem, "id" | "status" | "progress">[]
  ) => QueueItem[];
  clearQueue: () => void;
}

const TrainingQueueContext = createContext<TrainingQueueContextType | null>(
  null
);

interface TrainingQueueProviderProps {
  children: React.ReactNode;
}

export function TrainingQueueProvider({
  children,
}: TrainingQueueProviderProps) {
  const { incrementScore } = useMindScore();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const processingRef = useRef(false);
  const intervalRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  /**
   * Helper: Updates a specific queue item's properties
   */
  const updateItemStatus = useCallback(
    (itemId: string, updates: Partial<QueueItem>) => {
      setQueue((prev) =>
        prev.map((q) => (q.id === itemId ? { ...q, ...updates } : q))
      );
    },
    []
  );

  /**
   * Helper: Processes a single item with progress tracking
   * Returns a promise that resolves when processing completes
   */
  const processItemProgress = useCallback(
    (itemId: string, duration: number): Promise<void> => {
      return new Promise((resolve) => {
        const startTime = Date.now();

        // Update progress every PROGRESS_UPDATE_INTERVAL
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min((elapsed / duration) * 100, 100);
          updateItemStatus(itemId, { progress });
        }, PROGRESS_UPDATE_INTERVAL);

        intervalRefs.current.set(itemId, interval);

        // Wait for duration to complete
        const timeout = setTimeout(() => {
          const intervalToClear = intervalRefs.current.get(itemId);
          if (intervalToClear) {
            clearInterval(intervalToClear);
            intervalRefs.current.delete(itemId);
          }
          resolve();
        }, duration);

        timeoutRefs.current.push(timeout);
      });
    },
    [updateItemStatus]
  );

  /**
   * Helper: Safely updates score with error handling
   */
  const updateScoreSafely = useCallback(
    (scoreFn: (points: number) => void, points: number, action: string) => {
      try {
        scoreFn(points);
      } catch (error) {
        console.error(`Failed to ${action} score:`, error);
      }
    },
    []
  );

  // Process queue items sequentially
  useEffect(() => {
    if (queue.length === 0 || processingRef.current) return;

    const processQueue = async () => {
      processingRef.current = true;

      // Separate items by status
      const itemsToProcess = queue.filter((item) => item.status === "queued");
      const itemsToDelete = queue.filter((item) => item.status === "deleting");

      // ============ Process Training Queue ============
      for (const item of itemsToProcess) {
        // Start training
        updateItemStatus(item.id, { status: "training", progress: 0 });

        // Simulate progress over TRAINING_DURATION
        await processItemProgress(item.id, TRAINING_DURATION);

        // Determine final status and handle transitions
        if (item.shouldDelete) {
          // Transition to deleting state
          updateItemStatus(item.id, { status: "deleting", progress: 0 });
        } else {
          // Complete or fail
          const finalStatus = item.shouldFail ? "failed" : "completed";
          updateItemStatus(item.id, { status: finalStatus, progress: 100 });

          // Award points for successful completion
          if (!item.shouldFail) {
            updateScoreSafely(incrementScore, SCORE_PER_ITEM, "increment");
          }
        }
      }

      // ============ Process Deletion Queue ============
      for (const item of itemsToDelete) {
        // Simulate deletion progress
        await processItemProgress(item.id, TRAINING_DURATION);

        // Mark as deleted (keep in history like completed/failed items)
        updateItemStatus(item.id, { status: "deleting", progress: 100 });
      }

      processingRef.current = false;
    };

    processQueue();
  }, [
    queue,
    updateItemStatus,
    processItemProgress,
    updateScoreSafely,
    incrementScore,
  ]);

  const addToQueue = useCallback(
    (items: Omit<QueueItem, "id" | "status" | "progress">[]) => {
      const newItems: QueueItem[] = items.map((item) => ({
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        docType: item.docType,
        status: "queued" as TrainingStatus,
        progress: 0,
        shouldFail: item.shouldFail ?? false,
        shouldDelete: item.shouldDelete ?? false,
      }));

      setQueue((prev) => [...prev, ...newItems]);
      return newItems;
    },
    []
  );

  const clearQueue = useCallback(() => {
    // Clear all intervals
    intervalRefs.current.forEach((interval) => clearInterval(interval));
    intervalRefs.current.clear();
    // Clear all timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];
    setQueue([]);
    processingRef.current = false;
  }, []);

  // Dismiss toast when queue is empty
  useEffect(() => {
    if (queue.length === 0) {
      toast.dismiss("training-queue");
    }
  }, [queue.length]);

  // Note: No cleanup on unmount - we want the queue to persist
  // Only clear when explicitly calling clearQueue()

  const value = React.useMemo(
    () => ({
      queue,
      addToQueue,
      clearQueue,
    }),
    [queue, addToQueue, clearQueue]
  );

  return (
    <TrainingQueueContext.Provider value={value}>
      {children}
    </TrainingQueueContext.Provider>
  );
}

export function useTrainingQueueContext() {
  const context = useContext(TrainingQueueContext);
  if (!context) {
    throw new Error(
      "useTrainingQueueContext must be used within TrainingQueueProvider"
    );
  }
  return context;
}
