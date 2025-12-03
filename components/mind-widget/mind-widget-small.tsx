"use client";

import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import {
  generateSmallWidgetShadowString,
  getLevelShadowColors,
} from "@/app/studio/_utils/mind-shadow-helpers";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useMindDialog } from "@/components/mind-dialog/mind-dialog-2";
import { MiniTrainingStatus } from "./training-status-small";

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

interface MindWidgetSmallProps {
  disableClick?: boolean;
}

export function MindWidgetSmall({
  disableClick = false,
}: MindWidgetSmallProps) {
  const { openWithTab } = useMindDialog();
  const { current, level } = useMindScore();

  // Always pass false - mini widget doesn't mark as "reviewed"
  // User reviews via dialog's "Preview" button
  const { queueStatus } = useTrainingStatus(false);

  // Local visibility state for the mini widget
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  // Show widget when training is active or just finished
  useEffect(() => {
    if (queueStatus === "active" || queueStatus === "finished") {
      setIsWidgetVisible(true);
    }
  }, [queueStatus]);

  const handleClick = () => {
    if (disableClick) return;
    openWithTab("add-knowledge");
  };

  // Called after MiniTrainingStatus finishes showing "Completed!" for 2 seconds
  const handleWidgetDismiss = useCallback(() => {
    setIsWidgetVisible(false);
  }, []);

  // Get level-based shadow colors
  const levelColors = getLevelShadowColors(level);
  const shadowString = generateSmallWidgetShadowString(levelColors);

  return (
    <div className='flex gap-2 relative justify-start items-center rounded-full bg-sand-10/8'>
      {/* Mindscore Trigger */}
      <div
        className={cn(
          "flex items-center p-0.5 bg-sand-10/8 rounded-full transition-all duration-200 w-fit relative",
          !disableClick && "hover:scale-108 cursor-pointer"
        )}
        onClick={handleClick}
      >
        {/* Mindscore Wrapper */}
        <div
          onClick={handleClick}
          className={cn(
            "flex flex-col gap-2 rounded-full overflow-hidden bg-black/87 border-white/20 dark:border-white/3 dark:bg-black/40 w-fit px-2.5 py-1.5 relative justify-center items-center min-w-[52px] h-[40px] z-0",
            !disableClick && "cursor-pointer hover:bg-black/84"
          )}
          style={{
            boxShadow: shadowString.replace(/_/g, " "),
          }}
        >
          {/* Mindscore Value */}
          <span className='text-text-primary-inverse dark:text-text-primary text-[16px] font-semibold'>
            {current}
          </span>
        </div>

        {/* Mind Area Inner */}
        <motion.div
          className='rounded-full absolute'
          initial={{
            top: "",
            left: "",
            width: "0px",
            height: "0px",
            filter: "blur(0px)",
            boxShadow:
              "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
          }}
          animate={{
            top: "1px",
            left: "1px",
            width: "calc(100% - 2px)",
            height: "calc(100% - 2px)",
            filter: "blur(3px)",
            boxShadow:
              "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
          }}
          transition={SPRING_CONFIG}
        />
      </div>
      <AnimatePresence>
        {isWidgetVisible && (
          <MiniTrainingStatus
            onDismiss={handleWidgetDismiss}
            disableTooltips={disableClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
