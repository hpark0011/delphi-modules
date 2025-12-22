import { OnboardingStepId } from "./onboarding-steps-config";

// Animation spring config
export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

/**
 * Flattened widget configuration for the mind widget.
 * All properties are at the top level for easy access.
 */
export interface WidgetConfig {
  // Dimensions
  width: number;
  height: number;
  top: string;

  // Border
  borderRadius: number;
  borderWidth: number;

  // Padding
  paddingX: number;
  paddingY: number;

  // Typography
  fontSize: string;

  // Shadows
  neutralShadow: string;
  innerShadow: string;

  // Bubble layer
  bubbleOffset: string;
  bubbleSize: string;
  bubbleBlur: string;

  // Behavior
  showHoverLayer: boolean;
  showLevel: boolean;

  // Motion
  motionDuration: number;
  motionEase: "easeIn" | "easeOut" | "easeInOut" | "linear";
}

// Base config for large widget (MindScore step)
const LARGE_WIDGET: WidgetConfig = {
  width: 336,
  height: 218,
  top: "17vh",
  borderRadius: 9999,
  borderWidth: 1.5,
  paddingX: 0,
  paddingY: 0,
  fontSize: "80px",
  neutralShadow:
    "inset 0px 1px 1px 1px rgba(0,0,0,0.1), inset 0px -1px 1px 0px rgba(255,255,255,0.7), inset 0px 1px 1px 3px rgba(255,255,255,1)",
  innerShadow:
    "inset 0px 1px 1px 1px rgba(0,0,0,0.1), inset 0px -1px 1px 0px rgba(255,255,255,0.7), inset 0px 1px 1px 3px rgba(255,255,255,1)",
  bubbleOffset: "2px",
  bubbleSize: "calc(100% - 4px)",
  bubbleBlur: "blur(6px)",
  showHoverLayer: true,
  showLevel: true,
  motionDuration: 0.2,
  motionEase: "easeIn",
};

// Base config for small widget (all other steps)
const SMALL_WIDGET: WidgetConfig = {
  width: 52,
  height: 40,
  top: "10px",
  borderRadius: 9999,
  borderWidth: 1,
  paddingX: 12,
  paddingY: 4,
  fontSize: "16px",
  neutralShadow:
    "0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)",
  innerShadow:
    "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
  bubbleOffset: "1px",
  bubbleSize: "calc(100% - 2px)",
  bubbleBlur: "blur(3px)",
  showHoverLayer: false,
  showLevel: false,
  motionDuration: 0.2,
  motionEase: "easeIn",
};

/**
 * Widget configuration mapped by step ID.
 * Makes it easy to customize widget appearance per step.
 */
export const STEP_WIDGET_CONFIG: Record<OnboardingStepId, WidgetConfig> = {
  StartVerification: SMALL_WIDGET,
  NameSearch: SMALL_WIDGET,
  MindScore: LARGE_WIDGET,
  ContentScraping: SMALL_WIDGET,
};

/**
 * Computes framer-motion props for the bubble component.
 */
export function getMotionProps(
  config: WidgetConfig,
  options?: {
    initialWidth?: number | string;
    animateWidth?: number | string;
  }
) {
  return {
    initial: {
      width: options?.initialWidth ?? config.width,
      height: config.height,
      borderWidth: 0,
      borderRadius: config.borderRadius,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    animate: {
      width: options?.animateWidth ?? config.width,
      height: config.height,
      borderWidth: config.borderWidth,
      borderRadius: config.borderRadius,
      paddingLeft: config.paddingX,
      paddingRight: config.paddingX,
      paddingTop: config.paddingY,
      paddingBottom: config.paddingY,
    },
    transition: {
      duration: config.motionDuration,
      ease: config.motionEase,
    },
  };
}
