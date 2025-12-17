import { IconName } from "@/components/ui/icon";
import type { TrainingItemStatus } from "@/utils/training-status-helpers";
import { format, isToday, isYesterday, parseISO } from "date-fns";

/**
 * Get the color class for a given training status
 * @param status - The training status
 * @returns The Tailwind color class
 */
export function getStatusColor(status: TrainingItemStatus): string {
  switch (status) {
    case "completed":
      return "text-[#09CE6B]";
    case "training":
      return "text-[#3b82f6]";
    case "queued":
      return "text-[#8D8D86]";
    case "failed":
      return "text-orange-500";
    case "deleted":
      return "text-red-400";
    default:
      return "text-[#8D8D86]";
  }
}

/**
 * Format a date string to a human readable label
 * @param dateString - The date string to format
 * @returns The formatted date label
 */
export function formatDateLabel(dateString: string): string {
  const date = parseISO(dateString);
  if (isToday(date)) {
    return "Today";
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  return format(date, "MMM dd, yyyy");
}

/**
 * Get the icon for a given training status
 * @param status - The training status
 * @returns The icon name
 */
export function getStatusIcon(status: TrainingItemStatus): IconName {
  switch (status) {
    case "completed":
      return "CheckedCircleFillIcon";
    case "training":
      return "LoaderCircleIcon";
    case "queued":
      return "CircleDashedIcon";
    case "failed":
      return "ExclamationmarkTriangleFillIcon";
    case "deleted":
      return "TrashFillIcon";
    default:
      return "CircleDashedIcon";
  }
}
