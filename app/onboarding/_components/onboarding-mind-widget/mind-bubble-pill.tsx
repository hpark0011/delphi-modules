"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { getLevelShadowColors } from "@/app/studio/_utils/mind-shadow-helpers";

interface MindBubblePillProps {
  levelName: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLuminating?: boolean;
  isGlowing?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * The visual pill component for the mind bubble
 *
 * Displays the mindscore pill with level-based colors and CSS-only animations.
 * Uses CSS custom properties to pass level colors to keyframe animations.
 */
export function MindBubblePill({
  levelName,
  children,
  onClick,
  disabled = false,
  isLuminating = false,
  isGlowing = false,
  className,
  style,
  ...motionProps
}: MindBubblePillProps) {
  // Get level-based shadow colors for CSS custom properties
  const levelColors = getLevelShadowColors(levelName);

  // CSS custom properties for the animations
  const cssVariables = {
    "--pill-color-light": levelColors.light,
    "--pill-color-medium": levelColors.medium,
    "--pill-color-dark": levelColors.dark,
  } as CSSProperties;

  // Base shadow when not animating
  const baseShadow = `inset 0 1px 8px -2px ${levelColors.light}, inset 0 -4px 6px -2px ${levelColors.medium}, inset 0 -13px 24px -14px ${levelColors.dark}, 0 0 0 0.5px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.4), 0 1px 1px 0 rgba(0,0,0,0.15), inset 0 0 6px 0 rgba(255,255,255,0.1)`;

  // Hover shadow
  const hoverShadow = `inset 0 -8px 10px -2px ${levelColors.light}, inset 0 8px 28px -2px ${levelColors.medium}, 0 8px 12px -8px ${levelColors.dark}, 0 10px 40px -5px rgba(0,0,0,0.3)`;

  // Determine inline box-shadow for non-animated states
  const getBoxShadow = (): string | undefined => {
    // When animating, let CSS keyframes handle the shadow
    if (isLuminating || isGlowing) return undefined;
    return baseShadow;
  };

  return (
    <motion.div
      className={cn(
        "flex items-center w-fit relative mind-score-pill select-none",
        !disabled && "cursor-pointer"
      )}
      {...motionProps}
      onClick={disabled ? undefined : onClick}
    >
      <div
        className={cn(
          "mind-bubble-pill",
          "flex flex-col gap-2",
          // Shape & overflow
          "overflow-hidden mind-score-pill",
          // Background
          "bg-sand-12 dark:bg-black/60",
          "px-2.5 py-1.5",
          "relative z-0",
          "justify-center items-center",
          !disabled && "cursor-pointer hover:bg-black/84",
          className
        )}
        data-disabled={disabled}
        data-luminating={isLuminating}
        data-glowing={isGlowing}
        style={{
          ...cssVariables,
          boxShadow: getBoxShadow(),
          // Apply hover shadow via CSS variable for hover state
          ["--pill-hover-shadow" as string]: hoverShadow,
          ...style,
        }}
      >
        {children}

        {/* Inner highlight overlay */}
        <div className='mind-bubble-pill-highlight mind-score-pill' />
      </div>
    </motion.div>
  );
}
