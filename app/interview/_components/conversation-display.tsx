"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export function ConversationDisplay({
  title,
  messages,
  onSkip,
  className,
}: ConversationDisplayProps) {
  const hasUnansweredQuestion =
    messages.length > 0 && messages[messages.length - 1].type === "question";

  return (
    <div className={cn("flex flex-col items-center justify-center px-8 py-16", className)}>
      <div className="max-w-3xl w-full space-y-8">
        <h1 className="text-5xl font-serif text-center">{title}</h1>

        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "text-lg leading-relaxed",
                message.type === "question" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>

        {hasUnansweredQuestion && onSkip && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip
            </Button>
          </div>
        )}
      </div>

      <div className="absolute bottom-32 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </div>
  );
}
