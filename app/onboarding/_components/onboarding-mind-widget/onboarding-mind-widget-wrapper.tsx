"use client";

import { motion } from "framer-motion";
import { SPRING_CONFIG } from "../../_utils/onboarding-mind-widget-style-config";

interface OnboardingMindWidgetWrapperProps {
  children: React.ReactNode;
}

export function OnboardingMindWidgetWrapper({
  children,
}: OnboardingMindWidgetWrapperProps) {
  return (
    <motion.div
      className='relative bg-light rounded-full flex flex-row items-center'
      transition={SPRING_CONFIG}
    >
      {children}
    </motion.div>
  );
}
