"use client";

import { useState } from "react";
import { Mic, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InterviewInputProps {
  onSubmit?: (text: string) => void;
  onVoiceRecord?: () => void;
  placeholder?: string;
  className?: string;
}

export function InterviewInput({
  onSubmit,
  onVoiceRecord,
  placeholder = "Start typing or tap space to record...",
  className,
}: InterviewInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit?.(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " && input === "") {
      e.preventDefault();
      onVoiceRecord?.();
    }
  };

  return (
    <div className={cn("border-t border-border bg-background", className)}>
      <div className="max-w-3xl mx-auto px-8 py-6">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-accent/50 rounded-full px-6 py-4 pr-14 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onVoiceRecord}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-background hover:bg-accent"
          >
            <Mic className="h-5 w-5" />
          </Button>
        </form>

        <div className="absolute bottom-4 right-8">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full opacity-50 hover:opacity-100"
          >
            <Keyboard className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
