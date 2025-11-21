"use client";

import React from "react";
import { useMindDialog } from "@/app/analytics/_components/mindscore/mind-dialog";

export function MindWidgetSmall() {
  const { openWithTab } = useMindDialog();

  const handleClick = () => {
    openWithTab("add-knowledge");
  };

  return (
    <div className='flex items-center p-0.5 bg-light rounded-full hover:scale-108 transition-all duration-200'>
      {/* Mindscore Wrapper */}
      <div
        onClick={handleClick}
        className='flex flex-col gap-2 relative cursor-pointer rounded-[18px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.3),0_1px_1px_0_rgba(0,0,0,0.15)] overflow-hidden bg-black/87 border border-white/20 hover:bg-black/84 dark:border-white/3 dark:bg-black/40 w-fit h-fit px-2.5 py-1'
      >
        {/* Mindscore Value */}
        <span className='text-text-primary-inverse text-[14px] font-semibold'>
          112
        </span>
      </div>
    </div>
  );
}
