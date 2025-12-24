"use client";

import { motion } from "framer-motion";
import { useWidgetConfig } from "@/app/onboarding/_context";

interface OnboardingMindWidgetContainerProps {
  children: React.ReactNode;
}

export function OnboardingMindWidgetContainer({
  children,
}: OnboardingMindWidgetContainerProps) {
  const { config, springConfig } = useWidgetConfig();

  return (
    <motion.div
      className='flex items-center justify-center relative'
      transition={springConfig}
      initial={{
        top: "10px",
      }}
      animate={{
        top: config.top,
      }}
    >
      {children}
    </motion.div>
  );
}
