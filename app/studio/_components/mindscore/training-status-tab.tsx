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
import { TrainingQueueItem } from "./training-queue-item";
import { isFinishedStatus } from "./training-status-utils";

export type TrainingStatus =
  | "queued"
  | "training"
  | "failed"
  | "completed"
  | "deleting";

export interface TrainingItem {
  id: string;
  name: string;
  type: string;
  trainedAt: string; // ISO date string
  status: TrainingStatus;
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
  const [selectedStatus, setSelectedStatus] = useState<TrainingStatus | "all">(
    "all"
  );
  const [showCompletedStatus, setShowCompletedStatus] = useState(false);
  const [queueSnapshot, setQueueSnapshot] = useState<QueueItem[]>([]);
  const { finishedCount, totalCount } = useTrainingStatus();
  // Detect completion and handle state transitions
  useEffect(() => {
    // Check if all items are done processing (either completed, failed, or deleting)
    const allDone =
      queue.length > 0 &&
      queue.every((item: QueueItem) => isFinishedStatus(item.status));

    // Completion Detection: When all items are done and no active items
    if (allDone && !hasActiveItems) {
      // Capture queue snapshot (all items with final states: completed, failed, deleting)
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

  const statusFilters: Array<{ value: TrainingStatus | "all"; label: string }> =
    [
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
      {/* Active training queue */}
      {(hasActiveItems || showCompletedStatus) && (
        <div className='flex flex-col gap-3 mt-4'>
          {/* Active Training Queue Header */}
          <div className='text-[13px] font-medium text-text-muted dark:text-neutral-500 px-3 flex items-center justify-between gap-0.5 tracking-tight'>
            <div className='flex items-center gap-2 w-full justify-between'>
              <div className='flex items-center gap-0.5'>
                <Icon
                  name={
                    showCompletedStatus
                      ? "GaugeWithDotsNeedle67PercentIcon"
                      : "LoaderCircleIcon"
                  }
                  className={cn(
                    "size-4.5",
                    showCompletedStatus
                      ? "text-neutral-400"
                      : "text-icon-light mr-0.5",
                    !showCompletedStatus && "animate-spin"
                  )}
                />
                <span
                  className={cn(showCompletedStatus && "text-text-primary")}
                >
                  {showCompletedStatus
                    ? `Training completed!`
                    : `Learning ${finishedCount} / ${totalCount}`}
                </span>
              </div>
              {showCompletedStatus && (
                <>
                  <Button
                    variant='glossy'
                    size='sm'
                    onClick={() => setShowCompletedStatus(false)}
                    className='text-[12px] shadow-md shrink-0 h-7 has-[>svg]:px-2.5 has-[>svg]:pr-1.5 gap-1 rounded-md'
                  >
                    <span className='text-[12px]'>View summary</span>
                    <Icon
                      name='ArrowForwardIcon'
                      className='size-4 text-white'
                    />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Active Training Queue List */}
          <div className='bg-light dark:bg-[#1A1A1A] rounded-xl py-3 mb-4 px-2'>
            <div className='flex flex-col gap-0.5 w-full'>
              {(showCompletedStatus ? queueSnapshot : queue).map(
                (item: QueueItem) => (
                  <TrainingQueueItem
                    key={item.id}
                    item={item}
                    docIconSize='size-5'
                    fontSize='text-[14px]'
                    containerClassName='hover:bg-extra-light/100 rounded-md py-1'
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Training Summary - Only show when idle (not training and not showing completion) */}
      {!hasActiveItems && !showCompletedStatus && (
        <div className='flex flex-col gap-3 mt-4'>
          <div className='text-[13px] font-medium text-text-muted dark:text-neutral-500 px-3 flex items-center gap-0.5 tracking-tight'>
            <Icon
              name='SquareTextSquareFillIcon'
              className='size-4.5 text-icon-light'
            />
            Summary
          </div>
          <div className='bg-light dark:bg-[#1A1A1A] rounded-xl py-3.5 pb-4 mb-4'>
            <div className='flex flex-col gap-2 px-3 mb-0'>
              <div className='flex flex-col gap-2 mb-5'>
                <h1 className='text-start  text-text-primary px-1 text-sm'>
                  Here is what happend from your last training at{" "}
                  <span className='font-semibold'>Nov 17, 2025</span>:
                </h1>
                <div className='px-2 py-2 bg-extra-light dark:bg-[#2C2C2A] rounded-xl text-text-secondary shadow-xs w-full flex flex-col gap-1.5'>
                  <div className='flex items-center gap-0.5'>
                    <Icon
                      name='MindBubbleFillIcon'
                      className='size-5 text-orange-400'
                    />
                    <span className='text-text-secondary font-semibold'>
                      {summaryStats.totalTrained}
                    </span>{" "}
                    items were trained.
                  </div>
                  <div className='flex items-center gap-0.5'>
                    <Icon
                      name='ArrowshapeUpFillIcon'
                      className='size-5 text-neutral-400'
                    />
                    <span className='text-text-secondary font-semibold'>
                      130
                    </span>{" "}
                    mind score has increased.
                  </div>

                  <div className='flex items-center gap-0.5'>
                    <Icon
                      name='CheckedCircleFillIcon'
                      className='size-5 text-green-600'
                    />
                    <span className='text-text-secondary font-semibold'>
                      {summaryStats.completed}
                    </span>{" "}
                    items completed.
                  </div>
                  <div className='flex items-center gap-0.5'>
                    <Icon
                      name='ExclamationmarkTriangleFillIcon'
                      className='size-5 text-orange-500'
                    />
                    <span className='text-text-secondary font-semibold'>
                      {summaryStats.failed}
                    </span>{" "}
                    items failed and needs actions.
                  </div>
                </div>
              </div>
              <h1 className='text-start  text-text-primary px-1 text-sm'>
                Your mind can now answer 5 new questions!
              </h1>
              <div className='flex flex-wrap gap-1'>
                {[
                  "What is your latest hobby?",
                  "How did you get into product design?",
                  "What is your favorite AI tool?",
                  "What are you working on right now?",
                  "What is next for you?",
                ].map((question) => (
                  <div
                    key={question}
                    className='px-2 py-1 bg-extra-light dark:bg-[#2C2C2A] rounded-lg text-text-secondary shadow-xs w-fit cursor-pointer opacity-100 hover:opacity-80 hover:bg-white hover:translate-y-[-1px] transition-all duration-100 ease-in'
                  >
                    &quot;{question}&quot;
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
                setSelectedStatus(value as TrainingStatus | "all")
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
