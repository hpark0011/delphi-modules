"use client";

import { Icon } from "@/components/ui/icon";
import React from "react";

interface MindProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function MindProgressBar({
  current,
  total,
  className = "",
}: MindProgressBarProps) {
  const percentage =
    total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

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
        <div className='relative left-[-4px] opacity-0'>
          <Icon name='MindBubbleFillIcon' className='size-5 text-white' />
        </div>
        <p className='text-xs font-medium'>/ {total}</p>
      </div>
    </div>
  );
}
