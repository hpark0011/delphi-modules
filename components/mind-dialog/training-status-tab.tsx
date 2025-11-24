"use client";

import { mockTrainingItems } from "@/app/studio/_lib/mock-training-items";
import {
  formatDateLabel,
  getStatusIcon,
} from "@/app/studio/_utils/mind-dialog-helpers";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTrainingQueue, type QueueItem } from "@/hooks/use-training-queue";
import { useTrainingStatus } from "@/hooks/use-training-status";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import {
  type TrainingItemStatus,
  isFinishedItemStatus,
  getTrainingQueueStatus,
  // Legacy exports for backward compatibility
  type TrainingStatus,
} from "./training-status-utils";
import { ActiveTrainingQueue } from "./active-training-queue";
import { TrainingSummary } from "./training-summary";

// Re-export for backward compatibility
export type { TrainingItemStatus as TrainingStatus };

export interface TrainingItem {
  id: string;
  name: string;
  type: string;
  trainedAt: string; // ISO date string
  status: TrainingItemStatus;
}

function DateGroupTable({
  dateKey,
  items,
  columns,
  showHeader = false,
}: {
  dateKey: string;
  items: TrainingItem[];
  columns: ColumnDef<TrainingItem>[];
  showHeader?: boolean;
}) {
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className='flex flex-col gap-1.5'>
      <h3 className='text-[13px] font-medium text-text-muted dark:text-neutral-500 px-2'>
        {formatDateLabel(dateKey)}
      </h3>
      <Table className='table-fixed w-full'>
        {showHeader && (
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-10 px-2 text-left align-middle font-medium text-sm text-[#8D8D86] dark:text-neutral-500",
                      header.id === "name" && "w-[70%]",
                      header.id === "status" && "w-[20%]",
                      header.id === "actions" && "w-[10%] text-right"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        )}
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className='hover:bg-[#F6F6F5] dark:hover:bg-[#2C2C2A] border-b-transparent'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "px-2 py-1 align-middle",
                      cell.column.id === "name" &&
                        "w-[70%] rounded-l-sm overflow-hidden",
                      cell.column.id === "status" && "w-[20%]",
                      cell.column.id === "actions" &&
                        "w-[10%] text-right rounded-r-sm"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export function TrainingStatusTab() {
  const { queue } = useTrainingQueue();
  const { hasActiveItems } = useTrainingStatus();
  const [selectedStatus, setSelectedStatus] = useState<
    TrainingItemStatus | "all"
  >("all");
  const [showCompletedStatus, setShowCompletedStatus] = useState(false);
  const [queueSnapshot, setQueueSnapshot] = useState<QueueItem[]>([]);
  const { finishedCount, totalCount } = useTrainingStatus();

  // Determine queue status based on queue state and user review
  // showCompletedStatus = true means user has NOT reviewed (showing completion message)
  // getTrainingQueueStatus expects hasUserReviewed (opposite), so we negate it
  const queueStatus = getTrainingQueueStatus(queue, !showCompletedStatus);

  // Detect completion and handle state transitions
  useEffect(() => {
    // Check if all items are done processing (either completed, failed, or deleted)
    const allDone =
      queue.length > 0 &&
      queue.every((item: QueueItem) => isFinishedItemStatus(item.status));

    // Completion Detection: When all items are done and no active items
    if (allDone && !hasActiveItems) {
      // Capture queue snapshot (all items with final states: completed, failed, deleted)
      setQueueSnapshot([...queue]);
      setShowCompletedStatus(true);
    }

    // Reset on New Items: When new items are added during completion state
    if (queue.length > 0 && showCompletedStatus && hasActiveItems) {
      setShowCompletedStatus(false);
      setQueueSnapshot([]);
    }
  }, [queue, hasActiveItems, showCompletedStatus]);

  // Filter data based on selected status
  const filteredData = useMemo(() => {
    if (selectedStatus === "all") {
      return mockTrainingItems;
    }
    return mockTrainingItems.filter((item) => item.status === selectedStatus);
  }, [selectedStatus]);

  // Group data by date for display
  const groupedData = useMemo(() => {
    const groups = new Map<string, TrainingItem[]>();

    filteredData.forEach((item) => {
      const dateKey = format(parseISO(item.trainedAt), "yyyy-MM-dd");
      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }
      groups.get(dateKey)!.push(item);
    });

    // Sort items within each group
    groups.forEach((items) => {
      items.sort(
        (a, b) =>
          parseISO(b.trainedAt).getTime() - parseISO(a.trainedAt).getTime()
      );
    });

    // Convert to array and sort groups by date (newest first)
    const sortedGroups = Array.from(groups.entries()).sort(
      (a, b) => parseISO(b[0]).getTime() - parseISO(a[0]).getTime()
    );

    return sortedGroups;
  }, [filteredData]);

  // Define columns
  const columns = useMemo<ColumnDef<TrainingItem>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className='flex items-center gap-2 min-w-0 overflow-hidden'>
              <Icon
                name='DocFillIcon'
                className='size-5 flex-shrink-0 text-icon-light'
              />
              <span className='font-medium text-text-primary text-sm truncate min-w-0 flex-1'>
                {item.name}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className='flex items-center justify-center w-full'>
              <Icon
                name={getStatusIcon(item.status)}
                className={cn(
                  "size-5",
                  item.status === "completed"
                    ? "text-[#09CE6B]"
                    : item.status === "failed"
                      ? "text-orange-500"
                      : "text-[#8D8D86]"
                )}
              />
            </div>
          );
        },
      },

      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const item = row.original;
          if (item.status === "failed") {
            return (
              <div className='flex justify-end'>
                <Button
                  variant='outline'
                  size='sm'
                  className='text-[12px] shadow-none hover:text-text-primary shrink-0 h-6 px-2 rounded-sm'
                >
                  See detail
                </Button>
              </div>
            );
          }
          return null;
        },
      },
    ],
    []
  );

  const statusFilters: Array<{
    value: TrainingItemStatus | "all";
    label: string;
  }> = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "training", label: "Training" },
    { value: "queued", label: "Queued" },
    { value: "failed", label: "Failed" },
  ];

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const completed = mockTrainingItems.filter(
      (item) => item.status === "completed"
    ).length;
    const failed = mockTrainingItems.filter(
      (item) => item.status === "failed"
    ).length;
    // Total trained items (completed + failed, excluding queued/training)
    const totalTrained = completed + failed;

    // Items trained in past 24 hours
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
    const trainedLast24Hours = mockTrainingItems.filter(
      (item) => parseISO(item.trainedAt).getTime() >= twentyFourHoursAgo
    ).length;

    // Types of questions mind can answer (based on completed items)
    const completedTypes = new Set(
      mockTrainingItems
        .filter((item) => item.status === "completed")
        .map((item) => item.type)
    );
    const questionTypes = Array.from(completedTypes).join(", ");

    // Words left to train (mock: assume each completed item = ~500K words)
    const totalWords = 12000000; // 12M words
    const wordsTrained = completed * 500000; // Mock calculation
    const wordsLeft = Math.max(0, totalWords - wordsTrained);

    return {
      totalTrained,
      completed,
      failed,
      trainedLast24Hours,
      questionTypes: questionTypes || "None yet",
      wordsLeft,
      totalWords,
    };
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      {/* Active training queue - Show when queue is active or finished */}
      {(queueStatus === "active" || queueStatus === "finished") && (
        <ActiveTrainingQueue
          showCompletedStatus={showCompletedStatus}
          setShowCompletedStatus={setShowCompletedStatus}
          finishedCount={finishedCount}
          totalCount={totalCount}
          queueSnapshot={queueSnapshot}
        />
      )}

      {/* Training Summary - Only show when queue is dull (default state) */}
      {queueStatus === "dull" && (
        <TrainingSummary summaryStats={summaryStats} />
      )}

      {/* Data Table grouped by date */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-4 items-center justify-between mb-1'>
          <div className='text-[13px] font-medium text-text-muted dark:text-neutral-500 px-3 flex items-center gap-0.5 tracking-tight'>
            <Icon name='ClockFillIcon' className='size-4.5 text-icon-light' />
            Training History
          </div>
          {/* Filter Section */}
          <div className='flex items-center gap-1 flex-wrap px-2'>
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(value as TrainingItemStatus | "all")
              }
            >
              <SelectTrigger
                size='sm'
                className='data-[size=sm]:h-6 bg-transparent px-2 text-[12px] w-fit rounded-sm hover:bg-base gap-1.5'
              >
                <div className='flex items-center gap-2 pb-[1px]'>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {statusFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Training History Table */}
        <div className='flex flex-col gap-8 bg-light py-4 rounded-xl px-2'>
          {groupedData.length === 0 ? (
            <div className='flex items-center justify-center py-12 text-[#8D8D86] dark:text-neutral-500 px-2'>
              <p className='text-sm'>No training items found</p>
            </div>
          ) : (
            groupedData.map(([dateKey, items]) => (
              <DateGroupTable
                key={dateKey}
                dateKey={dateKey}
                items={items}
                columns={columns}
                showHeader={false}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
