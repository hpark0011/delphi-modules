"use client";

import { motion } from "framer-motion";
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
} from "./onboarding-mind-widget-constants";

interface OnboardingMindWidgetPlusTenProps {
  isLarge: boolean;
}

export function OnboardingMindWidgetPlusTen({
  isLarge,
}: OnboardingMindWidgetPlusTenProps) {
  return (
    <motion.h1
      key='plus-ten'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%] dark:text-white'
      initial={{
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        fontSize: isLarge ? FONT_SIZE_LARGE : FONT_SIZE_SMALL,
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: isLarge ? FONT_SIZE_LARGE : FONT_SIZE_SMALL,
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
