"use client";

import { Icon } from "@/components/ui/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { QueueItem } from "@/hooks/use-training-queue";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useMindDialog } from "../../../../../components/mind-dialog/mind-dialog";
import { ExpandableQueueList } from "./expandable-queue-list";
import MindStatusNotification from "@/components/mind-status-notification";
import { SCORE_PER_ITEM } from "../../../_constants/training-queue";

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

  // Calculate total score increase based on completed items
  const totalScoreIncrease = completedCount * SCORE_PER_ITEM;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className='w-full relative'>
      <div className='w-full items-center flex justify-center p-2 py-1.5 pr-[4px] gap-1 text-text-tertiary cursor-pointer rounded-full'>
        <div
          className='flex items-center gap-1 relative py-0.5 px-2 bg w-full pl-[3px] group hover:opacity-70'
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
        <div className='text-xs dark:bg-black text-text-muted flex items-center gap-1 mr-0'>
          {/* Completed items */}
          {completedCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='text-green-500 min-w-[18px] text-center  cursor-default flex items-center'>
                  <Icon name='CheckedCircleFillIcon' className='size-5' />
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
            <button
              className='mr-1 flex items-center gap-1 cursor-pointer group hover:bg-black/5 rounded-sm px-1.5 pl-1 py-0.5'
              onClick={() => {
                setShowCompletedStatus(false);
                openWithTab("training-status");
              }}
              role='button'
            >
              <MindStatusNotification status='finished' />
              {/* Increased mind score */}
              <span className='text-[12px] font-medium text-text-muted'>
                +{totalScoreIncrease}
              </span>
              {/* <Icon
                name='DocPlainTextFillIcon'
                className='size-4.5 min-w-4.5 text-icon-light group-hover:text-blue-500'
              /> */}
            </button>
          </TooltipTrigger>
          <TooltipContent className='shadow-[0_0_0_1px_rgba(255,255,255,0.05)]'>
            New mind ready!
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
