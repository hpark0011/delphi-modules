import { useState, useMemo } from "react";

export function PillProgress() {
  const [progress, setProgress] = useState(85);

  // SVG dimensions
  const width = 334;
  const height = 182;
  const strokeWidth = 7;
  const padding = strokeWidth / 2;

  // Calculate pill dimensions
  const pillWidth = width - padding * 2;
  const pillHeight = height - padding * 2;
  const radius = pillHeight / 2;

  // Create the pill path (starting from top center, going clockwise)
  const pillPath = useMemo(() => {
    const startX = width / 2;
    const startY = padding;
    const leftX = padding + radius;
    const rightX = width - padding - radius;
    const topY = padding;
    const bottomY = height - padding;

    return `
      M ${startX} ${topY}
      L ${rightX} ${topY}
      A ${radius} ${radius} 0 0 1 ${rightX} ${bottomY}
      L ${leftX} ${bottomY}
      A ${radius} ${radius} 0 0 1 ${leftX} ${topY}
      L ${startX} ${topY}
    `;
  }, [width, height, padding, radius]);

  // Calculate path length for stroke-dasharray
  const pathLength = useMemo(() => {
    const straightParts = (pillWidth - pillHeight) * 2;
    const curvedParts = Math.PI * (pillHeight - strokeWidth);
    return straightParts + curvedParts + pillHeight;
  }, [pillWidth, pillHeight, strokeWidth]);

  // Use a fixed reference length for consistent animation
  const referenceLength = 700;
  const dashOffset = referenceLength - (progress / 100) * referenceLength;

  return (
    <>
      {/* Pill Progress Container */}
      <div className='relative' style={{ width, height }}>
        {/* SVG Progress Ring */}
        <svg
          width={width}
          height={height}
          className='absolute inset-0'
          style={{ filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.3))" }}
        >
          <defs>
            {/* Gradient for progress */}
            <linearGradient
              id='progressGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#22c55e' />
              <stop offset='100%' stopColor='#16a34a' />
            </linearGradient>
          </defs>

          {/* Background track (gray) */}
          <path
            d={pillPath}
            fill='none'
            stroke='#D9D9D9'
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          {/* Progress indicator (green) */}
          <path
            d={pillPath}
            fill='none'
            stroke='url(#progressGradient)'
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeDasharray={referenceLength}
            strokeDashoffset={dashOffset}
            filter='url(#glow)'
            className='transition-all duration-500 ease-out'
          />
        </svg>

        {/* Inner black pill */}
        <div
          className='absolute bg-black/87 flex items-center justify-center'
          style={{
            left: padding + strokeWidth / 2,
            top: padding + strokeWidth / 2,
            width: pillWidth - strokeWidth,
            height: pillHeight - strokeWidth,
            borderRadius: (pillHeight - strokeWidth - 2) / 2,
          }}
        >
          {/* Progress number */}
          <span
            className='text-white font-semibold tracking-tight transition-all duration-300'
            style={{
              fontSize: "72px",
              fontFamily:
                "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              textShadow: "0 0 40px rgba(255,255,255,0.1)",
            }}
          >
            {progress}
          </span>
        </div>
      </div>

      {/* Slider Control */}
      {/* <div className='flex flex-col items-center gap-4 w-full max-w-xs'>
        <input
          type='range'
          min='0'
          max='100'
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className='w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:bg-green-500
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:shadow-green-500/50
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:bg-green-500
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer'
        />
      </div> */}
    </>
  );
}
