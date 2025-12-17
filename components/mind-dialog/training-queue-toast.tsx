"use client";

import React from "react";
import { toast as sonnerToast } from "sonner";

// Toast component interfaces
export interface TrainingQueueToastProps {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

// Custom Toast component with full styling control
function TrainingQueueToast({
  id,
  title,
  description,
  icon,
}: TrainingQueueToastProps) {
  return (
    <div className='flex flex-col rounded-2xl bg-[#FCFBFA] dark:bg-[#2C2C2A] w-full md:max-w-[420px] items-start p-4 pl-3 gap-1 transition-all duration-300 ease-out shadow-[0_12px_12px_0_rgba(0,0,0,0.10),0_17.2px_17.2px_-8.6px_rgba(0,0,0,0.03),0_8.6px_8.6px_-4.3px_rgba(0,0,0,0.03),0_4.3px_4.3px_-2.15px_rgba(0,0,0,0.03),0_1.075px_1.075px_-0.538px_rgba(0,0,0,0.03),0_-2.15px_2.15px_0_rgba(255,255,255,1)_inset,0_2.15px_2.15px_0_rgba(255,255,255,1)_inset] dark:shadow-[0_12px_12px_0_rgba(255,255,255,0.0),0_17.2px_17.2px_-8.6px_rgba(255,255,255,0.03),0_8.6px_8.6px_-4.3px_rgba(255,255,255,0.03),0_4.3px_4.3px_-2.15px_rgba(255,255,255,0.03),0_1.075px_1.075px_-0.538px_rgba(255,255,255,0.03),0_-2.15px_2.15px_0_rgba(0,0,0,0)_inset,0_2.15px_2.15px_0_rgba(0,0,0,0)_inset]'>
      {/* Icon container - aligned to top */}
      <div className='flex items-center justify-center gap-1 -ml-0.5'>
        {icon && <div className='flex-shrink-0'>{icon}</div>}
        <p className='text-sm font-medium text-gray-900 dark:text-text-primary'>
          {title}
        </p>
      </div>

      {/* Content container */}
      <div className='flex flex-1 flex-col gap-1 min-w-0 pl-5.5'>
        <p className='text-sm text-text-secondary dark:text-text-tertiary'>
          {description}
        </p>
      </div>
    </div>
  );
}

// Abstracted toast function for training queue notifications
export function showTrainingQueueToast(
  itemCount: number,
  icon?: React.ReactNode
) {
  const title = `Added ${itemCount} ${itemCount === 1 ? "item" : "items"} to training queue.`;
  const description =
    "You can close this tab. We’ll keep training in the background and tell you when it’s ready.";

  return sonnerToast.custom(
    (id) => (
      <TrainingQueueToast
        id={id}
        title={title}
        description={description}
        icon={icon}
      />
    )
    // {
    //   duration: Infinity, // Keep toast open for styling purposes
    // }
  );
}
