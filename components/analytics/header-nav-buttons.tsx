"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type HeaderNavButtonsProps = {
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
  buttonClassName?: string;
  ariaLabelPrev?: string;
  ariaLabelNext?: string;
  disabledPrev?: boolean;
  disabledNext?: boolean;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

export function HeaderNavButtons({
  onPrev,
  onNext,
  className,
  buttonClassName,
  ariaLabelPrev,
  ariaLabelNext,
  disabledPrev,
  disabledNext,
  ...rest
}: HeaderNavButtonsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)} {...rest}>
      <button
        type='button'
        aria-label={ariaLabelPrev ?? "Previous"}
        onClick={onPrev}
        disabled={disabledPrev}
        className={cn(
          "hover:bg-[#EBEBE9] rounded-[8px] p-1 disabled:opacity-50 disabled:cursor-not-allowed",
          buttonClassName
        )}
      >
        <ChevronLeft className='size-4 text-[#8D8D86]' />
      </button>
      <button
        type='button'
        aria-label={ariaLabelNext ?? "Next"}
        onClick={onNext}
        disabled={disabledNext}
        className={cn(
          "hover:bg-[#EBEBE9] rounded-[8px] p-1 disabled:opacity-50 disabled:cursor-not-allowed",
          buttonClassName
        )}
      >
        <ChevronRight className='size-4 text-[#8D8D86]' />
      </button>
    </div>
  );
}
