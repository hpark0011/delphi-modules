"use client";

import { motion } from "framer-motion";
import { useWidgetConfig } from "@/app/onboarding/_context";

interface OnboardingMindWidgetScoreProps {
  mindScore: number;
  shouldRollIn?: boolean;
}

export function OnboardingMindWidgetScore({
  mindScore,
  shouldRollIn,
}: OnboardingMindWidgetScoreProps) {
  const { config, springConfig } = useWidgetConfig();

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
              fontSize: config.contentFontSize,
            }
          : { opacity: 0, fontSize: config.contentFontSize }
      }
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: config.contentFontSize,
      }}
      exit={{ opacity: 0 }}
      transition={
        shouldRollIn ? { duration: 0.2, ease: "easeInOut" } : springConfig
      }
    >
      {mindScore}
    </motion.h1>
  );
}
