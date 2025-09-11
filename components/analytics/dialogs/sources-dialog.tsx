"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SourceListItem } from "@/components/analytics/source-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SourcesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended source data
const allSources = [
  { id: 1, name: "Influence", citation: 324 },
  { id: 2, name: "Design Systems Handbook", citation: 298 },
  { id: 3, name: "User Experience Research", citation: 276 },
  { id: 4, name: "Material Design Guidelines", citation: 254 },
  { id: 5, name: "Human Interface Guidelines", citation: 232 },
  { id: 6, name: "Web Content Accessibility", citation: 210 },
  { id: 7, name: "Responsive Web Design", citation: 198 },
  { id: 8, name: "Don't Make Me Think", citation: 186 },
  { id: 9, name: "The Design of Everyday Things", citation: 174 },
  { id: 10, name: "Atomic Design", citation: 162 },
  { id: 11, name: "About Face", citation: 150 },
  { id: 12, name: "Universal Principles of Design", citation: 138 },
  { id: 13, name: "The Elements of User Experience", citation: 126 },
  { id: 14, name: "100 Things Every Designer Needs", citation: 114 },
  { id: 15, name: "Lean UX", citation: 102 },
  { id: 16, name: "Sprint", citation: 90 },
  { id: 17, name: "Hooked", citation: 78 },
  { id: 18, name: "Design for the Real World", citation: 66 },
  { id: 19, name: "The Visual Display of Information", citation: 54 },
  { id: 20, name: "Emotional Design", citation: 42 },
];

export function SourcesDialog({
  open,
  onOpenChange,
}: SourcesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Popular Sources</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="flex flex-col gap-0.5">
            {allSources.map((source) => (
              <SourceListItem
                key={source.id}
                name={source.name}
                citation={source.citation}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}