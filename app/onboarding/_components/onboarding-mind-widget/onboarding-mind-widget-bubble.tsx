"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { useWidgetConfig } from "@/app/onboarding/_context";
import { getMotionProps } from "../../_utils/widget-config";

interface OnboardingMindWidgetBubbleProps {
  children: ReactNode;
}

/**
 * Container component for the mind widget bubble.
 * Handles the main widget container styling, animations, and layout.
 */
export function OnboardingMindWidgetBubble({
  children,
}: OnboardingMindWidgetBubbleProps) {
  const { config } = useWidgetConfig();
  const motionProps = useMemo(() => getMotionProps(config), [config]);

  return (
    <motion.div
      className={cn(
        "mind-bubble",
        "overflow-hidden",
        "bg-sand-12 hover:bg-sand-12 dark:bg-black/60",
        "border-none rounded-full",
        "z-10",
        "flex flex-col items-center justify-center",
        "relative"
      )}
      initial={motionProps.initial}
      animate={motionProps.animate}
      transition={motionProps.transition}
    >
      {children}
    </motion.div>
  );
}
