"use client";

import { motion } from "framer-motion";
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
  SPRING_CONFIG,
} from "../../_utils/onboarding-mind-widget-constants";

interface OnboardingMindWidgetScoreProps {
  mindScore: number;
  isLarge: boolean;
  shouldRollIn?: boolean;
}

export function OnboardingMindWidgetScore({
  mindScore,
  isLarge,
  shouldRollIn,
}: OnboardingMindWidgetScoreProps) {
  return (
    <motion.h1
      key='score'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%] dark:text-white'
      initial={
        shouldRollIn
          ? {
              y: 20,
              opacity: 0,
              filter: "blur(10px)",
              fontSize: FONT_SIZE_LARGE,
            }
          : { opacity: 0, fontSize: FONT_SIZE_LARGE }
      }
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: isLarge ? FONT_SIZE_LARGE : FONT_SIZE_SMALL,
      }}
      exit={{ opacity: 0 }}
      transition={
        shouldRollIn ? { duration: 0.2, ease: "easeInOut" } : SPRING_CONFIG
      }
    >
      {mindScore}
    </motion.h1>
  );
}
