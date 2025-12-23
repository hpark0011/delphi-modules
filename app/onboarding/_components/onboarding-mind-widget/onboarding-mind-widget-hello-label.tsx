"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useWidgetConfig } from "@/app/onboarding/_context";

export function OnboardingMindWidgetHelloLabel() {
  const { config } = useWidgetConfig();

  return (
    <motion.h1
      key='label'
      className={cn(
        // Typography
        "text-text-primary-inverse dark:text-white",
        "tracking-tighter font-medium",
        "leading-[100%] whitespace-nowrap",
        // Layout
        "flex",
        // Alignment
        "items-center justify-center",
        // Sizing
        "h-fit"
      )}
      initial={{
        opacity: 0,
        y: 8,
        filter: "blur(4px)",
        fontSize: config.contentFontSize,
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        fontSize: config.contentFontSize,
      }}
      transition={{
        duration: 0.25,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      Hey 👋
    </motion.h1>
  );
}
