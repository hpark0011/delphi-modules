"use client";

import { Icon } from "@/components/ui/icon";
import { useMindDialog } from "../mind-dialog";

export function LastTrainedDate() {
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
