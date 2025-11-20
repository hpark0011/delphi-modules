"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useMindDialog } from "../mind-dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import type { QueueItem } from "@/hooks/use-training-queue";
import { ExpandableQueueList } from "./expandable-queue-list";

export interface TrainingCompletedStatusProps {
  setShowCompletedStatus: (show: boolean) => void;
  completedCount: number;
  failedCount: number;
  queueSnapshot?: QueueItem[];
}

export function TrainingCompletedStatus({
  setShowCompletedStatus,
  completedCount,
  failedCount,
  queueSnapshot = [],
}: TrainingCompletedStatusProps) {
  const { openWithTab } = useMindDialog();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className='w-full relative'>
      <div className='w-full items-center flex justify-center p-2 py-1.5 pr-3 gap-1 text-text-tertiary cursor-pointer rounded-full'>
        <div
          className='flex items-center gap-0.5 relative py-0.5 px-2 w-full pl-1 group hover:opacity-70'
          onClick={handleToggle}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className='size-3.5 text-icon-light' />
          </motion.div>
          <div className='text-[13px] font-[500] w-full'>
            Learning completed!
          </div>
        </div>
        <div className='text-xs dark:bg-black text-text-muted flex items-center gap-1 mr-1'>
          {/* Completed items */}
          {completedCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='text-green-500 min-w-[18px] text-center  cursor-default flex items-center'>
                  <Icon name='CheckedCircleFillIcon' className='size-4.5' />
                  <span className='text-[12px] font-medium'>
                    {completedCount}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
                completed
              </TooltipContent>
            </Tooltip>
          )}
          {/* Failed items */}
          {failedCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild className='shadow-2xl'>
                <div className='text-orange-500 min-w-[18px] text-center cursor-default flex items-center'>
                  <Icon
                    name='ExclamationmarkTriangleFillIcon'
                    className='size-4.5'
                  />
                  <span className='text-[12px] font-medium'>{failedCount}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
                failed
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <Tooltip>
          <TooltipTrigger asChild className='shadow-2xl'>
            <div
              className='mr-1 flex items-center gap-0.5 cursor-pointer group'
              onClick={() => {
                setShowCompletedStatus(false);
                openWithTab("training-status");
              }}
              role='button'
            >
              <Icon
                name='DocPlainTextFillIcon'
                className='size-4 text-icon-light group-hover:text-blue-500'
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
            View summary
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Expanded Queue List */}
      {queueSnapshot.length > 0 && (
        <ExpandableQueueList
          items={queueSnapshot}
          isExpanded={isExpanded}
          enableAutoScroll={false}
        />
      )}
    </div>
  );
}
