"use client";

import { ScoreIncrementAnimation } from "./score-increment-animation";

interface MindProgressBarProps {
  progressToNextLevel: number;
  nextLevelThreshold: number;
  progressCap: number;
  lastIncrement: number | null;
  lastDecrement: number | null;
  className?: string;
  accentColor?: string;
}

export function MindProgressBar({
  progressToNextLevel,
  nextLevelThreshold,
  progressCap,
  lastIncrement,
  lastDecrement,
  className = "",
  accentColor = "bg-white/90",
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
      <div className='w-[calc(100%-36px)] bg-white/20 rounded-b-[10px] h-[5px]'>
        <div
          className={`${accentColor} rounded-b-[10px] h-[5px] transition-all min-w-[12px]`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* Gauge Label */}
      <div className='w-full h-full flex items-center justify-between px-5 text-white/50 relative'>
        <div className='relative'>
          {/* Score Increment Animation */}
          <ScoreIncrementAnimation
            points={lastIncrement || 0}
            isVisible={lastIncrement !== null}
          />
          {/* Score Decrement Animation */}
          <ScoreIncrementAnimation
            points={-(lastDecrement || 0)}
            isVisible={lastDecrement !== null}
          />
        </div>
        <p className='text-[13px] font-medium'>
          / {nextLevelThreshold.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
