"use client";

import { useId } from "react";

// Shadow color definitions for the SVG filter effects
const SHADOW_COLORS = {
  // Deep orange/brown shadow (outermost, strongest) - creates depth
  outerShadow: { r: 205, g: 93, b: 19, a: 1 }, // #CD5D13

  // Medium orange/peach shadow - warm mid-tone
  midShadow: { r: 255, g: 167, b: 109, a: 0.3 }, // #FFA76D

  // White highlight - adds brightness
  highlight: { r: 255, g: 255, b: 255, a: 0.3 }, // white

  // Light orange accent - final detail layer
  accent: { r: 255, g: 121, b: 31, a: 0.15 }, // #FF791F
} as const;

/**
 * Converts RGBA color values to feColorMatrix format
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @param a Alpha value (0-1)
 * @returns feColorMatrix values string
 */
function rgbaToColorMatrix(r: number, g: number, b: number, a: number): string {
  // Normalize RGB values (0-255 -> 0-1)
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // feColorMatrix format: [R, G, B, A, 0] per row
  // Format: "0 0 0 0 R  0 0 0 0 G  0 0 0 0 B  0 0 0 0 A"
  return `0 0 0 0 ${rNorm} 0 0 0 0 ${gNorm} 0 0 0 0 ${bNorm} 0 0 0 ${a} 0`;
}

interface MindWidgetOvalBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  ellipseProps?: {
    cx?: number;
    cy?: number;
    rx?: number;
    ry?: number;
  };
}

export function MindWidgetOvalBackground({
  className = "",
  style,
  ellipseProps = {
    cx: 166,
    cy: 82,
    rx: 150,
    ry: 104,
  },
}: MindWidgetOvalBackgroundProps) {
  const id = useId();
  const filterId = `filter0_iiii_${id}`;
  const gradientId = `paint0_linear_${id}`;

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      style={{
        position: "absolute",
        top: "0%",
        left: "0%",
        width: "100%",
        height: "100%",
        transform: "translateY(-24px)",
        scale: "1.4",
        ...style,
      }}
      width='332'
      height='187'
      viewBox='0 0 332 187'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid meet'
    >
      <g filter={`url(#${filterId})`}>
        <ellipse
          cx={ellipseProps.cx}
          cy={ellipseProps.cy}
          rx={ellipseProps.rx}
          ry={ellipseProps.ry}
          fill={`url(#${gradientId})`}
        />
      </g>
      <defs>
        <filter
          id={filterId}
          x='0'
          y='-30'
          width='332'
          height='217'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='30'
            operator='dilate'
            in='SourceAlpha'
            result='effect1_innerShadow_2290_4195'
          />
          <feOffset dy='-20' />
          <feGaussianBlur stdDeviation='30' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          {/* Shadow Layer 1: Deep orange/brown outer glow - creates depth */}
          <feColorMatrix
            type='matrix'
            values={rgbaToColorMatrix(
              SHADOW_COLORS.outerShadow.r,
              SHADOW_COLORS.outerShadow.g,
              SHADOW_COLORS.outerShadow.b,
              SHADOW_COLORS.outerShadow.a
            )}
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_2290_4195'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='10'
            operator='dilate'
            in='SourceAlpha'
            result='effect2_innerShadow_2290_4195'
          />
          <feOffset dy='-10' />
          <feGaussianBlur stdDeviation='10' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          {/* Shadow Layer 2: Medium orange/peach - warm mid-tone */}
          <feColorMatrix
            type='matrix'
            values={rgbaToColorMatrix(
              SHADOW_COLORS.midShadow.r,
              SHADOW_COLORS.midShadow.g,
              SHADOW_COLORS.midShadow.b,
              SHADOW_COLORS.midShadow.a
            )}
          />
          <feBlend
            mode='normal'
            in2='effect1_innerShadow_2290_4195'
            result='effect2_innerShadow_2290_4195'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='5'
            operator='dilate'
            in='SourceAlpha'
            result='effect3_innerShadow_2290_4195'
          />
          <feOffset dy='-18' />
          <feGaussianBlur stdDeviation='10' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          {/* Shadow Layer 3: White highlight - adds brightness */}
          <feColorMatrix
            type='matrix'
            values={rgbaToColorMatrix(
              SHADOW_COLORS.highlight.r,
              SHADOW_COLORS.highlight.g,
              SHADOW_COLORS.highlight.b,
              SHADOW_COLORS.highlight.a
            )}
          />
          <feBlend
            mode='normal'
            in2='effect2_innerShadow_2290_4195'
            result='effect3_innerShadow_2290_4195'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='2'
            operator='dilate'
            in='SourceAlpha'
            result='effect4_innerShadow_2290_4195'
          />
          <feOffset dy='-2' />
          <feGaussianBlur stdDeviation='3' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          {/* Shadow Layer 4: Light orange accent - final detail */}
          <feColorMatrix
            type='matrix'
            values={rgbaToColorMatrix(
              SHADOW_COLORS.accent.r,
              SHADOW_COLORS.accent.g,
              SHADOW_COLORS.accent.b,
              SHADOW_COLORS.accent.a
            )}
          />
          <feBlend
            mode='normal'
            in2='effect3_innerShadow_2290_4195'
            result='effect4_innerShadow_2290_4195'
          />
        </filter>
        <linearGradient
          id={gradientId}
          x1='166'
          y1='0'
          x2='166'
          y2='187'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='1' stopColor='#110C09' />
          <stop offset='1' stopColor='#23170A' />
        </linearGradient>
      </defs>
    </svg>
  );
}
