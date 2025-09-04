"use client";

import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AutoResizingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
  ref?: React.Ref<HTMLTextAreaElement>;
  placeholder?: string;
}

function AutoResizingTextarea({
  className,
  maxHeight = 300,
  onChange,
  ref,
  placeholder = "Type your message...",
  ...props
}: AutoResizingTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const combinedRef = useCombinedRefs(ref, textareaRef);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto";

    // Calculate the new height (capped at maxHeight)
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;

    // Enable/disable scrolling based on content height
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [maxHeight]);

  // Adjust height on content change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    adjustHeight();
  };

  // Adjust height on initial render and when props change
  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, props.value, props.defaultValue]);

  return (
    <textarea
      className={cn(
        "flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden transition-all duration-200 caret-blue-300",
        "focus-visible:ring-light focus-visible:ring-[2px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      onChange={handleChange}
      ref={combinedRef}
      rows={1}
      placeholder={placeholder}
      {...props}
    />
  );
}

// Helper to combine external refs with internal ref
function useCombinedRefs<T>(
  ...refs: Array<React.Ref<T> | React.RefObject<T> | null | undefined>
): React.RefCallback<T> {
  return React.useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(element);
        } else if (ref.hasOwnProperty("current")) {
          // Use type assertion to a more specific RefObject interface
          (ref as { current: T }).current = element;
        }
      });
    },
    [refs]
  );
}

AutoResizingTextarea.displayName = "AutoResizingTextarea";

export { AutoResizingTextarea };
