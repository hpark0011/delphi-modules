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

// Level Shadow Colors
export interface LevelColors {
  light: string;
  medium: string;
  dark: string;
}

const LEVEL_COLORS: Record<string, LevelColors> = {
  Novice: {
    light: "rgba(255,220,100,1)",
    medium: "rgba(255,200,80,0.5)",
    dark: "rgba(200,150,50,1)",
  },
  Skilled: {
    light: "rgba(255,164,102,1)",
    medium: "rgba(255,167,109,0.5)",
    dark: "rgba(205,93,19,1)",
  },
  Expert: {
    light: "rgba(200,150,255,1)",
    medium: "rgba(180,130,240,0.5)",
    dark: "rgba(120,80,180,1)",
  },
  Master: {
    light: "rgba(100,150,255,1)",
    medium: "rgba(80,130,240,0.5)",
    dark: "rgba(50,100,200,1)",
  },
  Sage: {
    light: "rgba(100,220,150,1)",
    medium: "rgba(80,200,130,0.5)",
    dark: "rgba(50,150,100,1)",
  },
  Legendary: {
    light: "rgba(255,215,0,1)",
    medium: "rgba(255,200,50,0.5)",
    dark: "rgba(200,150,0,1)",
  },
  Eternal: {
    light: "rgba(50,80,150,1)",
    medium: "rgba(40,70,130,0.5)",
    dark: "rgba(30,50,100,1)",
  },
};

export function getLevelShadowColors(level: string): LevelColors {
  return LEVEL_COLORS[level] ?? LEVEL_COLORS.Skilled;
}

// Shadow Generators
export function generateShadowString(
  colors: LevelColors,
  isHover = false
): string {
  if (isHover) {
    return `inset_0px_0px_10px_-0px_${colors.light},inset_0px_-10px_40px_-7px_${colors.medium},inset_0px_-15px_70px_-30px_${colors.dark},inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_5px_10px_-5px_rgba(0,0,0,0.4)`;
  }
  return `inset_0px_0px_20px_-8px_${colors.light},inset_0px_-10px_60px_-7px_${colors.medium},inset_0px_-30px_90px_-30px_${colors.dark},inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4)`;
}

export function generateSmallWidgetShadowString(colors: LevelColors): string {
  return `inset_0_1px_8px_-2px_${colors.light},inset_0_-4px_6px_-2px_${colors.medium},inset_0_-13px_24px_-14px_${colors.dark},_0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.3),0_1px_1px_0_rgba(0,0,0,0.15),_inset_0_0_6px_0_rgba(255,255,255,0.1)`;
}

// SVG Shadow Colors (for SVG filters)
export interface SvgShadowColors {
  outerShadow: { r: number; g: number; b: number; a: number };
  midShadow: { r: number; g: number; b: number; a: number };
  highlight: { r: number; g: number; b: number; a: number };
  accent: { r: number; g: number; b: number; a: number };
}

function parseRgba(rgbaString: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const match = rgbaString.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
  );
  if (!match) {
    throw new Error(`Invalid rgba string: ${rgbaString}`);
  }
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

export function getLevelSvgShadowColors(level: string): SvgShadowColors {
  const colors = getLevelShadowColors(level);
  const darkRgba = parseRgba(colors.dark);
  const mediumRgba = parseRgba(colors.medium);
  const lightRgba = parseRgba(colors.light);

  return {
    outerShadow: { r: darkRgba.r, g: darkRgba.g, b: darkRgba.b, a: 1.0 },
    midShadow: { r: mediumRgba.r, g: mediumRgba.g, b: mediumRgba.b, a: 0.3 },
    highlight: { r: 255, g: 255, b: 255, a: 0.3 },
    accent: { r: lightRgba.r, g: lightRgba.g, b: lightRgba.b, a: 0.15 },
  };
}

// Types
export type MotionEase = "easeIn" | "easeOut" | "easeInOut" | "linear";
export type WidgetVariant = "large" | "small";

/**
 * Configuration for the onboarding mind widget.
 * Properties are grouped by the component they affect.
 */
export interface WidgetConfig {
  // General / Variant
  /** Widget variant type - determines overall size and behavior */
  variant: WidgetVariant;

  // Bubble Container
  // Affects: onboarding-mind-widget-bubble.tsx
  /** Width of the main bubble container */
  bubbleWidth: number;
  /** Height of the main bubble container */
  bubbleHeight: number;
  /** Border width for the bubble container */
  bubbleBorderWidth: number;
  /** Horizontal padding for the bubble container */
  bubblePaddingX: number;
  /** Vertical padding for the bubble container */
  bubblePaddingY: number;
  /** Animation duration for bubble container transitions */
  motionDuration: number;
  /** Animation easing function for bubble container transitions */
  motionEase: MotionEase;

  // Bubble Highlight
  // Affects: onboarding-mind-widget-bubble-highlight.tsx
  /** Offset position for the highlight layer (top/left positioning) */
  highlightOffset: string;
  /** Size of the highlight layer (width/height) */
  highlightSize: string;
  /** Blur filter applied to the highlight layer */
  highlightBlur: string;
  /** Shadow applied to the highlight layer */
  innerShadow: string;
  /** Whether to show the hover layer (large widgets only) */
  showHoverLayer: boolean;

  // Content
  // Affects: onboarding-mind-widget-score.tsx, onboarding-mind-widget-plus-ten.tsx
  /** Font size for score and plus-ten content */
  contentFontSize: string;

  // Container
  // Affects: onboarding-mind-widget-container.tsx
  /** Vertical positioning of the widget container */
  top: string;

  // Shadows
  // Affects: use-onboarding-bubble-shadow.ts
  /** Default neutral shadow used when mindScore is 0 */
  neutralShadow: string;

  // Display Flags
  // Affects: onboarding-mind-widget.tsx
  /** Whether to display the level text */
  showLevel: boolean;
}

// Base Configurations
const BASE_DEFAULTS = {
  highlightOffset: "0px",
  motionDuration: 0.2,
  motionEase: "easeIn" as MotionEase,
} as const;

const LARGE_BASE = {
  bubbleWidth: 336,
  bubbleHeight: 218,
  top: "17vh",
  bubbleBorderWidth: 1.5,
  bubblePaddingX: 0,
  bubblePaddingY: 0,
  contentFontSize: "80px",
  highlightSize: "calc(100% - 4px)",
  highlightBlur: "blur(6px)",
  showHoverLayer: true,
  showLevel: true,
} as const;

const SMALL_BASE = {
  bubbleWidth: 52,
  bubbleHeight: 40,
  top: "10px",
  bubbleBorderWidth: 1,
  bubblePaddingX: 12,
  bubblePaddingY: 4,
  contentFontSize: "16px",
  highlightSize: "calc(100% - 2px)",
  highlightBlur: "blur(3px)",
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
      borderWidth: config.bubbleBorderWidth,
      paddingLeft: config.bubblePaddingX,
      paddingRight: config.bubblePaddingX,
      paddingTop: config.bubblePaddingY,
      paddingBottom: config.bubblePaddingY,
    },
    transition: {
      duration: config.motionDuration,
      ease: config.motionEase,
    },
  };
}
