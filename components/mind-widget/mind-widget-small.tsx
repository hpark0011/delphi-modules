"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMindDialog } from "@/components/mind-dialog/mind-dialog";
import { useMindScore } from "@/app/studio/_components/mindscore/mind-score-context";
import { MiniTrainingStatus } from "./mini-training-status";
import { useTrainingQueue } from "@/hooks/use-training-queue";

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export function MindWidgetSmall() {
  const { openWithTab } = useMindDialog();
  const { current } = useMindScore();
  const { queue } = useTrainingQueue();

  const handleClick = () => {
    openWithTab("add-knowledge");
  };

  return (
    <motion.div
      className='flex gap-2 relative justify-start items-center rounded-full bg-light'
      animate={{
        paddingRight: queue.length > 0 ? "1.125rem" : "0rem",
      }}
      transition={SPRING_CONFIG}
    >
      {/* Mindscore Trigger */}
      <div className='flex items-center p-0.5 bg-light rounded-full hover:scale-108 transition-all duration-200 w-fit'>
        {/* Mindscore Wrapper */}
        <div
          onClick={handleClick}
          className='flex flex-col gap-2 relative cursor-pointer rounded-[18px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.3),0_1px_1px_0_rgba(0,0,0,0.15),_inset_0_0_6px_0_rgba(255,255,255,0.1)] overflow-hidden bg-black/87 border border-white/20 hover:bg-black/84 dark:border-white/3 dark:bg-black/40 w-fit h-fit px-2.5 py-1'
        >
          {/* Mindscore Value */}
          <span className='text-text-primary-inverse text-[14px] font-semibold'>
            {current}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {queue.length > 0 && <MiniTrainingStatus />}
      </AnimatePresence>
    </motion.div>
  );
}
