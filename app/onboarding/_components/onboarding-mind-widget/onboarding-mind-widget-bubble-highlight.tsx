"use client";

import { motion } from "framer-motion";
import { CSSProperties, useMemo } from "react";
import {
  SPRING_CONFIG,
  DEFAULT_NEUTRAL_SHADOW_LARGE,
  SMALL_WIDGET_INNER_SHADOW,
  BUBBLE_OFFSET_LARGE,
  BUBBLE_OFFSET_SMALL,
  BUBBLE_SIZE_LARGE,
  BUBBLE_SIZE_SMALL,
  BUBBLE_BLUR_LARGE,
  BUBBLE_BLUR_SMALL,
} from "../../_utils/onboarding-mind-widget-constants";
import { BubbleShadowResult } from "../../_hooks/use-onboarding-bubble-shadow";

interface OnboardingMindWidgetBubbleHighlightProps {
  isLarge: boolean;
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
  isLarge,
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

  // Compute bubble layer positioning based on size
  const offset = isLarge ? BUBBLE_OFFSET_LARGE : BUBBLE_OFFSET_SMALL;
  const size = isLarge ? BUBBLE_SIZE_LARGE : BUBBLE_SIZE_SMALL;
  const blur = isLarge ? BUBBLE_BLUR_LARGE : BUBBLE_BLUR_SMALL;

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
      {isLarge && (
        <motion.div
          className='rounded-full absolute'
          style={hoverShadowVariables}
          animate={{
            top: BUBBLE_OFFSET_LARGE,
            left: BUBBLE_OFFSET_LARGE,
            width: BUBBLE_SIZE_LARGE,
            height: BUBBLE_SIZE_LARGE,
            filter: BUBBLE_BLUR_LARGE,
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
        className='rounded-full absolute'
        animate={{
          top: offset,
          left: offset,
          width: size,
          height: size,
          filter: blur,
          boxShadow: isLarge
            ? DEFAULT_NEUTRAL_SHADOW_LARGE
            : SMALL_WIDGET_INNER_SHADOW,
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
