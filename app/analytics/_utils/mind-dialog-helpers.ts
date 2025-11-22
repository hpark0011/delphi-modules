import { IconName } from "@/components/ui/icon";
import { TrainingStatus } from "../_components/mindscore/training-status-tab";
import { format, isToday, isYesterday, parseISO } from "date-fns";

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
export function getStatusIcon(status: TrainingStatus): IconName {
  switch (status) {
    case "completed":
      return "CheckedCircleFillIcon";
    case "training":
      return "LoaderCircleIcon";
    case "queued":
      return "CircleDashedIcon";
    case "failed":
      return "ExclamationmarkTriangleFillIcon";
    case "deleting":
      return "TrashFillIcon";
    default:
      return "CircleDashedIcon";
  }
}
