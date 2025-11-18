"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { TrainingStatus } from "@/app/analytics/_components/mindscore/training-status-tab";

export interface QueueItem {
  id: string;
  name: string;
  status: TrainingStatus;
  progress: number; // 0-100
}

const TRAINING_DURATION = 5000; // 5 seconds per item

export function useTrainingQueue() {
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

      for (const item of itemsToProcess) {
        // Update status to training
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, status: "training", progress: 0 } : q
          )
        );

        // Simulate progress over 5 seconds
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

        // Update status to completed
        setQueue((prev) =>
          prev.map((q) =>
            q.id === item.id ? { ...q, status: "completed", progress: 100 } : q
          )
        );
      }

      processingRef.current = false;
    };

    processQueue();
  }, [queue]);

  const addToQueue = useCallback(
    (items: Omit<QueueItem, "id" | "status" | "progress">[]) => {
      const newItems: QueueItem[] = items.map((item) => ({
        ...item,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: "queued" as TrainingStatus,
        progress: 0,
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      intervalRefs.current.forEach((interval) => clearInterval(interval));
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  return {
    queue,
    addToQueue,
    clearQueue,
  };
}
