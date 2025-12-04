"use client";

import { MindProgressBar } from "@/app/studio/_components/mindscore/mind-progress-bar";
import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import { ActiveTrainingStatus } from "@/app/studio/_components/mindscore/widget/active-training-status";
import { LastTrainedDate } from "@/app/studio/_components/mindscore/widget/last-trained-date";
import { TrainingCompletedStatus } from "@/app/studio/_components/mindscore/widget/training-completed-status";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import {
  MindDialog,
  useMindDialog,
} from "@/components/mind-dialog/mind-dialog-2";
import { useTrainingQueue, type QueueItem } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { MindWidgetOvalBackground } from "./mind-widget-oval-background";

function MindScoreTrigger() {
  const { openWithTab } = useMindDialog();
  const {
    current,
    level,
    progressToNextLevel,
    nextLevelThreshold,
    progressCap,
    lastIncrement,
    lastDecrement,
  } = useMindScore();
  const { queueStatus } = useTrainingStatus(false);

  return (
    <div
      className='w-full flex flex-col gap-2 relative cursor-pointer rounded-[18px]  overflow-hidden bg-transparent dark:border-white/3  group'
      onClick={() => openWithTab("add-knowledge")}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openWithTab("add-knowledge");
        }
      }}
    >
      {/* SVG Background */}
      <div className='absolute top-0 left-0 w-full h-full group-hover:scale-103 transition-all duration-100 ease-in'>
        <MindWidgetOvalBackground level={level} />
      </div>

      {/* Progress Bar */}
      <MindProgressBar
        progressToNextLevel={progressToNextLevel}
        nextLevelThreshold={nextLevelThreshold}
        progressCap={progressCap}
        lastIncrement={lastIncrement}
        lastDecrement={lastDecrement}
        className={cn(
          "top-[3px] transition-all duration-100 ease-in",
          queueStatus === "active"
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        )}
      />

      {/* Mind Score & Mind Level Container */}
      <div className='flex flex-col gap-2 w-full justify-center items-center relative z-10'>
        <div className='flex flex-col items-center justify-center h-[160px] text-white gap-0.5 pb-3'>
          {/* Mind Score Value */}
          <p className='font-medium text-center text-6xl tracking-tighter'>
            {current}
          </p>
          {/* Mind Level */}
          <p className='text-[15px] font-medium text-center text-white/70'>
            {level}
          </p>
        </div>
      </div>
    </div>
  );
}

interface TrainingStatusTriggerProps {
  hasUserReviewed: boolean;
  setHasUserReviewed: (reviewed: boolean) => void;
  completedCount: number;
  failedCount: number;
  queue: QueueItem[];
}

function TrainingStatusTrigger({
  hasUserReviewed,
  setHasUserReviewed,
  completedCount,
  failedCount,
  queue,
}: TrainingStatusTriggerProps) {
  // Use centralized queue status hook
  const { queueStatus } = useTrainingStatus(hasUserReviewed);

  // Show completed status when queue is finished (all items done, user hasn't reviewed)
  if (queueStatus === "finished") {
    return (
      <TrainingCompletedStatus
        setShowCompletedStatus={(show) => setHasUserReviewed(!show)}
        completedCount={completedCount}
        failedCount={failedCount}
        queueSnapshot={queue}
      />
    );
  }

  // Show active training status when queue is active
  if (queueStatus === "active") {
    return <ActiveTrainingStatus />;
  }

  // Default: show last trained date (dull state)
  return <LastTrainedDate />;
}

function MindScoreContent() {
  const { queue } = useTrainingQueue();
  const [hasUserReviewed, setHasUserReviewed] = useState(true); // Start as true (no completion to review)
  const [completedCount, setCompletedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  // Use centralized queue status logic
  const { queueStatus, finishedCount, totalCount } =
    useTrainingStatus(hasUserReviewed);

  // Update counts when queue finishes and reset when new items are added
  useEffect(() => {
    // Detect when all items finish and user hasn't reviewed yet
    const allFinished = finishedCount === totalCount && totalCount > 0;

    if (allFinished && hasUserReviewed) {
      // Queue just finished - capture snapshot counts and mark as unreviewed
      // Note: We need manual filtering here to create a snapshot of counts
      // at the moment of completion, which persists even as queue changes
      const completed = queue.filter(
        (item) => item.status === "completed"
      ).length;
      const failed = queue.filter((item) => item.status === "failed").length;
      setCompletedCount(completed);
      setFailedCount(failed);
      setHasUserReviewed(false); // Mark as unreviewed to show completion status
    }

    // Reset when new items added (queue becomes active)
    if (queueStatus === "active" && !hasUserReviewed) {
      setHasUserReviewed(true); // Reset review state
      setCompletedCount(0);
      setFailedCount(0);
    }

    // Reset when queue is cleared (becomes empty)
    if (queue.length === 0 && !hasUserReviewed) {
      setHasUserReviewed(true);
      setCompletedCount(0);
      setFailedCount(0);
    }
  }, [queueStatus, hasUserReviewed, finishedCount, totalCount, queue]);

  return (
    <AnalyticsSectionWrapper
      className={cn(
        "w-full p-0.5 rounded-[20px] flex flex-col items-center bg-extra-light cursor-default backdrop-blur-[20px] overflow-hidden transition-all duration-200 text-left opacity-100 shadow-[0_1px_0.908px_0_rgba(255,255,255,0.15)_inset,0_-1px_0.908px_0_rgba(255,255,255,0.05)_inset]"
      )}
    >
      <MindDialog defaultTab='training-status'>
        <MindScoreTrigger />
        <TrainingStatusTrigger
          hasUserReviewed={hasUserReviewed}
          setHasUserReviewed={setHasUserReviewed}
          completedCount={completedCount}
          failedCount={failedCount}
          queue={queue}
        />
      </MindDialog>
    </AnalyticsSectionWrapper>
  );
}

export function MindWidgetLarge() {
  return <MindScoreContent />;
}
