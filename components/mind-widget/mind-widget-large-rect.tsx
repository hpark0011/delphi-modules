import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import { cn } from "@/lib/utils";
import { AnalyticsSectionWrapper } from "../analytics/dashboard-ui";
import { MindDialog, useMindDialog } from "../mind-dialog/mind-dialog";
import { MindProgressBar } from "@/app/studio/_components/mindscore/mind-progress-bar";
import { TrainingCompletedStatus } from "@/app/studio/_components/mindscore/widget/training-completed-status";
import { QueueItem, useTrainingQueue } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { ActiveTrainingStatus } from "@/app/studio/_components/mindscore/widget/active-training-status";
import { LastTrainedDate } from "@/app/studio/_components/mindscore/widget/last-trained-date";
import { useState } from "react";

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

  return (
    // Mind score wrapper
    <div
      className={cn(
        // Layout & positioning
        "mind-area studio w-full flex flex-col gap-2 relative cursor-pointer overflow-hidden",
        // Background & gradients
        "bg-transparent bg-linear-to-b from-[#110C09] to-[#23170A]",
        // Interactive states
        "hover:from-[black] to-[black] dark:border-white/3 dark:bg-black/40 transition-all duration-200 ease-in",
        // Shadows (inset glows + border + outer shadow)
        "shadow-[inset_0px_0px_30px_-8px_rgba(255,164,102,1),inset_0px_-10px_40px_-7px_rgba(255,167,109,0.5),inset_0px_-35px_80px_-30px_rgba(205,93,19,1),inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4)]",
        // Hover shadow
        "hover:shadow-[inset_0px_0px_10px_-0px_rgba(255,164,102,1),inset_0px_-10px_30px_-7px_rgba(255,167,109,0.5),inset_0px_-15px_80px_-30px_rgba(205,93,19,1),inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_5px_10px_-5px_rgba(0,0,0,0.4)]"
      )}
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
      {/* Progress Bar */}
      <MindProgressBar
        progressToNextLevel={progressToNextLevel}
        nextLevelThreshold={nextLevelThreshold}
        progressCap={progressCap}
        lastIncrement={lastIncrement}
        lastDecrement={lastDecrement}
        className='top-[3px]'
      />

      {/* Mind Score & Mind Level Container */}
      <div className='flex flex-col gap-2 w-full justify-center items-center relative z-10'>
        <div className='flex flex-col items-center justify-center h-[160px] text-white gap-0.5 '>
          {/* Mind Score Value */}
          <p className='font-medium text-center text-6xl tracking-tighter'>
            {current}
          </p>
          {/* Mind Level */}
          <p className='text-[15px] font-medium text-center text-white/70'>
            {level}
          </p>
        </div>

        {/* Mind Area Inner */}
        <div className='mind-area-inner studio absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] shadow-[inset_0px_1px_1px_1px_rgba(0,0,0,0.1),inset_0px_-1px_1px_1px_rgba(255,255,255,0.2),_0px_0px_1px_1px_rgba(255,255,255,0.1)]' />
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

export function MindWidgetLargeRect() {
  const { queue } = useTrainingQueue();
  const [hasUserReviewed, setHasUserReviewed] = useState(true); // Start as true (no completion to review)
  const [completedCount, setCompletedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);

  return (
    <AnalyticsSectionWrapper
      className={cn(
        "w-full p-0.5 rounded-[20px] flex flex-col items-center bg-linear-to-b from-black/5 to-black/2 cursor-default bg-amber-50/12 backdrop-blur-[20px] overflow-hidden transition-all duration-200 text-left opacity-100 hover:bg-amber-50/18 shadow-[0_1px_0.908px_0_rgba(255,255,255,0.15)_inset,0_-1px_0.908px_0_rgba(255,255,255,0.05)_inset]"
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
