"use client";

import { Button } from "@/components/ui/button";
import { ExitIcon } from "@/delphi-ui/icons/Exit";
import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";

interface InterviewHeaderProps {
  onExit?: () => void;
  hasResponses?: boolean;
}

export function InterviewHeader({
  onExit,
  hasResponses = false,
}: InterviewHeaderProps) {
  return (
    <header className='bg-background'>
      <div className='flex items-center justify-between px-3 h-13'>
        <div className='flex-1' />

        {/* Desktop: Show "Interview" title */}
        <MindWidgetSmall />
        {/* <h1 className='text-sm font-medium hidden md:block'>Interview</h1> */}

        {/* Save & Exit button - right aligned */}
        <div className='flex-1 flex justify-end'>
          <Button
            size='sm'
            onClick={onExit}
            className='gap-1 rounded-full h-7 has-[>svg]:px-3'
          >
            <ExitIcon className='size-4' />
            {hasResponses ? "Save & Exit" : "Exit"}
          </Button>
        </div>
      </div>
    </header>
  );
}
