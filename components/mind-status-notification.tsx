import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { cn } from "@/lib/utils";

interface MindStatusIconProps {
  className?: string;
  status: "active" | "finished" | "dull";
}

export function MindStatusIcon({ className, status }: MindStatusIconProps) {
  const isActive = status === "active";
  const isFinished = status === "finished";
  // const isDull = status === "dull";

  return (
    <div className='relative flex items-center justify-center'>
      <div className='relative inline-block'>
        <BrainIcon
          className={cn(
            "size-4 text-sand-6 group-hover:text-blue-500 dark:text-white/50",
            className
          )}
        />
        {isActive && <div className='brain-shimmer' />}
        {isFinished && <div className='brain-glow' />}
      </div>

      {/* Notification Dot */}
      {isFinished && (
        <div className='absolute top-[-1px] right-[-1px] w-[7px] h-[7px] bg-red-600/80 rounded-full z-10' />
      )}
    </div>
  );
}
