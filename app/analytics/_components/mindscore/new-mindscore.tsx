"use client";

import React from "react";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { Icon } from "@/components/ui/icon";
import { MindDialog, useMindDialog } from "./mind-dialog";

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
      className='w-full flex flex-col gap-2 bg-black/10 relative cursor-pointer'
      onClick={() => openWithTab("knowledge")}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openWithTab("knowledge");
        }
      }}
    >
      {/* Progress Bar */}
      <div className='w-full  flex flex-col items-center gap-1 absolute top-0 left-0'>
        {/* Gauge */}
        <div className='w-[calc(100%-32px)] bg-[#000]/10 rounded-b-[6px] h-2'>
          <div
            className='bg-[#000] rounded-b-[6px] h-2 transition-all'
            style={{
              width: `${(mindScore.current / mindScore.total) * 100}%`,
            }}
          />
        </div>
        {/* Gauge Label */}
        <div className='w-full h-full flex items-center justify-between px-4'>
          <p className='text-sm font-medium'>{mindScore.level}</p>
          <p className='text-sm font-medium'>{mindScore.total}</p>
        </div>
      </div>

      {/* Mind Score Value */}
      <div className='flex flex-col gap-2 w-full justify-center items-center'>
        <div className='flex items-center justify-between h-[160px]'>
          <p className='font-medium text-center text-5xl tracking-tight'>
            {mindScore.current}
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
      className='w-full items-center flex justify-center p-2 gap-1 text-text-muted hover:text-blue-500 cursor-pointer'
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
      <div className='text-sm'>Last trained at Nov 17, 2025</div>
      <Icon name='ArrowUpRightIcon' className='size-4' />
    </div>
  );
}

export function NewMindscore({ mindScore }: MindScoreProps) {
  return (
    <AnalyticsSectionWrapper className='w-full p-0 rounded-[20px] flex flex-col items-center overflow-hidden'>
      <MindDialog defaultTab='training-status'>
        <MindScoreTrigger mindScore={mindScore} />
        <LastTrainedTrigger />
      </MindDialog>
    </AnalyticsSectionWrapper>
  );
}
