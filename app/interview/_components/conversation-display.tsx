"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "@/delphi-ui/icons/ArrowDown";
import { cn } from "@/lib/utils";
import { SkipForward } from "lucide-react";

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
    <div className='flex items-center gap-1 text-muted-foreground py-2'>
      <span className='w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0ms]' />
      <span className='w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:150ms]' />
      <span className='w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:300ms]' />
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
        "flex flex-col items-center justify-center px-8 py-16",
        className
      )}
    >
      <div className='max-w-3xl w-full space-y-8'>
        <h1 className='text-3xl text-center'>{title}</h1>

        <div className='space-y-6'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "text-lg leading-relaxed",
                message.type === "question"
                  ? "text-foreground"
                  : "text-muted-foreground border-l-2 border-muted-foreground/30 pl-4"
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
              className='text-muted-foreground hover:text-foreground'
            >
              <SkipForward className='h-4 w-4 mr-2' />
              Skip
            </Button>
          </div>
        )}
      </div>

      <div className='absolute bottom-36 bg-light rounded-full p-2.5'>
        <ArrowDownIcon className='size-4 text-white' />
      </div>
    </div>
  );
}
