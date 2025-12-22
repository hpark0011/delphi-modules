"use client";

import { motion } from "framer-motion";
import { useWidgetConfig } from "@/app/onboarding/_context";

interface OnboardingMindWidgetWrapperProps {
  children: React.ReactNode;
}

export function OnboardingMindWidgetWrapper({
  children,
}: OnboardingMindWidgetWrapperProps) {
  const { springConfig } = useWidgetConfig();

  return (
    <motion.div
      className="mind-bubble-wrapper relative bg-light rounded-full flex flex-row items-center"
      transition={springConfig}
    >
      {children}
    </motion.div>
  );
}
