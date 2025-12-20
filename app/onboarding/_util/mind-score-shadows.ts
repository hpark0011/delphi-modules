// ============================================================================
// MIND SCORE SHADOW UTILITIES
// ============================================================================

export interface LevelColors {
  light: string; // rgba format
  medium: string; // rgba format
  dark: string; // rgba format
}

/**
 * Maps mind level to shadow color scheme
 */
export function getLevelShadowColors(level: string): LevelColors {
  switch (level) {
    case "Novice":
      // Orange-red colors
      return {
        light: "rgba(255,120,60,1)",
        medium: "rgba(255,93,0,0.5)",
        dark: "rgba(200,60,0,1)",
      };
    case "Skilled":
      // Orange colors
      return {
        light: "rgba(255,164,102,1)",
        medium: "rgba(255,167,109,0.5)",
        dark: "rgba(205,93,19,1)",
      };
    case "Expert":
      // Purple colors
      return {
        light: "rgba(200,150,255,1)",
        medium: "rgba(180,130,240,0.5)",
        dark: "rgba(120,80,180,1)",
      };
    case "Master":
      // Blue colors
      return {
        light: "rgba(100,150,255,1)",
        medium: "rgba(80,130,240,0.5)",
        dark: "rgba(50,100,200,1)",
      };
    case "Sage":
      // Green colors
      return {
        light: "rgba(100,220,150,1)",
        medium: "rgba(80,200,130,0.5)",
        dark: "rgba(50,150,100,1)",
      };
    case "Legendary":
      // Gold/yellow colors
      return {
        light: "rgba(255,215,0,1)",
        medium: "rgba(255,200,50,0.5)",
        dark: "rgba(200,150,0,1)",
      };
    case "Eternal":
      // Dark blue/navy colors
      return {
        light: "rgba(50,80,150,1)",
        medium: "rgba(40,70,130,0.5)",
        dark: "rgba(30,50,100,1)",
      };
    default:
      // Fallback to Skilled (orange) colors
      return {
        light: "rgba(255,164,102,1)",
        medium: "rgba(255,167,109,0.5)",
        dark: "rgba(205,93,19,1)",
      };
  }
}

/**
 * Generates hover shadow string for small widget with level-based colors
 * Bubble-like effect with colored outer glow
 */
export function generateSmallWidgetHoverShadowString(
  colors: LevelColors,
): string {
  return `inset 0 -8px 10px -2px ${colors.light}, inset 0 8px 28px -2px ${colors.medium}, 0 8px 12px -8px ${colors.dark}, 0 10px 40px -5px rgba(0,0,0,0.3)`;
}

/**
 * Generates shadow string for small widget with level-based colors
 * Format: inset glows + border + outer shadows + white highlight
 */
export function generateSmallWidgetShadowString(colors: LevelColors): string {
  return `inset 0 1px 8px -2px ${colors.light}, inset 0 -4px 6px -2px ${colors.medium}, inset 0 -13px 24px -14px ${colors.dark}, 0 0 0 0.5px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.4), 0 1px 1px 0 rgba(0,0,0,0.15), inset 0 0 6px 0 rgba(255,255,255,0.1)`;
}

/**
 * Generates glowing shadow string for small widget with level-based colors
 * Same structure as base shadow (7 layers) for smooth animation interpolation
 */
export function generateSmallWidgetGlowingShadowString(
  colors: LevelColors,
): string {
  return `inset 0 2px 16px -2px ${colors.light}, inset 0 -6px 12px -2px ${colors.medium}, inset 0 -16px 28px -4px ${colors.dark}, 0 0 0 0.5px rgba(0,0,0,0.05), 0 12px 22px -6px ${colors.dark}, 0 1px 1px 0 rgba(0,0,0,0.15), inset 0 0 10px 0 rgba(255,255,255,0.15)`;
}

/**
 * Parses rgba() string to extract RGB and alpha values
 */
function parseRgba(rgbaString: string): {
  r: number;
  g: number;
  b: number;
  a: number;
} {
  const match = rgbaString.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
  );
  if (!match) {
    throw new Error(`Invalid rgba string: ${rgbaString}`);
  }
  return {
    r: parseInt(match[1] ?? "0", 10),
    g: parseInt(match[2] ?? "0", 10),
    b: parseInt(match[3] ?? "0", 10),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

export interface SvgShadowColors {
  outerShadow: { r: number; g: number; b: number; a: number };
  midShadow: { r: number; g: number; b: number; a: number };
  highlight: { r: number; g: number; b: number; a: number };
  accent: { r: number; g: number; b: number; a: number };
}

/**
 * Generates shadow animation array for luminating effect based on level colors
 * Cycles through three shadow states to create a pulsing glow
 */
export function generateLuminatingShadows(
  colors: LevelColors,
): [string, string, string] {
  return [
    `inset 0 8px 20px -2px ${colors.light}, inset 0 4px 16px -2px ${colors.medium}, 0 10px 20px -5px rgba(0,0,0,0.4), 0 10px 20px -5px rgba(0,0,0,0)`,
    `inset 0 -8px 10px -2px ${colors.light}, inset 0 8px 28px -2px ${colors.medium}, 0 10px 20px -5px ${colors.dark}, 0 10px 40px -5px rgba(0,0,0,0.3)`,
    `inset 0 8px 20px -2px ${colors.light}, inset 0 4px 16px -2px ${colors.medium}, 0 10px 20px -5px rgba(0,0,0,0.4), 0 10px 20px -5px rgba(0,0,0,0)`,
  ];
}

/**
 * Maps mind level to SVG shadow colors (RGB format for SVG filters)
 */
export function getLevelSvgShadowColors(level: string): SvgShadowColors {
  const colors = getLevelShadowColors(level);

  // Parse rgba strings to RGB values
  const darkRgba = parseRgba(colors.dark);
  const mediumRgba = parseRgba(colors.medium);
  const lightRgba = parseRgba(colors.light);

  return {
    // outerShadow: dark color (alpha 1.0)
    outerShadow: {
      r: darkRgba.r,
      g: darkRgba.g,
      b: darkRgba.b,
      a: 1.0,
    },
    // midShadow: medium color (alpha 0.3)
    midShadow: {
      r: mediumRgba.r,
      g: mediumRgba.g,
      b: mediumRgba.b,
      a: 0.3,
    },
    // highlight: white (stays white for all levels)
    highlight: {
      r: 255,
      g: 255,
      b: 255,
      a: 0.3,
    },
    // accent: light color (alpha 0.15)
    accent: {
      r: lightRgba.r,
      g: lightRgba.g,
      b: lightRgba.b,
      a: 0.15,
    },
  };
}
