"use client";

import { motion } from "framer-motion";
import {
  SPRING_CONFIG,
  POSITION_TOP_LARGE,
  POSITION_TOP_SMALL,
} from "../../_utils/onboarding-mind-widget-constants";

interface OnboardingMindWidgetWrapperProps {
  isLarge: boolean;
  children: React.ReactNode;
}

export function OnboardingMindWidgetContainer({
  isLarge,
  children,
}: OnboardingMindWidgetWrapperProps) {
  return (
    <motion.div
      className='flex items-center justify-center relative'
      transition={SPRING_CONFIG}
      animate={{
        top: isLarge ? POSITION_TOP_LARGE : POSITION_TOP_SMALL,
      }}
    >
      {children}
    </motion.div>
  );
}
