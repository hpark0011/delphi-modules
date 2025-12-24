"use client";

import { useWidgetConfig } from "@/app/onboarding/_context";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode, useMemo, useRef } from "react";
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
  const elementRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={elementRef}
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
      onAnimationStart={() => {
        // Ensure minWidth is set during animation
        if (config.autoWidth && elementRef.current) {
          elementRef.current.style.minWidth = `${config.bubbleWidth}px`;
        }
      }}
      onAnimationComplete={() => {
        // Ensure minWidth persists after animation completes
        if (config.autoWidth && elementRef.current) {
          elementRef.current.style.minWidth = `${config.bubbleWidth}px`;
        }
      }}
    >
      {children}
    </motion.div>
  );
}
