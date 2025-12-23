import { OnboardingStepId } from "./onboarding-steps-config";

// Animation Config
export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

// Shadow Presets
export const SHADOW_PRESETS = {
  largeNeutral: [
    "inset 0px 1px 1px 1px rgba(0,0,0,0.1)",
    "inset 0px -1px 1px 0px rgba(255,255,255,0.7)",
    "inset 0px 1px 1px 3px rgba(255,255,255,1)",
  ].join(", "),

  smallNeutral: [
    "0 0 0 0.5px rgba(0,0,0,0.05)",
    "0 10px 20px -5px rgba(0,0,0,0.4)",
    "0 1px 1px 0 rgba(0,0,0,0.15)",
  ].join(","),

  smallInner: [
    "inset 0px -2px 2px 0px rgba(255,255,255,0.9)",
    "inset 0px 5px 2px 0px rgba(255,255,255,0.5)",
    "inset 0px 4px 4px 0px rgba(255,255,255,0)",
    "inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
  ].join(", "),
} as const;

// Types
export type MotionEase = "easeIn" | "easeOut" | "easeInOut" | "linear";
export type WidgetVariant = "large" | "small";

export interface WidgetConfig {
  variant: WidgetVariant;
  bubbleWidth: number;
  bubbleHeight: number;
  top: string;
  borderWidth: number;
  paddingX: number;
  paddingY: number;
  fontSize: string;
  neutralShadow: string;
  innerShadow: string;
  bubbleOffset: string;
  bubbleSize: string;
  bubbleBlur: string;
  showHoverLayer: boolean;
  showLevel: boolean;
  motionDuration: number;
  motionEase: MotionEase;
}

// Base Configurations
const BASE_DEFAULTS = {
  bubbleOffset: "0px",
  motionDuration: 0.2,
  motionEase: "easeIn" as MotionEase,
} as const;

const LARGE_BASE = {
  bubbleWidth: 336,
  bubbleHeight: 218,
  top: "17vh",
  borderWidth: 1.5,
  paddingX: 0,
  paddingY: 0,
  fontSize: "80px",
  bubbleSize: "calc(100% - 4px)",
  bubbleBlur: "blur(6px)",
  showHoverLayer: true,
  showLevel: true,
} as const;

const SMALL_BASE = {
  bubbleWidth: 52,
  bubbleHeight: 40,
  top: "10px",
  borderWidth: 1,
  paddingX: 12,
  paddingY: 4,
  fontSize: "16px",
  bubbleSize: "calc(100% - 2px)",
  bubbleBlur: "blur(3px)",
  showHoverLayer: false,
  showLevel: false,
} as const;

// Variant Registry
const WIDGET_VARIANTS = {
  large: {
    base: LARGE_BASE,
    shadows: {
      neutralShadow: SHADOW_PRESETS.largeNeutral,
      innerShadow: SHADOW_PRESETS.largeNeutral,
    },
  },
  small: {
    base: SMALL_BASE,
    shadows: {
      neutralShadow: SHADOW_PRESETS.smallNeutral,
      innerShadow: SHADOW_PRESETS.smallInner,
    },
  },
} as const;

// Config Factory
export function createWidgetConfig(
  variant: WidgetVariant,
  overrides?: Partial<WidgetConfig>
): WidgetConfig {
  const { base, shadows } = WIDGET_VARIANTS[variant];
  return {
    variant,
    ...BASE_DEFAULTS,
    ...base,
    ...shadows,
    ...overrides,
  };
}

// Pre-built Variants
const LARGE_WIDGET = createWidgetConfig("large");
const SMALL_WIDGET = createWidgetConfig("small");

// Step Configuration Mapping
export const STEP_WIDGET_CONFIG: Record<OnboardingStepId, WidgetConfig> = {
  StartVerification: SMALL_WIDGET,
  NameSearch: SMALL_WIDGET,
  MindScore: LARGE_WIDGET,
  ContentScraping: SMALL_WIDGET,
};

// Motion Helpers
export function getMotionProps(
  config: WidgetConfig,
  options?: {
    initialWidth?: number | string;
    animateWidth?: number | string;
  }
) {
  return {
    initial: {
      width: options?.initialWidth ?? config.bubbleWidth,
      height: config.bubbleHeight,
      borderWidth: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    animate: {
      width: options?.animateWidth ?? config.bubbleWidth,
      height: config.bubbleHeight,
      borderWidth: config.borderWidth,
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
