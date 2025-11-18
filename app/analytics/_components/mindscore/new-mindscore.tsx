"use client";

import React from "react";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { MindDialog, useMindDialog } from "./mind-dialog";
import { MindProgressBar } from "./mind-progress-bar";

interface MindScoreProps {
  mindScore: {
    current: number;
    total: number;
    level: string;
  };
}

function MindScoreTrigger({
  mindScore,
}: {
  mindScore: MindScoreProps["mindScore"];
}) {
  const { openWithTab } = useMindDialog();

  return (
    <div
      className='w-full flex flex-col gap-2 relative cursor-pointer rounded-[18px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.3),0_1px_1px_0_rgba(0,0,0,0.15)] overflow-hidden bg-black/87 border border-white/20 hover:bg-black/84 dark:border-white/3 dark:bg-black/40'
      onClick={() => openWithTab("add-knowledge")}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openWithTab("add-knowledge");
        }
      }}
    >
      {/* Progress Bar */}
      <MindProgressBar current={mindScore.current} total={mindScore.total} />

      {/* Mind Score Value */}
      <div className='flex flex-col gap-2 w-full justify-center items-center relative z-10'>
        <div className='flex flex-col items-center justify-center h-[160px] text-white gap-0.5'>
          <p className='font-medium text-center text-6xl tracking-tighter'>
            {mindScore.current}
          </p>
          <p className='text-sm font-medium text-center text-text-muted'>
            {mindScore.level}
          </p>
        </div>
      </div>
    </div>
  );
}

function LastTrainedTrigger() {
  const { openWithTab } = useMindDialog();

  return (
    <div
      className='w-full items-center flex justify-center p-2 gap-1 text-text-muted hover:text-blue-400 cursor-pointer'
      onClick={() => openWithTab("training-status")}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openWithTab("training-status");
        }
      }}
    >
      <div className='text-[13px]'>Last trained at Nov 17, 2025</div>
      <Icon name='ArrowUpRightIcon' className='size-4' />
    </div>
  );
}

export function NewMindscore({ mindScore }: MindScoreProps) {
  return (
    <AnalyticsSectionWrapper className='w-full p-0.5 rounded-[20px] flex flex-col items-center overflow-hidden'>
      <MindDialog defaultTab='training-status'>
        <MindScoreTrigger mindScore={mindScore} />
        <LastTrainedTrigger />
      </MindDialog>
    </AnalyticsSectionWrapper>
  );
}
