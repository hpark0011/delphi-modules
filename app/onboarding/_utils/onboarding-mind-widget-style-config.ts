// Animation Config
export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export type WidgetSizeVariant = "large" | "small";

export interface WidgetStyleConfig {
  dimensions: {
    width: number;
    height: number;
  };
  position: {
    top: string;
  };
  border: {
    radius: number;
    width: number;
  };
  padding: {
    x: number;
    y: number;
  };
  typography: {
    fontSize: string;
  };
  shadows: {
    defaultNeutral: string;
    innerShadow: string;
  };
  bubble: {
    offset: string;
    size: string;
    blur: string;
  };
  highlight: {
    showHoverLayer: boolean;
  };
  motion: {
    initial: {
      borderWidth: number;
      paddingLeft: number;
      paddingRight: number;
      paddingTop: number;
      paddingBottom: number;
    };
    animate: {
      borderWidth: number;
      paddingLeft: number;
      paddingRight: number;
      paddingTop: number;
      paddingBottom: number;
    };
    transition: {
      duration: number;
      ease: "easeIn" | "easeOut" | "easeInOut" | "linear";
    };
  };
}

/**
 * Computes motion props for the bubble component based on config and runtime state.
 */
export function getBubbleMotionProps(
  config: WidgetStyleConfig,
  options?: {
    initialWidth?: number | string;
    animateWidth?: number | string;
  }
) {
  const { initialWidth, animateWidth } = options ?? {};

  return {
    initial: {
      width: initialWidth ?? config.dimensions.width,
      height: config.dimensions.height,
      borderWidth: config.motion.initial.borderWidth,
      borderRadius: config.border.radius,
      paddingLeft: config.motion.initial.paddingLeft,
      paddingRight: config.motion.initial.paddingRight,
      paddingTop: config.motion.initial.paddingTop,
      paddingBottom: config.motion.initial.paddingBottom,
    },
    animate: {
      width: animateWidth ?? config.dimensions.width,
      height: config.dimensions.height,
      borderWidth: config.motion.animate.borderWidth,
      borderRadius: config.border.radius,
      paddingLeft: config.motion.animate.paddingLeft,
      paddingRight: config.motion.animate.paddingRight,
      paddingTop: config.motion.animate.paddingTop,
      paddingBottom: config.motion.animate.paddingBottom,
    },
    transition: config.motion.transition,
  };
}

export const WIDGET_STYLE_CONFIG: Record<WidgetSizeVariant, WidgetStyleConfig> =
  {
    large: {
      dimensions: {
        width: 336,
        height: 218,
      },
      position: {
        top: "17vh",
      },
      border: {
        radius: 9999,
        width: 1.5,
      },
      padding: {
        x: 0,
        y: 0,
      },
      typography: {
        fontSize: "80px",
      },
      shadows: {
        defaultNeutral:
          "inset 0px 1px 1px 1px rgba(0,0,0,0.1), inset 0px -1px 1px 0px rgba(255,255,255,0.7), inset 0px 1px 1px 3px rgba(255,255,255,1)",
        innerShadow:
          "inset 0px 1px 1px 1px rgba(0,0,0,0.1), inset 0px -1px 1px 0px rgba(255,255,255,0.7), inset 0px 1px 1px 3px rgba(255,255,255,1)",
      },
      bubble: {
        offset: "2px",
        size: "calc(100% - 4px)",
        blur: "blur(6px)",
      },
      highlight: {
        showHoverLayer: true,
      },
      motion: {
        initial: {
          borderWidth: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        animate: {
          borderWidth: 1.5,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      },
    },
    small: {
      dimensions: {
        width: 52,
        height: 40,
      },
      position: {
        top: "10px",
      },
      border: {
        radius: 9999,
        width: 1,
      },
      padding: {
        x: 12,
        y: 4,
      },
      typography: {
        fontSize: "16px",
      },
      shadows: {
        defaultNeutral:
          "0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)",
        innerShadow:
          "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
      },
      bubble: {
        offset: "1px",
        size: "calc(100% - 2px)",
        blur: "blur(3px)",
      },
      highlight: {
        showHoverLayer: false,
      },
      motion: {
        initial: {
          borderWidth: 0,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        animate: {
          borderWidth: 1,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 4,
          paddingBottom: 4,
        },
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      },
    },
  };
