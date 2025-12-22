"use client";

import { motion } from "framer-motion";
import {
  SPRING_CONFIG,
  WidgetStyleConfig,
} from "../../_utils/onboarding-mind-widget-style-config";

interface OnboardingMindWidgetScoreProps {
  mindScore: number;
  config: WidgetStyleConfig;
  shouldRollIn?: boolean;
}

export function OnboardingMindWidgetScore({
  mindScore,
  config,
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
              fontSize: config.typography.fontSize,
            }
          : { opacity: 0, fontSize: config.typography.fontSize }
      }
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: config.typography.fontSize,
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
