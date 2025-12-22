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
      return {
        light: "rgba(255,220,100,1)",
        medium: "rgba(255,200,80,0.5)",
        dark: "rgba(200,150,50,1)",
      };
    case "Skilled":
      return {
        light: "rgba(255,164,102,1)",
        medium: "rgba(255,167,109,0.5)",
        dark: "rgba(205,93,19,1)",
      };
    case "Expert":
      return {
        light: "rgba(200,150,255,1)",
        medium: "rgba(180,130,240,0.5)",
        dark: "rgba(120,80,180,1)",
      };
    case "Master":
      return {
        light: "rgba(100,150,255,1)",
        medium: "rgba(80,130,240,0.5)",
        dark: "rgba(50,100,200,1)",
      };
    case "Sage":
      return {
        light: "rgba(100,220,150,1)",
        medium: "rgba(80,200,130,0.5)",
        dark: "rgba(50,150,100,1)",
      };
    case "Legendary":
      return {
        light: "rgba(255,215,0,1)",
        medium: "rgba(255,200,50,0.5)",
        dark: "rgba(200,150,0,1)",
      };
    case "Eternal":
      return {
        light: "rgba(50,80,150,1)",
        medium: "rgba(40,70,130,0.5)",
        dark: "rgba(30,50,100,1)",
      };
    default:
      return {
        light: "rgba(255,164,102,1)",
        medium: "rgba(255,167,109,0.5)",
        dark: "rgba(205,93,19,1)",
      };
  }
}

/**
 * Generates shadow string with level-based colors
 */
export function generateShadowString(
  colors: LevelColors,
  isHover: boolean = false
): string {
  if (isHover) {
    return `inset_0px_0px_10px_-0px_${colors.light},inset_0px_-10px_40px_-7px_${colors.medium},inset_0px_-15px_70px_-30px_${colors.dark},inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_5px_10px_-5px_rgba(0,0,0,0.4)`;
  }
  return `inset_0px_0px_20px_-8px_${colors.light},inset_0px_-10px_60px_-7px_${colors.medium},inset_0px_-30px_90px_-30px_${colors.dark},inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4)`;
}

/**
 * Generates shadow string for small widget with level-based colors
 * Format: inset glows + border + outer shadows + white highlight
 */
export function generateSmallWidgetShadowString(colors: LevelColors): string {
  return `inset_0_1px_8px_-2px_${colors.light},inset_0_-4px_6px_-2px_${colors.medium},inset_0_-13px_24px_-14px_${colors.dark},_0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.3),0_1px_1px_0_rgba(0,0,0,0.15),_inset_0_0_6px_0_rgba(255,255,255,0.1)`;
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

export interface SvgShadowColors {
  outerShadow: { r: number; g: number; b: number; a: number };
  midShadow: { r: number; g: number; b: number; a: number };
  highlight: { r: number; g: number; b: number; a: number };
  accent: { r: number; g: number; b: number; a: number };
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
