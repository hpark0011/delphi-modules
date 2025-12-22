"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CSSProperties, ReactNode, useMemo } from "react";
import {
  WidgetStyleConfig,
  getBubbleMotionProps,
} from "../../_utils/onboarding-mind-widget-style-config";

interface OnboardingMindWidgetBubbleProps {
  config: WidgetStyleConfig;
  children: ReactNode;
}

/**
 * Container component for the mind widget bubble.
 * Handles the main widget container styling, animations, and layout.
 */
export function OnboardingMindWidgetBubble({
  config,
  children,
}: OnboardingMindWidgetBubbleProps) {
  const motionProps = useMemo(() => getBubbleMotionProps(config), [config]);

  return (
    <motion.div
      className={cn(
        "mind-bubble",
        "overflow-hidden",
        "bg-sand-12 hover:bg-sand-12 dark:bg-black/60",
        "border-none",
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
