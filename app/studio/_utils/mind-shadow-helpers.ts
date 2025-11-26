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
      // Fallback to Skilled (orange) colors
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
    return `inset_0px_0px_10px_-0px_${colors.light},inset_0px_-10px_30px_-7px_${colors.medium},inset_0px_-15px_80px_-30px_${colors.dark},inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_5px_10px_-5px_rgba(0,0,0,0.4)`;
  }
  return `inset_0px_0px_30px_-8px_${colors.light},inset_0px_-10px_40px_-7px_${colors.medium},inset_0px_-35px_80px_-30px_${colors.dark},inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4)`;
}
