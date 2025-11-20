"use client";

import { Icon, type IconName } from "@/components/ui/icon";
import type { QueueItem } from "@/hooks/use-training-queue";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RingPercentage } from "./ring-percentage";
import type { TrainingStatus } from "./training-status-tab";

function getStatusIcon(status: TrainingStatus): IconName {
  switch (status) {
    case "completed":
      return "CheckedCircleFillIcon";
    case "training":
      return "LoaderCircleIcon";
    case "queued":
      return "CircleDashedIcon";
    case "failed":
      return "ExclamationmarkTriangleFillIcon";
    case "deleting":
      return "TrashFillIcon";
    default:
      return "CircleDashedIcon";
  }
}

function getDocTypeIcon(itemName: string): IconName | null {
  if (itemName.startsWith("Interview Question")) {
    return "MicFillIcon";
  }
  if (itemName.startsWith("YouTube Video")) {
    return "YoutubeIcon";
  }
  if (itemName.startsWith("X Post")) {
    return "XIcon";
  }
  if (itemName.startsWith("Website")) {
    return "GlobeIcon";
  }
  if (itemName.startsWith("Podcast")) {
    return "DocFillIcon";
  }
  return "DocFillIcon";
}

interface TrainingQueueItemProps {
  item: QueueItem;
  className?: string;
}

export function TrainingQueueItem({ item, className }: TrainingQueueItemProps) {
  return (
    <div
      className={cn(
        "px-2 py-0.5",
        "hover:bg-extra-light/50 transition-colors",
        className
      )}
    >
      <div className='flex items-center gap-1'>
        {/* Icon or Ring Percentage */}
        <div className='flex-shrink-0'>
          {item.status === "training" ? (
            <div className='size-5 flex items-center justify-center'>
              <Icon
                name='ArrowRightCircleFillIcon'
                className='size-5 text-[#3b82f6]'
              />
            </div>
          ) : item.status === "queued" ? (
            <div className='size-5 flex items-center justify-center'>
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
          ) : item.status === "deleting" ? (
            <div className='size-5 flex items-center justify-center'>
              <RingPercentage
                value={item.progress}
                size={14}
                strokeWidth={2}
                progressColor='#e5484d'
                trackColor='var(--color-neutral-200)'
                showLabel={false}
                animate={true}
                ariaLabel={`${item.name} deletion progress`}
              />
            </div>
          ) : (
            <Icon
              name={getStatusIcon(item.status)}
              className={cn(
                "size-5",
                item.status === "completed"
                  ? "text-[#09CE6B]"
                  : item.status === "failed"
                    ? "text-orange-500"
                    : "text-[#8D8D86]"
              )}
            />
          )}
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-1'>
            {getDocTypeIcon(item.name) && (
              <Icon
                name={getDocTypeIcon(item.name)!}
                className='size-4 text-icon-light flex-shrink-0'
              />
            )}
            {item.status === "training" ? (
              <motion.span
                className='text-sm font-medium text-text-primary truncate inline-block'
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-text-muted) 0%, rgba(59, 130, 246, 0.9) 50%, var(--color-text-muted) 100%)",
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
                  ease: "easeInOut",
                }}
              >
                {item.name}
              </motion.span>
            ) : (
              <p className='text-sm font-medium text-text-primary truncate'>
                {item.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
