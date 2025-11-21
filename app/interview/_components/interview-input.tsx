"use client";

import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, Keyboard, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutoResizingTextarea } from "@/components/ui/auto-resizing-textarea";
import { LoadingCircleIcon } from "@/delphi-ui/icons/LoadingCircle";
import { StopIcon } from "@/delphi-ui/icons/Stop";
import { MicrophoneOnIcon } from "@/delphi-ui/icons/MicrophoneOn";
import { cn } from "@/lib/utils";
import { useTrainingQueue } from "@/hooks/use-training-queue";

interface InterviewInputProps {
  onSubmit?: (text: string) => void;
  onVoiceRecord?: () => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
  recording?: boolean;
  disabled?: boolean;
}

export function InterviewInput({
  onSubmit,
  onVoiceRecord,
  placeholder = "Start typing or tap space to record...",
  className,
  isLoading = false,
  recording = false,
  disabled = false,
}: InterviewInputProps) {
  const [input, setInput] = useState("");
  const { addToQueue } = useTrainingQueue();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addToQueue([{ name: input.trim(), docType: "interview" }]);
      onSubmit?.(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " && input === "") {
      e.preventDefault();
      onVoiceRecord?.();
    }
    // Submit on Enter, new line on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        addToQueue([{ name: input.trim(), docType: "interview" }]);
        onSubmit?.(input);
        setInput("");
      }
    }
  };

  return (
    <div
      className={cn("bg-background max-w-[792px] mx-auto w-full", className)}
    >
      <div className='max-w-[792px] w-full mx-auto px-8 pb-4 py-0 relative'>
        {/* <div className='relative bg-light rounded-full p-2.5 w-fit mx-auto mb-4'>
          <ArrowDownIcon className='size-4 text-icon-dark dark:text-white' />
        </div> */}
        <form onSubmit={handleSubmit} className='relative'>
          <AutoResizingTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxHeight={200}
            rows={3}
            disabled={disabled || isLoading}
            className='bg-light rounded-[14px] px-4 py-3 pr-14 text-text-primary text-[16px] border-none focus-visible:ring-0 placeholder:text-text-muted w-full'
          />

          {input.trim() ? (
            <Button
              type='submit'
              className='absolute right-2 bottom-2 rounded-full h-8 w-8 hover:opacity-70 bg-black/10 dark:bg-medium'
              disabled={isLoading}
              size='icon'
            >
              {isLoading ? (
                <LoadingCircleIcon className='size-4 animate-spin' />
              ) : (
                <ArrowUpIcon className='size-4 text-black dark:text-white' />
              )}
            </Button>
          ) : (
            <Button
              type='button'
              size='icon'
              onClick={onVoiceRecord}
              disabled={isLoading}
              className='absolute right-2 bottom-2 rounded-full h-8 w-8 hover:bg-accent'
            >
              {isLoading ? (
                <LoadingCircleIcon className='size-4 animate-spin' />
              ) : recording ? (
                <StopIcon className='size-4' />
              ) : (
                <MicrophoneOnIcon className='size-4' />
              )}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
