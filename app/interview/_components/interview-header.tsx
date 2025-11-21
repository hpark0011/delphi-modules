"use client";

import { Button } from "@/components/ui/button";
import { ExitIcon } from "@/delphi-ui/icons/Exit";

interface InterviewHeaderProps {
  onExit?: () => void;
}

export function InterviewHeader({ onExit }: InterviewHeaderProps) {
  return (
    <header className='border-b border-border bg-background'>
      <div className='flex items-center justify-between px-3 h-12'>
        <div className='flex-1' />

        {/* Desktop: Show "Interview" title */}
        <h1 className='text-sm font-medium hidden md:block'>Interview</h1>

        {/* Save & Exit button - right aligned */}
        <div className='flex-1 flex justify-end'>
          <Button
            size='sm'
            onClick={onExit}
            className='gap-1 rounded-full h-7 has-[>svg]:px-3'
          >
            <ExitIcon className='size-4' />
            Exit
          </Button>
        </div>
      </div>
    </header>
  );
}
