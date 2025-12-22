"use client";

import { motion } from "framer-motion";
import { WidgetStyleConfig } from "../../_utils/onboarding-mind-widget-style-config";

interface OnboardingMindWidgetPlusTenProps {
  config: WidgetStyleConfig;
}

export function OnboardingMindWidgetPlusTen({
  config,
}: OnboardingMindWidgetPlusTenProps) {
  return (
    <motion.h1
      key='plus-ten'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%] dark:text-white'
      initial={{
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        fontSize: config.typography.fontSize,
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: config.typography.fontSize,
      }}
      exit={{
        y: -20,
        opacity: 0,
        filter: "blur(10px)",
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      +10
    </motion.h1>
  );
}
