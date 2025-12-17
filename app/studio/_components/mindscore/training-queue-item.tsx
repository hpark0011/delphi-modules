"use client";

import {
  getStatusColor,
  getStatusIcon,
} from "@/app/studio/_utils/mind-dialog-helpers";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import type { QueueItem } from "@/hooks/use-training-queue";
import { useTrainingQueue } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { getDocTypeIcon } from "@/utils/doc-type-helpers";
import { motion } from "framer-motion";
import { RingPercentage } from "./ring-percentage";

interface TrainingQueueItemProps {
  item: QueueItem;
  className?: string;
  docIconSize?: string;
  fontSize?: string;
  containerClassName?: string;
}

export function TrainingQueueItem({
  item,
  className,
  docIconSize = "size-4",
  fontSize = "text-sm",
  containerClassName,
}: TrainingQueueItemProps) {
  const { removeItem, retryItem } = useTrainingQueue();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeItem(item.id);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    retryItem(item.id);
  };

  return (
    <div
      className={cn(
        "px-2.5 pr-[9px] py-0.5",
        "hover:bg-extra-light/50",
        containerClassName,
        className
      )}
    >
      <div className='flex items-center gap-1 w-full min-w-0'>
        {/* Content */}
        <div className='flex-1 min-w-0 overflow-hidden'>
          <div className='flex items-center gap-1 justify-between min-w-0'>
            <div className='flex items-center gap-1 min-w-0 flex-1 overflow-hidden'>
              <Icon
                name={getDocTypeIcon(item.docType)}
                className={cn(docIconSize, "text-icon-light flex-shrink-0")}
              />
              {/* If item is training, show the training status */}
              {item.status === "training" ? (
                <motion.span
                  className={cn(
                    fontSize,
                    "font-medium text-text-primary truncate min-w-0 flex-1"
                  )}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(59, 130, 246, 0.3) 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {item.name}
                </motion.span>
              ) : (
                // If item is not training, show the item name
                <span
                  className={cn(
                    fontSize,
                    "font-medium text-text-primary truncate min-w-0 flex-1"
                  )}
                >
                  {item.name}
                </span>
              )}
            </div>
            {/* Icon or Ring Percentage */}
            <div className='flex-shrink-0 flex items-center gap-1'>
              {item.status === "training" ? (
                <div className='size-5 flex items-center justify-center'>
                  <Icon
                    name='ArrowLeftCircleFillIcon'
                    className='size-5 text-[#3b82f6]'
                  />
                </div>
              ) : item.status === "queued" ? (
                <div className='size-6 flex items-center justify-center'>
                  <RingPercentage
                    value={item.progress}
                    size={14}
                    strokeWidth={2}
                    progressColor='#8D8D86'
                    trackColor='var(--color-neutral-200)'
                    showLabel={false}
                    animate={true}
                    ariaLabel={`${item.name} progress`}
                  />
                </div>
              ) : item.status === "failed" ? (
                <>
                  <div className='flex items-center size-6 justify-center'>
                    <Icon
                      name={getStatusIcon(item.status)}
                      className={cn("size-5", getStatusColor(item.status))}
                    />
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleRetry}
                    className='h-6 w-6 p-0 hover:bg-sand-4 rounded-sm'
                    aria-label='Retry training'
                  >
                    <Icon
                      name='ArrowClockwiseIcon'
                      className='size-5 text-icon-light'
                    />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={handleDelete}
                    className='h-6 w-6 p-0 hover:bg-sand-4 rounded-sm'
                    aria-label='Delete item'
                  >
                    <Icon
                      name='TrashFillIcon'
                      className='size-5 text-icon-light'
                    />
                  </Button>
                </>
              ) : (
                <div className='flex items-center size-6 justify-center'>
                  <Icon
                    name={getStatusIcon(item.status)}
                    className={cn("size-5", getStatusColor(item.status))}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
