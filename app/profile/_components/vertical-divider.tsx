import { cn } from "@/lib/utils";

export function VerticalDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-7 w-[1.5px] rounded-full bg-sand-10/10", className)}
    />
  );
}
