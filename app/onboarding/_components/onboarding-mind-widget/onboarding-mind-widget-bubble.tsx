"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  WidgetStyleConfig,
  WidgetSizeVariant,
} from "../../_utils/onboarding-mind-widget-style-config";
import { BubbleShadowResult } from "../../_hooks/use-onboarding-bubble-shadow";

interface OnboardingMindWidgetBubbleProps {
  sizeVariant: WidgetSizeVariant;
  config: WidgetStyleConfig;
  showGreeting: boolean;
  shadowData: BubbleShadowResult;
  children: ReactNode;
}

/**
 * Container component for the mind widget bubble.
 * Handles the main widget container styling, animations, and layout.
 */
export function OnboardingMindWidgetBubble({
  sizeVariant,
  config,
  showGreeting,
  shadowData,
  children,
}: OnboardingMindWidgetBubbleProps) {
  return (
    <motion.div
      className={cn(
        "mind-bubble",
        sizeVariant === "large" && !shadowData.shouldUseColoredShadow
          ? "shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)]"
          : "",
        "overflow-hidden",
        "bg-sand-12 hover:bg-sand-12 dark:bg-black/60",
        "border-none",
        "z-10",
        "flex flex-col items-center justify-center",
        "relative"
      )}
      style={shadowData.outerContainerShadowStyle}
      initial={{
        width:
          showGreeting && sizeVariant === "small"
            ? undefined
            : config.dimensions.width,
        height: config.dimensions.height,
        borderWidth: 0,
        borderRadius: config.border.radius,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      animate={{
        width:
          sizeVariant === "large"
            ? config.dimensions.width
            : showGreeting
              ? "fit-content"
              : config.dimensions.width,
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
