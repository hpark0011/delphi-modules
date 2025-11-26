import { useId } from "react";
import type { SVGProps } from "react";

interface MindWidgetDomeProps extends SVGProps<SVGSVGElement> {
  startColor?: string;
  stopColor?: string;
}

export function MindWidgetDome({
  startColor = "#D9D9D9",
  stopColor = "#737373",
  ...props
}: MindWidgetDomeProps) {
  const gradientId = useId();
  const uniqueGradientId = `paint0_linear_${gradientId.replace(/:/g, "_")}`;

  return (
    // <svg
    //   {...props}
    //   viewBox='0 0 880 375'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <path
    //     fillRule='evenodd'
    //     clipRule='evenodd'
    //     d='M0 82.5C0 240.176 169.982 375 439.978 375C709.974 375 880 240.176 880 82.5C880 30 850 0 787.5 0H440H92.5C30 0 0 30 0 82.5Z'
    //     fill={`url(#${uniqueGradientId})`}
    //   />
    //   <defs>
    //     <linearGradient
    //       id={uniqueGradientId}
    //       x1='440'
    //       y1='0'
    //       x2='440'
    //       y2='375'
    //       gradientUnits='userSpaceOnUse'
    //     >
    //       <stop stopColor={startColor} />
    //       <stop offset='1' stopColor={stopColor} />
    //     </linearGradient>
    //   </defs>
    // </svg>
    <svg
      {...props}
      viewBox='0 0 1014 536'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_dddddd_2282_4102)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M67 82.5C67 240.176 236.982 375 506.978 375C776.974 375 947 240.176 947 82.5C947 30 917 0 854.5 0H507H159.5C97 0 67 30 67 82.5Z'
          fill='url(#paint0_linear_2282_4102)'
        />
      </g>
      <defs>
        <filter
          id='filter0_dddddd_2282_4102'
          x='0'
          y='0'
          width='1014'
          height='536'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2.60122' />
          <feGaussianBlur stdDeviation='0.927031' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0168687 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2282_4102'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='6.2511' />
          <feGaussianBlur stdDeviation='2.22778' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0242336 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_2282_4102'
            result='effect2_dropShadow_2282_4102'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='11.7703' />
          <feGaussianBlur stdDeviation='4.19472' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0'
          />
          <feBlend
            mode='normal'
            in2='effect2_dropShadow_2282_4102'
            result='effect3_dropShadow_2282_4102'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='20.9961' />
          <feGaussianBlur stdDeviation='7.48266' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0357664 0'
          />
          <feBlend
            mode='normal'
            in2='effect3_dropShadow_2282_4102'
            result='effect4_dropShadow_2282_4102'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='39.271' />
          <feGaussianBlur stdDeviation='13.9955' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0431313 0'
          />
          <feBlend
            mode='normal'
            in2='effect4_dropShadow_2282_4102'
            result='effect5_dropShadow_2282_4102'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='94' />
          <feGaussianBlur stdDeviation='33.5' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0'
          />
          <feBlend
            mode='normal'
            in2='effect5_dropShadow_2282_4102'
            result='effect6_dropShadow_2282_4102'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect6_dropShadow_2282_4102'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_2282_4102'
          x1='507'
          y1='0'
          x2='507'
          y2='375'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor={startColor} />
          <stop offset='1' stopColor={stopColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}
