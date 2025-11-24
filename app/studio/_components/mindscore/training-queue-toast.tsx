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
    <div className='flex rounded-lg bg-white dark:bg-[#2C2C2A] shadow-lg ring-1 ring-black/5 dark:ring-white/10 w-full md:max-w-[420px] items-start p-4 gap-3'>
      {/* Icon container - aligned to top */}
      {icon && <div className='flex-shrink-0 pt-0.5'>{icon}</div>}
      {/* Content container */}
      <div className='flex flex-1 flex-col gap-1 min-w-0'>
        <p className='text-sm font-medium text-gray-900 dark:text-text-primary'>
          {title}
        </p>
        <p className='text-sm text-gray-500 dark:text-text-tertiary'>
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
  const title = `Added ${itemCount} ${itemCount === 1 ? "item" : "items"} to training queue`;
  const description =
    "You can close this tab and come back later - training will continue in the background. We'll notify you when it's done.";

  return sonnerToast.custom((id) => (
    <TrainingQueueToast
      id={id}
      title={title}
      description={description}
      icon={icon}
    />
  ));
}
