"use client";

interface MindScoreRingProps {
  score: number;
  strokeWidth?: number;
  className?: string;
}

export function MindScoreRing({
  score,
  strokeWidth = 6,
  className = "",
}: MindScoreRingProps) {
  // Ensure score is between 0 and 100
  const clampedScore = Math.min(100, Math.max(0, score));

  // Radius for the rounded corners (half of the height 182px = 91px)
  // We need to account for stroke width to prevent clipping if it was inside,
  // but here we want it around the shape.
  // The design shows the ring outside or flush with the card.
  // Let's assume the SVG fills the container.

  // Using a rect with rx/ry is easier for pill shapes than a path
  // pathLength="100" allows us to use the score directly as dasharray

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        className='w-full h-full'
        viewBox='0 0 346 196' // Adding padding for stroke: 334 + 12, 182 + 12 roughly
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
      >
        {/* Background track (gray) */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx='96'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          className='text-black/5 dark:text-white/5'
        />

        {/* Progress indicator (green) */}
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx='96'
          stroke='#00D543'
          strokeWidth={strokeWidth}
          strokeLinecap='round'
          strokeDasharray='100'
          strokeDashoffset={100 - clampedScore}
          pathLength='100'
          className='transition-all duration-1000 ease-out'
        />
      </svg>
    </div>
  );
}
