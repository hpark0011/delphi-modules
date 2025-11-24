import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { cn } from "@/lib/utils";

interface MindStatusNotificationProps {
  className?: string;
  status: "active" | "finished" | "dull";
}

export default function MindStatusNotification({
  className,
  status,
}: MindStatusNotificationProps) {
  const isActive = status === "active";
  const isFinished = status === "finished";
  // const isDull = status === "dull";

  return (
    <div className='relative flex items-center justify-center'>
      <div className='relative inline-block'>
        <BrainIcon
          className={cn(
            "size-4 text-icon-light group-hover:text-blue-500",
            className
          )}
        />
        {isActive && <div className='brain-shimmer' />}
        {isFinished && <div className='brain-glow' />}
      </div>

      {/* Notification Dot */}
      {isFinished && (
        <div className='absolute top-[-1px] right-[-1px] w-[7px] h-[7px] bg-red-600/80 rounded-full shadow-[0_0_0_1px_var(--color-light)]' />
      )}
    </div>
  );
}
