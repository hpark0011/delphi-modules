"use client";

import React, { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday, parseISO } from "date-fns";

export type TrainingStatus = "queued" | "training" | "failed" | "completed";

export interface TrainingItem {
  id: string;
  name: string;
  type: string;
  trainedAt: string; // ISO date string
  status: TrainingStatus;
}

interface GroupedTrainingItems {
  date: string;
  items: TrainingItem[];
}

// Mock data - replace with actual data fetching
const mockTrainingItems: TrainingItem[] = [
  {
    id: "1",
    name: "Product Documentation.pdf",
    type: "PDF",
    trainedAt: new Date().toISOString(),
    status: "completed",
  },
  {
    id: "2",
    name: "Company Handbook.docx",
    type: "Document",
    trainedAt: new Date().toISOString(),
    status: "training",
  },
  {
    id: "3",
    name: "API Reference.md",
    type: "Markdown",
    trainedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "failed",
  },
  {
    id: "4",
    name: "User Guide.pdf",
    type: "PDF",
    trainedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "completed",
  },
  {
    id: "5",
    name: "Training Materials.zip",
    type: "Archive",
    trainedAt: new Date(Date.now() - 172800000).toISOString(),
    status: "queued",
  },
  {
    id: "6",
    name: "Knowledge Base.txt",
    type: "Text",
    trainedAt: new Date(Date.now() - 172800000).toISOString(),
    status: "completed",
  },
];

function formatDateLabel(dateString: string): string {
  const date = parseISO(dateString);
  if (isToday(date)) {
    return "Today";
  }
  if (isYesterday(date)) {
    return "Yesterday";
  }
  return format(date, "MMM dd, yyyy");
}

function getStatusBadgeVariant(status: TrainingStatus): {
  variant: "default" | "secondary" | "destructive" | "outline";
  className?: string;
} {
  switch (status) {
    case "completed":
      return {
        variant: "default",
        className: "bg-[#09CE6B]/15 text-[#09CE6B] border-[#09CE6B]/30",
      };
    case "training":
      return {
        variant: "default",
        className: "bg-blue-500/15 text-blue-600 border-blue-500/30",
      };
    case "failed":
      return {
        variant: "destructive",
        className: "bg-destructive/15 text-destructive border-destructive/30",
      };
    case "queued":
      return {
        variant: "secondary",
        className: "bg-[#8D8D86]/15 text-[#8D8D86] border-[#8D8D86]/30",
      };
    default:
      return { variant: "outline" };
  }
}

function TrainingItemRow({ item }: { item: TrainingItem }) {
  const statusBadge = getStatusBadgeVariant(item.status);
  const formattedDate = format(parseISO(item.trainedAt), "MMM dd, yyyy");

  return (
    <div className='flex items-center justify-between px-1.5 hover:bg-[#F6F6F5] dark:hover:bg-[#2C2C2A] transition-colors'>
      <div className='flex items-center gap-3 flex-1 min-w-0'>
        <div className='flex flex-col flex-1 min-w-0'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-text-primary text-sm truncate'>
              {item.name}
            </span>
            <Badge
              variant={statusBadge.variant}
              className={cn(
                "text-xs font-medium shrink-0",
                statusBadge.className
              )}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          </div>
          <div className='flex items-center gap-2 mt-0.5'>
            <span className='text-[13px] text-[#8D8D86] dark:text-neutral-500'>
              {item.type}
            </span>
          </div>
        </div>
      </div>
      {item.status === "failed" && (
        <Button
          variant='ghost'
          size='sm'
          className='ml-2 text-[13px] text-[#8D8D86] hover:text-text-primary shrink-0'
        >
          See detail
        </Button>
      )}
    </div>
  );
}

export function TrainingStatusTab() {
  const [selectedStatus, setSelectedStatus] = useState<TrainingStatus | "all">(
    "all"
  );

  // Group items by date
  const groupedItems = useMemo(() => {
    const filtered =
      selectedStatus === "all"
        ? mockTrainingItems
        : mockTrainingItems.filter((item) => item.status === selectedStatus);

    // Group by date (same day)
    const grouped: GroupedTrainingItems[] = [];
    const dateMap = new Map<string, TrainingItem[]>();

    filtered.forEach((item) => {
      const dateKey = format(parseISO(item.trainedAt), "yyyy-MM-dd");
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, []);
      }
      dateMap.get(dateKey)!.push(item);
    });

    // Convert to array and sort by date (newest first)
    dateMap.forEach((items, dateKey) => {
      grouped.push({
        date: dateKey,
        items: items.sort(
          (a, b) =>
            parseISO(b.trainedAt).getTime() - parseISO(a.trainedAt).getTime()
        ),
      });
    });

    // Sort groups by date (newest first)
    grouped.sort(
      (a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()
    );

    return grouped;
  }, [selectedStatus]);

  const statusFilters: Array<{ value: TrainingStatus | "all"; label: string }> =
    [
      { value: "all", label: "All" },
      { value: "completed", label: "Completed" },
      { value: "training", label: "Training" },
      { value: "queued", label: "Queued" },
      { value: "failed", label: "Failed" },
    ];

  return (
    <div className='flex flex-col gap-4'>
      {/* Filter Section */}
      <div className='flex items-center gap-2 flex-wrap'>
        {statusFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={selectedStatus === filter.value ? "default" : "outline"}
            size='sm'
            onClick={() => setSelectedStatus(filter.value)}
            className={cn(
              "h-8 px-3 text-[13px] rounded-full",
              selectedStatus === filter.value &&
                "bg-primary text-primary-foreground"
            )}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Training Items List */}
      <div className='flex flex-col gap-6'>
        {groupedItems.length === 0 ? (
          <div className='flex items-center justify-center py-12 text-[#8D8D86] dark:text-neutral-500'>
            <p className='text-sm'>No training items found</p>
          </div>
        ) : (
          groupedItems.map((group) => (
            <div key={group.date} className='flex flex-col gap-2'>
              <h3 className='text-sm font-medium text-[#8D8D86] dark:text-neutral-500 px-1'>
                {formatDateLabel(group.date)}
              </h3>
              <div className='flex flex-col overflow-hidden'>
                {group.items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <TrainingItemRow item={item} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
