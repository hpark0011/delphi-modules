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
// import { TrainingQueueToast } from "./training-queue-toast";

export interface QueueItem {
  id: string;
  name: string;
  status: TrainingStatus;
  progress: number; // 0-100
  shouldFail?: boolean; // If true, item will fail after training completes
  shouldDelete?: boolean; // If true, item will enter deleting state after training completes
}

const TRAINING_DURATION = 3500; // 4 seconds per item

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
  const { incrementScore, decrementScore } = useMindScore();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const processingRef = useRef(false);
  const intervalRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Process queue items sequentially
  useEffect(() => {
    if (queue.length === 0 || processingRef.current) return;

    const processQueue = async () => {
      processingRef.current = true;
      const itemsToProcess = queue.filter((item) => item.status === "queued");
      const itemsToDelete = queue.filter((item) => item.status === "deleting");

      // Process queued items (training)
      for (const item of itemsToProcess) {
        // Update status to training
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, status: "training", progress: 0 } : q
          )
        );

        // Simulate progress over TRAINING_DURATION
        const startTime = Date.now();
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min((elapsed / TRAINING_DURATION) * 100, 100);

          setQueue((prev) =>
            prev.map((q) => (q.id === item.id ? { ...q, progress } : q))
          );
        }, 50); // Update every 50ms for smooth animation

        intervalRefs.current.set(item.id, interval);

        // Wait for training to complete
        await new Promise((resolve) => {
          const timeout = setTimeout(() => {
            const intervalToClear = intervalRefs.current.get(item.id);
            if (intervalToClear) {
              clearInterval(intervalToClear);
              intervalRefs.current.delete(item.id);
            }
            resolve(null);
          }, TRAINING_DURATION);
          timeoutRefs.current.push(timeout);
        });

        // Update status based on shouldFail and shouldDelete flags
        if (item.shouldDelete) {
          // Transition to deleting state
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id ? { ...q, status: "deleting", progress: 0 } : q
            )
          );
        } else {
          const finalStatus = item.shouldFail ? "failed" : "completed";
          setQueue((prev) =>
            prev.map((q) =>
              q.id === item.id
                ? { ...q, status: finalStatus, progress: 100 }
                : q
            )
          );

          // Increment mind score only when item completes successfully
          if (!item.shouldFail) {
            incrementScore(25); // 25 points per item
          }
        }
      }

      // Process deleting items
      for (const item of itemsToDelete) {
        // Simulate deletion progress
        const startTime = Date.now();
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min((elapsed / TRAINING_DURATION) * 100, 100);

          setQueue((prev) =>
            prev.map((q) => (q.id === item.id ? { ...q, progress } : q))
          );
        }, 50);

        intervalRefs.current.set(item.id, interval);

        // Wait for deletion to complete
        await new Promise((resolve) => {
          const timeout = setTimeout(() => {
            const intervalToClear = intervalRefs.current.get(item.id);
            if (intervalToClear) {
              clearInterval(intervalToClear);
              intervalRefs.current.delete(item.id);
            }
            resolve(null);
          }, TRAINING_DURATION);
          timeoutRefs.current.push(timeout);
        });

        // Decrement score and remove item from queue
        decrementScore(25);
        setQueue((prev) => prev.filter((q) => q.id !== item.id));
      }

      processingRef.current = false;
    };

    processQueue();
  }, [queue, incrementScore, decrementScore]);

  const addToQueue = useCallback(
    (items: Omit<QueueItem, "id" | "status" | "progress">[]) => {
      const newItems: QueueItem[] = items.map((item) => ({
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

  // Manage toast notification for training queue
  useEffect(() => {
    const toastId = "training-queue";

    if (queue.length === 0) {
      toast.dismiss(toastId);
      return;
    }

    // Create or update toast with stable ID
    // toast.custom(
    //   (t) => (
    //     <TrainingQueueToast
    //       queue={queue}
    //       onClose={() => {
    //         toast.dismiss(t);
    //         clearQueue();
    //       }}
    //     />
    //   ),
    //   {
    //     duration: Infinity,
    //     id: toastId,
    //   }
    // );
  }, [queue, clearQueue]);

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
