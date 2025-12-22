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
    },
  };
