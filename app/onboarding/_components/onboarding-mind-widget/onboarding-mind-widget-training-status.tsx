"use client";

import { motion } from "framer-motion";
import { MindStatusIcon } from "@/components/mind-status-notification";

interface OnboardingMindWidgetTrainingStatusProps {
  trainingMessage: string;
}

export function OnboardingMindWidgetTrainingStatus({
  trainingMessage,
}: OnboardingMindWidgetTrainingStatusProps) {
  return (
    <motion.div
      className='overflow-hidden'
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "auto", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className='pl-2.5 pr-3.5 text-text-tertiary flex items-center gap-1 whitespace-nowrap'>
        <MindStatusIcon status='active' />
        <span className='max-w-[176px] truncate text-[14px]'>
          {trainingMessage}
        </span>
      </div>
    </motion.div>
  );
}
