"use client";

import { motion } from "framer-motion";
import { CSSProperties, useMemo } from "react";
import { useWidgetConfig } from "@/app/onboarding/_context";
import { BubbleShadowResult } from "../../_hooks/use-onboarding-bubble-shadow";

interface OnboardingMindWidgetBubbleHighlightProps {
  isLuminating: boolean;
  isGlowing: boolean;
  shadowData: BubbleShadowResult;
  style?: CSSProperties;
}

/**
 * Renders the bubble highlight/glow effect layers for the mind widget.
 * Consists of two layers:
 * 1. Hover layer (large only) - handles mouse hover shadow transitions
 * 2. Animation layer - handles luminating/glowing states and base shadow
 */
export function OnboardingMindWidgetBubbleHighlight({
  isLuminating,
  isGlowing,
  shadowData,
  style,
}: OnboardingMindWidgetBubbleHighlightProps) {
  const { config, springConfig } = useWidgetConfig();

  const {
    defaultShadow,
    hoverShadow,
    innerDivShadow,
    cssVariables,
    baseShadow,
  } = shadowData;

  // When animating, let CSS keyframes handle the shadow
  const boxShadow = useMemo(
    () => (isLuminating || isGlowing ? undefined : baseShadow),
    [isLuminating, isGlowing, baseShadow]
  );

  // CSS variables for hover shadow transitions (when hover layer is enabled)
  const hoverShadowVariables = config.showHoverLayer
    ? ({
        "--shadow-default": defaultShadow.replace(/_/g, " "),
        "--shadow-hover": hoverShadow.replace(/_/g, " "),
      } as CSSProperties)
    : undefined;

  return (
    <>
      {/* Hover layer - handles mouse hover shadow transitions (when enabled) */}
      {config.showHoverLayer && (
        <motion.div
          className='mind-bubble-pill'
          style={hoverShadowVariables}
          animate={{
            top: config.highlightOffset,
            left: config.highlightOffset,
            width: config.highlightSize,
            height: config.highlightSize,
            filter: config.highlightBlur,
            boxShadow: innerDivShadow,
          }}
          transition={springConfig}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-default)";
          }}
        />
      )}

      {/* Animation layer - handles luminating/glowing states and base shadow */}
      <motion.div
        className='mind-bubble rounded-full absolute'
        animate={{
          top: config.highlightOffset,
          left: config.highlightOffset,
          width: config.highlightSize,
          height: config.highlightSize,
          filter: config.highlightBlur,
          boxShadow: config.innerShadow,
        }}
        transition={springConfig}
        data-luminating={isLuminating}
        data-glowing={isGlowing}
        style={{
          ...cssVariables,
          boxShadow,
          ["--pill-hover-shadow" as string]: hoverShadow,
          ...style,
        }}
      />
    </>
  );
}
