"use client";

import { motion } from "framer-motion";
import { CSSProperties, useMemo } from "react";
import {
  SPRING_CONFIG,
  WidgetStyleConfig,
} from "../../_utils/onboarding-mind-widget-style-config";

interface OnboardingMindWidgetBubbleHighlightProps {
  config: WidgetStyleConfig;
  isLuminating: boolean;
  isGlowing: boolean;
  defaultShadow: string;
  hoverShadow: string;
  innerDivShadow?: string;
  cssVariables: CSSProperties;
  baseShadow: string;
  style?: CSSProperties;
}

/**
 * Renders the bubble highlight/glow effect layers for the mind widget.
 * Consists of two layers:
 * 1. Hover layer (large only) - handles mouse hover shadow transitions
 * 2. Animation layer - handles luminating/glowing states and base shadow
 */
export function OnboardingMindWidgetBubbleHighlight({
  config,
  isLuminating,
  isGlowing,
  defaultShadow,
  hoverShadow,
  innerDivShadow,
  cssVariables,
  baseShadow,
  style,
}: OnboardingMindWidgetBubbleHighlightProps) {
  // When animating, let CSS keyframes handle the shadow
  const boxShadow = useMemo(
    () => (isLuminating || isGlowing ? undefined : baseShadow),
    [isLuminating, isGlowing, baseShadow]
  );

  // CSS variables for hover shadow transitions (when hover layer is enabled)
  const hoverShadowVariables = config.highlight.showHoverLayer
    ? ({
        "--shadow-default": defaultShadow.replace(/_/g, " "),
        "--shadow-hover": hoverShadow.replace(/_/g, " "),
      } as CSSProperties)
    : undefined;

  return (
    <>
      {/* Hover layer - handles mouse hover shadow transitions (when enabled in config) */}
      {config.highlight.showHoverLayer && (
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
