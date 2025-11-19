"use client";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { QueueItem } from "@/hooks/use-training-queue";
import type { TrainingStatus } from "./training-status-tab";

function getStatusBadgeVariant(status: TrainingStatus): {
  variant: "default" | "secondary" | "destructive" | "outline";
  className?: string;
} {
  switch (status) {
    case "completed":
      return {
        variant: "default",
        className: "bg-[#09CE6B]/15 text-[#09CE6B] border-[#09CE6B]/30",
      };
    case "training":
      return {
        variant: "default",
        className: "bg-blue-500/15 text-blue-600 border-blue-500/30",
      };
    case "failed":
      return {
        variant: "destructive",
        className: "bg-destructive/15 text-destructive border-destructive/30",
      };
    case "queued":
      return {
        variant: "secondary",
        className: "bg-[#8D8D86]/15 text-[#8D8D86] border-[#8D8D86]/30",
      };
    default:
      return { variant: "outline" };
  }
}

function getStatusIcon(status: TrainingStatus) {
  switch (status) {
    case "completed":
      return "CheckCircleIcon";
    case "training":
      return "ArrowClockwiseIcon";
    case "queued":
      return "ClockFillIcon";
    case "failed":
      return "ExclamationmarkCircle";
    default:
      return "ClockFillIcon";
  }
}

interface TrainingQueueItemProps {
  item: QueueItem;
  className?: string;
}

export function TrainingQueueItem({ item, className }: TrainingQueueItemProps) {
  return (
    <div
      className={cn(
        "px-4 py-3 border-b border-border last:border-b-0",
        "hover:bg-extra-light/50 transition-colors",
        className
      )}
    >
      <div className='flex items-center gap-3'>
        {/* Icon */}
        <div className='flex-shrink-0'>
          {item.status === "training" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon
                name={getStatusIcon(item.status) as any}
                className='size-5 text-blue-600'
              />
            </motion.div>
          ) : (
            <Icon
              name={getStatusIcon(item.status) as any}
              className={cn(
                "size-5",
                item.status === "completed"
                  ? "text-[#09CE6B]"
                  : item.status === "failed"
                    ? "text-destructive"
                    : "text-[#8D8D86]"
              )}
            />
          )}
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-1'>
            <p className='text-sm font-medium text-text-primary truncate'>
              {item.name}
            </p>
            <Badge
              variant={getStatusBadgeVariant(item.status).variant}
              className={cn(
                "text-[10px] font-medium shrink-0 rounded-sm px-1.5 py-0.5",
                getStatusBadgeVariant(item.status).className
              )}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          </div>

          {/* Progress Bar */}
          {(item.status === "training" || item.status === "queued") && (
            <div className='h-1 bg-light rounded-full overflow-hidden mt-1.5'>
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  item.status === "training"
                    ? "bg-blue-500"
                    : "bg-[#8D8D86]"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

