import { useMemo, CSSProperties } from "react";
import {
  getLevelShadowColors,
  generateShadowString,
  generateSmallWidgetShadowString,
  LevelColors,
} from "@/app/studio/_utils/mind-shadow-helpers";
import { calculateLevel } from "../_utils/onboarding-mind-widget-utils";
import {
  WidgetSizeVariant,
  WIDGET_STYLE_CONFIG,
} from "../_utils/onboarding-mind-widget-style-config";

interface UseOnboardingBubbleShadowProps {
  /** Current onboarding step index (0-based). */
  currentStep: number;
  /** Current mind score used to calculate level and shadow colors. */
  mindScore: number;
  /** Size variant of the widget (large or small). */
  sizeVariant: WidgetSizeVariant;
}

/**
 * Result containing all computed shadow values for the bubble effect.
 */
export interface BubbleShadowResult {
  /** Calculated level based on mind score (e.g., "Novice", "Skilled"). */
  level: string;
  /** RGB color values for the current level. */
  levelColors: LevelColors;
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
 * Memoizes calculations based on current step, score, and size.
 *
 * @param props - The widget state properties
 * @returns Memoized shadow configuration for the bubble effect
 */
export function useOnboardingBubbleShadow({
  currentStep,
  mindScore,
  sizeVariant,
}: UseOnboardingBubbleShadowProps): BubbleShadowResult {
  return useMemo(() => {
    const isLarge = sizeVariant === "large";
    const config = WIDGET_STYLE_CONFIG[sizeVariant];

    // Calculate level and get shadow colors
    const level = calculateLevel(mindScore);
    const levelColors = getLevelShadowColors(level);

    // Use default neutral shadow when mindScore is 0, otherwise use level-based colored shadows
    const useDefaultShadow = mindScore === 0;

    // Use different shadow generators for large vs small widgets
    const defaultShadow = useDefaultShadow
      ? config.shadows.defaultNeutral
      : isLarge
        ? generateShadowString(levelColors, false)
        : generateSmallWidgetShadowString(levelColors);

    const hoverShadow = useDefaultShadow
      ? defaultShadow
      : isLarge
        ? generateShadowString(levelColors, true)
        : generateSmallWidgetShadowString(levelColors); // Small widget doesn't have hover state

    // Compute outer container shadow style for small widgets
    // Small widgets have colored shadow applied to outer container (not inner div)
    const outerContainerShadowStyle = (() => {
      // Large widgets don't need shadow on outer container (shadow is on inner div)
      if (isLarge) {
        return undefined;
      }

      return {
        boxShadow: defaultShadow.replace(/_/g, " "),
      };
    })();

    // Compute inner div shadow for the "Mind Area Inner" element
    // Only applies to large widgets (small widgets use white inset shadow)
    const innerDivShadow = (() => {
      // Only compute shadow for large widgets
      if (!isLarge) {
        return undefined;
      }

      return useDefaultShadow
        ? config.shadows.defaultNeutral
        : "var(--shadow-default)";
    })();

    // CSS custom properties for the animations
    const cssVariables = {
      "--pill-color-light": levelColors.light,
      "--pill-color-medium": levelColors.medium,
      "--pill-color-dark": levelColors.dark,
    } as CSSProperties;

    // Base shadow when not animating - always use level colors for base shadow
    const baseShadow = `inset 0 1px 8px -2px ${levelColors.light}, inset 0 -4px 6px -2px ${levelColors.medium}, inset 0 -13px 24px -14px ${levelColors.dark}, 0 0 0 0.5px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.4), 0 1px 1px 0 rgba(0,0,0,0.15), inset 0 0 6px 0 rgba(255,255,255,0.1)`;

    return {
      level,
      levelColors,
      defaultShadow,
      hoverShadow,
      outerContainerShadowStyle,
      innerDivShadow,
      cssVariables,
      baseShadow,
    };
  }, [currentStep, mindScore, sizeVariant]);
}
