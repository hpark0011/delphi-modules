"use client";

import { ScoreIncrementAnimation } from "./score-increment-animation";

interface MindProgressBarProps {
  progressToNextLevel: number;
  nextLevelThreshold: number;
  progressCap: number;
  lastIncrement: number | null;
  className?: string;
}

export function MindProgressBar({
  progressToNextLevel,
  nextLevelThreshold,
  progressCap,
  lastIncrement,
  className = "",
}: MindProgressBarProps) {
  const percentage =
    progressCap > 0
      ? Math.min(100, Math.max(0, (progressToNextLevel / progressCap) * 100))
      : 0;

  return (
    <div
      className={`w-full flex flex-col items-center gap-1 absolute top-0 left-0 z-10 ${className}`}
    >
      {/* Gauge */}
      <div className='w-[calc(100%-32px)] bg-white/20 rounded-b-[10px] h-[4px]'>
        <div
          className='bg-white/80 rounded-b-[10px] h-[4px] transition-all'
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* Gauge Label */}
      <div className='w-full h-full flex items-center justify-between px-4 text-white/50 relative'>
        <div className='relative'>
          {/* Score Increment Animation */}
          <ScoreIncrementAnimation
            points={lastIncrement || 0}
            isVisible={lastIncrement !== null}
          />
        </div>
        <p className='text-xs font-medium'>
          / {nextLevelThreshold.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
