"use client";

import { Icon } from "@/components/ui/icon";
import { useMindDialog } from "../../../../../components/mind-dialog/mind-dialog";

export function LastTrainedDate() {
  const { openWithTab } = useMindDialog();

  return (
    <div
      className='w-full items-center flex justify-center p-2 gap-1 text-text-muted hover:text-blue-500 cursor-pointer group'
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
      <div className='mr-1 flex items-center gap-0.5 cursor-pointer group'>
        <Icon
          name='DocPlainTextFillIcon'
          className='size-4.5 text-icon-light group-hover:text-blue-500'
        />
      </div>
    </div>
  );
}
