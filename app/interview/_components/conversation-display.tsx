"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SkipIcon } from "@/delphi-ui/icons/Skip";

export interface Message {
  id: string;
  type: "question" | "answer";
  content: string;
}

interface ConversationDisplayProps {
  title: string;
  messages: Message[];
  onSkip?: () => void;
  className?: string;
  isLoading?: boolean;
}

function TypingIndicator() {
  return (
    <div className='flex items-center gap-0.5 text-muted-foreground py-2'>
      <span className='w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0ms]' />
      <span className='w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:150ms]' />
      <span className='w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:300ms]' />
    </div>
  );
}

export function ConversationDisplay({
  title,
  messages,
  onSkip,
  className,
  isLoading = false,
}: ConversationDisplayProps) {
  const hasUnansweredQuestion =
    messages.length > 0 && messages[messages.length - 1].type === "question";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-8 py-20 pt-[120px]",
        className
      )}
    >
      <div className='max-w-[720px] w-full space-y-7'>
        <h1 className='text-3xl text-center'>{title}</h1>

        <div className='space-y-4'>
          <div className='space-y-6'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "text-[16px] leading-relaxed",
                  message.type === "question"
                    ? "text-text-primary"
                    : "text-muted-foreground border-l-2 border-muted-foreground/30 pl-4 pb-[1px]"
                )}
              >
                {message.content}
              </div>
            ))}
            {isLoading && <TypingIndicator />}
          </div>

          {hasUnansweredQuestion && onSkip && !isLoading && (
            <div className='flex justify-end'>
              <Button
                variant='ghost'
                size='sm'
                onClick={onSkip}
                className='text-text-tertiary rounded-full h-7'
              >
                <SkipIcon className='size-4 mr-[1px] text-icon-extra-light' />
                <span className='pb-[1px]'>Skip</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
