"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";
import { WidgetStyleConfig } from "../../_utils/onboarding-mind-widget-style-config";

interface OnboardingMindWidgetBubbleProps {
  config: WidgetStyleConfig;
  style?: CSSProperties;
  initialWidth?: number | string;
  animateWidth?: number | string;
  children: ReactNode;
}

/**
 * Container component for the mind widget bubble.
 * Handles the main widget container styling, animations, and layout.
 */
export function OnboardingMindWidgetBubble({
  config,
  style,
  initialWidth,
  animateWidth,
  children,
}: OnboardingMindWidgetBubbleProps) {
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
      style={style}
      initial={{
        width: initialWidth ?? config.dimensions.width,
        height: config.dimensions.height,
        borderWidth: 0,
        borderRadius: config.border.radius,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      animate={{
        width: animateWidth ?? config.dimensions.width,
        height: config.dimensions.height,
        borderWidth: config.border.width,
        borderRadius: config.border.radius,
        paddingLeft: config.padding.x,
        paddingRight: config.padding.x,
        paddingTop: config.padding.y,
        paddingBottom: config.padding.y,
      }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      {children}
    </motion.div>
  );
}
