import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { cn } from "@/lib/utils";
import type { TrainingStatus } from "@/components/mind-dialog/training-status-tab";

interface MindStatusNotificationProps {
  className?: string;
  status: TrainingStatus;
}

export default function MindStatusNotification({
  className,
  status,
}: MindStatusNotificationProps) {
  const isTraining = status === "training";

  return (
    <div className='relative flex items-center justify-center'>
      <div className='relative inline-block'>
        <BrainIcon
          className={cn(
            "size-4 text-icon-light group-hover:text-blue-500",
            className
          )}
        />
        {isTraining && <div className='brain-shimmer' />}
      </div>

      {/* Notification Dot */}
      {status === "completed" && (
        <div className='absolute top-[-1px] right-[-1px] w-[7px] h-[7px] bg-red-600/80 rounded-full shadow-[0_0_0_1px_var(--color-light)]' />
      )}
    </div>
  );
}
