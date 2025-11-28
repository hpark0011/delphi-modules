"use client";

import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import {
  generateSmallWidgetShadowString,
  getLevelShadowColors,
} from "@/app/studio/_utils/mind-shadow-helpers";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useMindDialog } from "@/components/mind-dialog/mind-dialog";
import { MiniTrainingStatus } from "./mini-training-status";

export function MindWidgetSmall() {
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
    <div className='flex gap-2 relative justify-start items-center rounded-full bg-light'>
      {/* Mindscore Trigger */}
      <div className='flex items-center p-0.5 bg-light rounded-full hover:scale-108 transition-all duration-200 w-fit relative'>
        {/* Mindscore Wrapper */}
        <div
          onClick={handleClick}
          className='flex flex-col gap-2  cursor-pointer rounded-[18px] overflow-hidden bg-black/87  border-white/20 hover:bg-black/84 dark:border-white/3 dark:bg-black/40 w-fit h-fit px-2.5 py-1.5 relative z-10 justify-center items-center min-w-[46px]'
          style={{
            boxShadow: shadowString.replace(/_/g, " "),
          }}
        >
          {/* Mindscore Value */}
          <span className='text-text-primary-inverse dark:text-text-primary text-[14px] font-semibold'>
            {current}
          </span>
        </div>

        {/* Mind Area Inner */}
        <div className='rounded-full studio absolute top-[2px] left-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] shadow-[inset_0px_1px_1px_1px_rgba(0,0,0,0.1),inset_0px_-1px_1px_0.5px_rgba(255,255,255,0.8),inset_0px_1px_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1),inset_0px_-1px_1px_0.5px_rgba(0,0,0,0.8),inset_0px_1px_1px_1px_rgba(0,0,0,0.4)] blur-[2px]' />
      </div>
      <AnimatePresence>
        {isWidgetVisible && (
          <MiniTrainingStatus onDismiss={handleWidgetDismiss} />
        )}
      </AnimatePresence>
    </div>
  );
}
