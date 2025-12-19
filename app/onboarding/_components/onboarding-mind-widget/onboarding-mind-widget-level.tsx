"use client";

import { motion } from "framer-motion";

interface OnboardingMindWidgetLevelProps {
  level: string;
}

export function OnboardingMindWidgetLevel({
  level,
}: OnboardingMindWidgetLevelProps) {
  return (
    <motion.div
      className='text-[16px] font-[480] text-text-muted'
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      {level}
    </motion.div>
  );
}
