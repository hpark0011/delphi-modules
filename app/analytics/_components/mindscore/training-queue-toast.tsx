"use client";

import { Icon } from "@/components/ui/icon";
import { motion, AnimatePresence } from "framer-motion";
import type { QueueItem } from "@/hooks/use-training-queue";
import { TrainingQueueItem } from "./training-queue-item";

interface TrainingQueueToastProps {
  queue: QueueItem[];
  onClose: () => void;
}

export function TrainingQueueToast({
  queue,
  onClose,
}: TrainingQueueToastProps) {
  const hasActiveItems = queue.some(
    (item) => item.status === "queued" || item.status === "training"
  );

  return (
    <div className='bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[320px] max-w-[420px]'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 py-3 border-b border-border'>
        <h3 className='text-sm font-medium text-text-primary'>
          Training content
        </h3>
        <button
          onClick={onClose}
          className='p-1 hover:bg-light rounded-md transition-colors'
          aria-label='Close'
        >
          <Icon name='XmarkIcon' className='size-4 text-icon-medium' />
        </button>
      </div>

      {/* Queue Items */}
      <div className='max-h-[400px] overflow-y-auto'>
        <AnimatePresence mode='popLayout'>
          {queue.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TrainingQueueItem item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {hasActiveItems && (
        <div className='px-4 py-2 bg-extra-light/50 border-t border-border'>
          <p className='text-xs text-text-tertiary'>
            {queue.filter((item) => item.status === "training").length > 0
              ? `Training ${queue.filter((item) => item.status === "training").length} item${queue.filter((item) => item.status === "training").length > 1 ? "s" : ""}...`
              : `${queue.filter((item) => item.status === "queued").length} item${queue.filter((item) => item.status === "queued").length > 1 ? "s" : ""} queued`}
          </p>
        </div>
      )}
    </div>
  );
}
