"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  WIDGET_WIDTH_LARGE,
  WIDGET_HEIGHT_LARGE,
  WIDGET_WIDTH_SMALL,
  WIDGET_HEIGHT_SMALL,
  BORDER_RADIUS_LARGE,
  BORDER_RADIUS_SMALL,
  PADDING_INNER_X,
  PADDING_INNER_Y,
} from "../../_utils/onboarding-mind-widget-constants";
import { BubbleShadowResult } from "../../_hooks/use-onboarding-bubble-shadow";

interface OnboardingMindWidgetBubbleProps {
  isLarge: boolean;
  showLabel: boolean;
  shadowData: BubbleShadowResult;
  children: ReactNode;
}

/**
 * Container component for the mind widget bubble.
 * Handles the main widget container styling, animations, and layout.
 */
export function OnboardingMindWidgetBubble({
  isLarge,
  showLabel,
  shadowData,
  children,
}: OnboardingMindWidgetBubbleProps) {
  return (
    <motion.div
      className={cn(
        isLarge && !shadowData.shouldUseColoredShadow
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
        width: showLabel && !isLarge ? undefined : WIDGET_WIDTH_LARGE,
        height: WIDGET_HEIGHT_SMALL,
        borderWidth: 0,
        borderRadius: BORDER_RADIUS_LARGE,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      animate={{
        width: isLarge
          ? WIDGET_WIDTH_LARGE
          : showLabel
            ? "fit-content"
            : WIDGET_WIDTH_SMALL,
        height: isLarge ? WIDGET_HEIGHT_LARGE : WIDGET_HEIGHT_SMALL,
        borderWidth: isLarge ? 1.5 : 1,
        borderRadius: isLarge ? BORDER_RADIUS_LARGE : BORDER_RADIUS_SMALL,
        paddingLeft: isLarge ? 0 : PADDING_INNER_X,
        paddingRight: isLarge ? 0 : PADDING_INNER_X,
        paddingTop: isLarge ? 0 : PADDING_INNER_Y,
        paddingBottom: isLarge ? 0 : PADDING_INNER_Y,
      }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      {children}
    </motion.div>
  );
}
