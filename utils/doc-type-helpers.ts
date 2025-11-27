import type { IconName } from "@/components/ui/icon";
import type { TrainingDocType } from "@/components/mind-dialog/training-queue-context";

export const DOC_TYPE_ICON_MAP: Record<TrainingDocType, IconName> = {
  interview: "MicFillIcon",
  youtube: "YoutubeIcon",
  x: "XIcon",
  website: "GlobeIcon",
  podcast: "DocFillIcon",
  file: "DocFillIcon",
  generic: "DocFillIcon",
};

export function getDocTypeIcon(docType: TrainingDocType): IconName {
  return DOC_TYPE_ICON_MAP[docType] ?? "DocFillIcon";
}
