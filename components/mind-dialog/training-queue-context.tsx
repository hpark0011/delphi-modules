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
import type { TrainingItemStatus } from "@/utils/training-status-helpers";
import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import {
  PROGRESS_UPDATE_INTERVAL,
  SCORE_PER_ITEM,
} from "@/app/studio/_constants/training-queue";
import {
  getDurationByDocType,
  updateScoreSafely,
} from "@/app/studio/_utils/training-queue-helpers";

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
  status: TrainingItemStatus;
  progress: number; // 0-100
  duration: number; // Training duration in milliseconds
  shouldFail?: boolean; // If true, item will fail after training completes
  shouldDelete?: boolean; // If true, item will enter deleted state after training completes
}

type QueueItemInput = Omit<
  QueueItem,
  "id" | "status" | "progress" | "duration"
> & {
  duration?: number; // Optional duration, will be calculated from docType if not provided
};

interface TrainingQueueContextType {
  queue: QueueItem[];
  addToQueue: (items: QueueItemInput[]) => QueueItem[];
  clearQueue: () => void;
  removeItem: (itemId: string) => void;
  retryItem: (itemId: string) => void;
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
  const { incrementScore, setLastTrainingDate } = useMindScore();
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

  // Process queue items sequentially
  useEffect(() => {
    if (queue.length === 0 || processingRef.current) return;

    const processQueue = async () => {
      processingRef.current = true;

      // Separate items by status
      const itemsToProcess = queue.filter((item) => item.status === "queued");

      // ============ Process Training Queue ============
      for (const item of itemsToProcess) {
        // Start training
        updateItemStatus(item.id, { status: "training", progress: 0 });

        // Simulate progress over item duration
        await processItemProgress(item.id, item.duration);

        // Determine final status and handle transitions
        if (item.shouldDelete) {
          // Transition to deleted state (mark as deleted immediately since training is done)
          updateItemStatus(item.id, { status: "deleted", progress: 100 });
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

      // Update last training date when queue processing completes
      if (itemsToProcess.length > 0) {
        setLastTrainingDate(new Date());
      }

      processingRef.current = false;
    };

    processQueue();
  }, [
    queue,
    updateItemStatus,
    processItemProgress,
    incrementScore,
    setLastTrainingDate,
  ]);

  const addToQueue = useCallback((items: QueueItemInput[]) => {
    const newItems: QueueItem[] = items.map((item) => {
      // Calculate duration: use provided duration or default based on docType
      const duration = item.duration ?? getDurationByDocType(item.docType);

      return {
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        docType: item.docType,
        status: "queued" as TrainingItemStatus,
        progress: 0,
        duration,
        shouldFail: item.shouldFail ?? false,
        shouldDelete: item.shouldDelete ?? false,
      };
    });

    setQueue((prev) => [...prev, ...newItems]);
    return newItems;
  }, []);

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

  const removeItem = useCallback((itemId: string) => {
    // Clear any intervals/timeouts for this item
    const intervalToClear = intervalRefs.current.get(itemId);
    if (intervalToClear) {
      clearInterval(intervalToClear);
      intervalRefs.current.delete(itemId);
    }
    // Remove item from queue
    setQueue((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const retryItem = useCallback(
    (itemId: string) => {
      // Reset item status to queued and progress to 0
      updateItemStatus(itemId, {
        status: "queued" as TrainingItemStatus,
        progress: 0,
        shouldFail: false,
      });
    },
    [updateItemStatus]
  );

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
      removeItem,
      retryItem,
    }),
    [queue, addToQueue, clearQueue, removeItem, retryItem]
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
