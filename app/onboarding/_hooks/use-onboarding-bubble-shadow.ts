import { useMemo, CSSProperties } from "react";
import {
  getLevelShadowColors,
  generateShadowString,
  generateSmallWidgetShadowString,
  LevelColors,
} from "@/app/studio/_utils/mind-shadow-helpers";
import { calculateLevel } from "../_utils/onboarding-mind-widget-utils";
import {
  DEFAULT_NEUTRAL_SHADOW_LARGE,
  DEFAULT_NEUTRAL_SHADOW_SMALL,
} from "../_utils/onboarding-mind-widget-constants";

interface UseOnboardingBubbleShadowProps {
  /** Current onboarding page index (0-based). Colored shadows apply from page 1+. */
  currentPage: number;
  /** Current mind score used to calculate level and shadow colors. */
  mindScore: number;
  /** Whether the widget is in large (expanded) mode. */
  isLarge: boolean;
}

/**
 * Result containing all computed shadow values for the bubble effect.
 */
export interface BubbleShadowResult {
  /** Calculated level based on mind score (e.g., "Novice", "Skilled"). */
  level: string;
  /** RGB color values for the current level. */
  levelColors: LevelColors;
  /** Whether to use level-colored shadows (true from page 1+). */
  shouldUseColoredShadow: boolean;
  /** Default box-shadow string for the bubble. */
  defaultShadow: string;
  /** Hover state box-shadow string for the bubble. */
  hoverShadow: string;
  /** Shadow style for the outer container (small widgets only). */
  outerContainerShadowStyle: CSSProperties | undefined;
  /** Shadow for the inner div (large widgets only). */
  innerDivShadow: string | undefined;
  /** CSS custom properties for animation colors. */
  cssVariables: CSSProperties;
  /** Base shadow used when not in animation state. */
  baseShadow: string;
}

/**
 * Computes all shadow-related values for the mind widget bubble effect.
 * Memoizes calculations based on current page, score, and size.
 *
 * @param props - The widget state properties
 * @returns Memoized shadow configuration for the bubble effect
 */
export function useOnboardingBubbleShadow({
  currentPage,
  mindScore,
  isLarge,
}: UseOnboardingBubbleShadowProps): BubbleShadowResult {
  return useMemo(() => {
    // Calculate level and get shadow colors (only apply colored shadow on and after page 1)
    const shouldUseColoredShadow = currentPage >= 1;
    const level = calculateLevel(mindScore);
    const levelColors = getLevelShadowColors(level);

    // Use different shadow generators for large vs small widgets (only if colored shadow is enabled)
    const defaultShadow = shouldUseColoredShadow
      ? isLarge
        ? generateShadowString(levelColors, false)
        : generateSmallWidgetShadowString(levelColors)
      : isLarge
        ? DEFAULT_NEUTRAL_SHADOW_LARGE
        : DEFAULT_NEUTRAL_SHADOW_SMALL;

    const hoverShadow = shouldUseColoredShadow
      ? isLarge
        ? generateShadowString(levelColors, true)
        : generateSmallWidgetShadowString(levelColors) // Small widget doesn't have hover state
      : defaultShadow;

    // Compute outer container shadow style for small widgets
    // Small widgets have colored shadow applied to outer container (not inner div)
    const outerContainerShadowStyle = (() => {
      // Large widgets don't need shadow on outer container (shadow is on inner div)
      if (isLarge) {
        return undefined;
      }

      // Small widget with colored shadow (page 1+)
      if (shouldUseColoredShadow) {
        return {
          boxShadow: defaultShadow.replace(/_/g, " "),
        };
      }

      // Small widget with neutral shadow (page 0)
      return {
        boxShadow: DEFAULT_NEUTRAL_SHADOW_SMALL.replace(/_/g, " "),
      };
    })();

    // Compute inner div shadow for the "Mind Area Inner" element
    // Only applies to large widgets (small widgets use white inset shadow)
    const innerDivShadow = (() => {
      // Only compute shadow for large widgets
      if (!isLarge) {
        return undefined;
      }

      // Large widget with colored shadow (page 1+)
      if (shouldUseColoredShadow) {
        return "var(--shadow-default)";
      }

      // Large widget with neutral shadow (page 0)
      return DEFAULT_NEUTRAL_SHADOW_LARGE;
    })();

    // CSS custom properties for the animations
    const cssVariables = {
      "--pill-color-light": levelColors.light,
      "--pill-color-medium": levelColors.medium,
      "--pill-color-dark": levelColors.dark,
    } as CSSProperties;

    // Base shadow when not animating
    const baseShadow = `inset 0 1px 8px -2px ${levelColors.light}, inset 0 -4px 6px -2px ${levelColors.medium}, inset 0 -13px 24px -14px ${levelColors.dark}, 0 0 0 0.5px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.4), 0 1px 1px 0 rgba(0,0,0,0.15), inset 0 0 6px 0 rgba(255,255,255,0.1)`;

    return {
      level,
      levelColors,
      shouldUseColoredShadow,
      defaultShadow,
      hoverShadow,
      outerContainerShadowStyle,
      innerDivShadow,
      cssVariables,
      baseShadow,
    };
  }, [currentPage, mindScore, isLarge]);
}
