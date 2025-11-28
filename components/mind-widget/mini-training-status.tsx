"use client";

import { useMindDialog } from "@/components/mind-dialog/mind-dialog";
import type { TrainingDocType } from "@/components/mind-dialog/training-queue-context";
import { MindStatusIcon } from "@/components/mind-status-notification";
import { Icon } from "@/components/ui/icon";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { getDocTypeIcon } from "@/utils/doc-type-helpers";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrainingResultBadges } from "./training-result-badges";

type BadgeState = "loading" | "newItem" | "finished";

const SPRING_CONFIG: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 30,
};

const NEW_ITEM_DISPLAY_DURATION = 2000;
const FINISHED_DISPLAY_DURATION = 2000;

// Shared animation props for vertical slide transitions
const SLIDE_ANIMATION = {
  initial: { y: 20, opacity: 0, filter: "blur(10px)" },
  animate: { y: 0, opacity: 1, filter: "blur(0px)" },
  exit: { y: -20, opacity: 0, filter: "blur(10px)" },
  transition: { duration: 0.2, ease: "easeInOut" as const },
};

function StatusIcon({
  state,
  docType,
}: {
  state: "loading" | "newItem";
  docType?: TrainingDocType;
}) {
  return (
    <span className='relative flex items-center justify-center size-4'>
      <AnimatePresence mode='sync'>
        <motion.span
          key={state}
          className='absolute left-0 top-0'
          initial={{ y: -20, scale: 0.5, filter: "blur(6px)" }}
          animate={{ y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ y: 20, scale: 0.5, filter: "blur(6px)" }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {state === "loading" && <MindStatusIcon status='active' />}
          {state === "newItem" && (
            <Icon
              name={docType ? getDocTypeIcon(docType) : "DocFillIcon"}
              className='size-4'
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface StatusLabelProps {
  state: "loading" | "newItem";
  activeCount: number;
  newItemName: string;
}

function StatusLabel({ state, activeCount, newItemName }: StatusLabelProps) {
  const [labelWidth, setLabelWidth] = useState(0);
  const measureRef = useRef<HTMLDivElement>(null);

  const labelText =
    state === "loading" ? `Learning ${activeCount}` : newItemName;

  const isNewItem = state === "newItem";

  useEffect(() => {
    if (measureRef.current) {
      const { width } = measureRef.current.getBoundingClientRect();
      setLabelWidth(isNewItem ? Math.min(width, 160) : width);
    }
  }, [labelText, isNewItem]);

  return (
    <>
      {/* Hidden copy to measure width */}
      <div
        ref={measureRef}
        className='absolute invisible whitespace-nowrap text-[13px]'
      >
        {labelText}
      </div>

      <motion.span
        className='relative overflow-hidden'
        animate={{ width: labelWidth }}
        transition={SPRING_CONFIG}
      >
        <AnimatePresence mode='sync' initial={false}>
          <motion.div
            key={state + labelText}
            className={`text-[13px] dark:text-white/90 ${isNewItem ? "max-w-[160px] truncate" : "whitespace-nowrap"}`}
            initial={{
              y: -20,
              opacity: 0,
              filter: "blur(10px)",
              position: "absolute",
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              position: "relative",
            }}
            exit={{
              y: 20,
              opacity: 0,
              filter: "blur(10px)",
              position: "absolute",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {labelText}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

interface MiniTrainingStatusProps {
  onDismiss?: () => void;
}

export function MiniTrainingStatus({ onDismiss }: MiniTrainingStatusProps) {
  const { queue } = useTrainingQueue();
  const { openWithTab } = useMindDialog();

  // Use centralized queue status hook
  // Note: This widget doesn't track user review state, so we assume user hasn't reviewed
  // (hasUserReviewed = false) to show "finished" state when appropriate
  const { activeCount, queueStatus } = useTrainingStatus(false);

  // Calculate completed and failed counts from queue
  const completedCount = queue.filter(
    (item) => item.status === "completed"
  ).length;
  const failedCount = queue.filter((item) => item.status === "failed").length;

  // When the training queue is actively processing, show loading spinner.
  // Otherwise (empty, paused, or done), show completed state.
  const baseState = queueStatus === "active" ? "loading" : "finished";

  // Single override state for temporary "newItem" display
  // Tracks both name and docType to show correct icon
  const [newItemOverride, setNewItemOverride] = useState<{
    name: string;
    docType: TrainingDocType;
  } | null>(() => {
    const lastItem = queue[queue.length - 1];
    return lastItem ? { name: lastItem.name, docType: lastItem.docType } : null;
  });

  const prevQueueLengthRef = useRef(queue.length);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finishedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle initial mount - start timer to clear override
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setNewItemOverride(null);
    }, NEW_ITEM_DISPLAY_DURATION);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Detect new items added after initial mount
  useEffect(() => {
    if (queue.length > prevQueueLengthRef.current) {
      const newestItem = queue[queue.length - 1];
      if (newestItem) {
        setNewItemOverride({
          name: newestItem.name,
          docType: newestItem.docType,
        });

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setNewItemOverride(null);
        }, NEW_ITEM_DISPLAY_DURATION);
      }
    }
    prevQueueLengthRef.current = queue.length;
  }, [queue]);

  // When training finishes, show badges for 2 seconds then dismiss
  useEffect(() => {
    if (queueStatus === "finished" && completedCount + failedCount > 0) {
      if (finishedTimeoutRef.current) clearTimeout(finishedTimeoutRef.current);
      finishedTimeoutRef.current = setTimeout(() => {
        onDismiss?.();
      }, FINISHED_DISPLAY_DURATION);
    }

    if (queueStatus === "active" && finishedTimeoutRef.current) {
      clearTimeout(finishedTimeoutRef.current);
    }

    return () => {
      if (finishedTimeoutRef.current) clearTimeout(finishedTimeoutRef.current);
    };
  }, [queueStatus, completedCount, failedCount, onDismiss]);

  // Display state: override takes priority over base state
  const displayState: BadgeState =
    newItemOverride !== null ? "newItem" : baseState;

  const handleClick = () => {
    openWithTab("training-status");
  };

  // Width-based animation pattern (like OnboardingMindWidget) for smooth collapse
  return (
    <motion.div
      className='overflow-hidden'
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "auto", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div
        className='flex items-center gap-1 text-text-muted cursor-pointer hover:text-blue-500 whitespace-nowrap pl-0.5 pr-4.5'
        onClick={handleClick}
      >
        <AnimatePresence mode='wait'>
          {displayState === "finished" ? (
            <motion.div
              key='finished-badges'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <span className='text-[13px] font-medium'>Completed!</span>
              <TrainingResultBadges
                completedCount={completedCount}
                failedCount={failedCount}
              />
            </motion.div>
          ) : (
            <motion.div
              key='status-content'
              {...SLIDE_ANIMATION}
              className='flex items-center gap-1'
            >
              <StatusIcon
                state={displayState}
                docType={newItemOverride?.docType}
              />
              <StatusLabel
                state={displayState}
                activeCount={activeCount}
                newItemName={newItemOverride?.name ?? ""}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
