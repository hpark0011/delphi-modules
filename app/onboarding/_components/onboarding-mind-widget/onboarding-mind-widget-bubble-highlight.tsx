"use client";

import { motion } from "framer-motion";
import { CSSProperties, useMemo } from "react";
import {
  SPRING_CONFIG,
  WidgetStyleConfig,
  WidgetSizeVariant,
} from "../../_utils/onboarding-mind-widget-style-config";
import { BubbleShadowResult } from "../../_hooks/use-onboarding-bubble-shadow";

interface OnboardingMindWidgetBubbleHighlightProps {
  sizeVariant: WidgetSizeVariant;
  config: WidgetStyleConfig;
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
  sizeVariant,
  config,
  isLuminating,
  isGlowing,
  shadowData,
  style,
}: OnboardingMindWidgetBubbleHighlightProps) {
  const {
    shouldUseColoredShadow,
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

  // CSS variables for hover shadow transitions (large widgets only)
  const hoverShadowVariables = shouldUseColoredShadow
    ? ({
        "--shadow-default": defaultShadow.replace(/_/g, " "),
        "--shadow-hover": hoverShadow.replace(/_/g, " "),
      } as CSSProperties)
    : undefined;

  return (
    <>
      {/* Hover layer - handles mouse hover shadow transitions (large widgets only) */}
      {sizeVariant === "large" && (
        <motion.div
          className='mind-bubble-pill'
          style={hoverShadowVariables}
          animate={{
            top: config.bubble.offset,
            left: config.bubble.offset,
            width: config.bubble.size,
            height: config.bubble.size,
            filter: config.bubble.blur,
            boxShadow: innerDivShadow,
          }}
          transition={SPRING_CONFIG}
          onMouseEnter={
            shouldUseColoredShadow
              ? (e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-hover)";
                }
              : undefined
          }
          onMouseLeave={
            shouldUseColoredShadow
              ? (e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-default)";
                }
              : undefined
          }
        />
      )}

      {/* Animation layer - handles luminating/glowing states and base shadow */}
      <motion.div
        className='mind-bubble rounded-full absolute'
        animate={{
          top: config.bubble.offset,
          left: config.bubble.offset,
          width: config.bubble.size,
          height: config.bubble.size,
          filter: config.bubble.blur,
          boxShadow: config.shadows.innerShadow,
        }}
        transition={SPRING_CONFIG}
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
