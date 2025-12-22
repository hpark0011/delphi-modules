"use client";

import { motion } from "framer-motion";
import {
  SPRING_CONFIG,
  WidgetStyleConfig,
  WidgetSizeVariant,
} from "../../_utils/onboarding-mind-widget-style-config";

interface OnboardingMindWidgetContainerProps {
  sizeVariant: WidgetSizeVariant;
  config: WidgetStyleConfig;
  children: React.ReactNode;
}

export function OnboardingMindWidgetContainer({
  config,
  children,
}: OnboardingMindWidgetContainerProps) {
  return (
    <motion.div
      className='flex items-center justify-center relative'
      transition={SPRING_CONFIG}
      animate={{
        top: config.position.top,
      }}
    >
      {children}
    </motion.div>
  );
}
