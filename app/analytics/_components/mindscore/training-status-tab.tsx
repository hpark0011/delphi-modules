"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday, parseISO } from "date-fns";
import { Icon } from "@/components/ui/icon";

export type TrainingStatus = "queued" | "training" | "failed" | "completed";

export interface TrainingItem {
  id: string;
  name: string;
  type: string;
  trainedAt: string; // ISO date string
  status: TrainingStatus;
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
    status: "failed",
  },
  {
    id: "3",
    name: "Sales Training Manual.pdf",
    type: "PDF",
    trainedAt: new Date().toISOString(),
    status: "failed",
  },
  {
    id: "4",
    name: "Onboarding Guide.md",
    type: "Markdown",
    trainedAt: new Date().toISOString(),
    status: "completed",
  },
  {
    id: "5",
    name: "API Reference.md",
    type: "Markdown",
    trainedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "failed",
  },
  {
    id: "6",
    name: "User Guide.pdf",
    type: "PDF",
    trainedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "completed",
  },
  {
    id: "7",
    name: "Technical Specifications.docx",
    type: "Document",
    trainedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "completed",
  },
  {
    id: "8",
    name: "Customer Support FAQ.txt",
    type: "Text",
    trainedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "completed",
  },
  {
    id: "9",
    name: "Training Materials.zip",
    type: "Archive",
    trainedAt: new Date(Date.now() - 172800000).toISOString(),
    status: "queued",
  },
  {
    id: "10",
    name: "Knowledge Base.txt",
    type: "Text",
    trainedAt: new Date(Date.now() - 172800000).toISOString(),
    status: "completed",
  },
  {
    id: "11",
    name: "Developer Guide.pdf",
    type: "PDF",
    trainedAt: new Date(Date.now() - 172800000).toISOString(),
    status: "completed",
  },
  {
    id: "12",
    name: "Release Notes.md",
    type: "Markdown",
    trainedAt: new Date(Date.now() - 172800000).toISOString(),
    status: "failed",
  },
  {
    id: "13",
    name: "Security Policy.pdf",
    type: "PDF",
    trainedAt: new Date(Date.now() - 259200000).toISOString(),
    status: "completed",
  },
  {
    id: "14",
    name: "Code of Conduct.docx",
    type: "Document",
    trainedAt: new Date(Date.now() - 259200000).toISOString(),
    status: "completed",
  },
  {
    id: "15",
    name: "Best Practices Guide.md",
    type: "Markdown",
    trainedAt: new Date(Date.now() - 259200000).toISOString(),
    status: "completed",
  },
  {
    id: "16",
    name: "Architecture Diagrams.zip",
    type: "Archive",
    trainedAt: new Date(Date.now() - 345600000).toISOString(),
    status: "completed",
  },
  {
    id: "17",
    name: "Database Schema.txt",
    type: "Text",
    trainedAt: new Date(Date.now() - 345600000).toISOString(),
    status: "failed",
  },
  {
    id: "18",
    name: "Integration Guide.pdf",
    type: "PDF",
    trainedAt: new Date(Date.now() - 345600000).toISOString(),
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
      <h3 className='text-sm font-medium text-text-secondary dark:text-neutral-500 px-2'>
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
                className='hover:bg-[#F6F6F5] dark:hover:bg-[#2C2C2A] border-b-transparent '
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "px-2 py-1 align-middle",
                      cell.column.id === "name" && "w-[70%]",
                      cell.column.id === "status" && "w-[20%]",
                      cell.column.id === "actions" && "w-[10%] text-right"
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
  const [selectedStatus, setSelectedStatus] = useState<TrainingStatus | "all">(
    "all"
  );

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
            <span className='font-medium text-text-primary text-sm'>
              {item.name}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const item = row.original;
          const statusBadge = getStatusBadgeVariant(item.status);
          return (
            <Badge
              variant={statusBadge.variant}
              className={cn(
                "text-[11px] font-medium shrink-0 rounded-sm px-1.5 py-0.5",
                statusBadge.className
              )}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
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
                  variant='secondary'
                  size='sm'
                  className='text-[12px] hover:text-text-primary shrink-0 h-6 px-2'
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
      {/* Training Summary */}

      <div className='bg-light dark:bg-[#1A1A1A] rounded-2xl py-2 pb-4 mb-4'>
        <div className='text-sm font-medium text-text-muted dark:text-neutral-500 mb-3 border-b border-border-light dark:border-dark pb-2 px-4 text-center'>
          Last training summary - Nov 17, 2025
        </div>
        <div className='flex flex-col gap-2 px-3 mb-0'>
          <div className='flex flex-col gap-2 mb-4'>
            <h1 className='text-start  text-text-primary px-1'>
              Here is what happend from your last training:
            </h1>
            <div className='px-2 py-2 bg-extra-light dark:bg-[#2C2C2A] rounded-xl text-text-secondary shadow-xs w-full flex flex-col'>
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
                  className='size-5 text-blue-600'
                />
                <span className='text-text-secondary font-semibold'>130</span>{" "}
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
                  className='size-5 text-red-600'
                />
                <span className='text-text-secondary font-semibold'>
                  {summaryStats.failed}
                </span>{" "}
                items failed and needs actions.
              </div>
            </div>
          </div>
          <h1 className='text-start  text-text-primary px-1'>
            Your mind can now answer 5 new questions!
          </h1>
          <div className='flex flex-wrap gap-1'>
            <div className='px-2 py-1 bg-extra-light dark:bg-[#2C2C2A] rounded-lg text-text-secondary shadow-md w-fit cursor-pointer opacity-100 hover:opacity-80 hover:bg-white hover:translate-y-[-1px] transition-all duration-100 ease-in'>
              "What is your latest hobby?"
            </div>
            <div className='px-2 py-1 bg-extra-light dark:bg-[#2C2C2A] rounded-lg text-text-secondary shadow-md w-fit cursor-pointer opacity-100 hover:opacity-80 hover:bg-white hover:translate-y-[-2px] transition-all duration-100 ease-in'>
              "How did you get into product design?"
            </div>
            <div className='px-2 py-1 bg-extra-light dark:bg-[#2C2C2A] rounded-lg text-text-secondary shadow-md w-fit cursor-pointer opacity-100 hover:opacity-80 hover:bg-white hover:translate-y-[-1px] transition-all duration-100 ease-in'>
              "What is your favorite AI tool?"
            </div>
            <div className='px-2 py-1 bg-extra-light dark:bg-[#2C2C2A] rounded-lg text-text-secondary shadow-md w-fit cursor-pointer opacity-100 hover:opacity-80 hover:bg-white hover:translate-y-[-1px] transition-all duration-100 ease-in'>
              "What are you working on right now?"
            </div>
            <div className='px-2 py-1 bg-extra-light dark:bg-[#2C2C2A] rounded-lg text-text-secondary shadow-md w-fit cursor-pointer opacity-100 hover:opacity-80 hover:bg-white hover:translate-y-[-1px] transition-all duration-100 ease-in'>
              "What is next for you?"
            </div>
          </div>
        </div>
      </div>
      {/* Filter Section */}
      <div className='flex items-center gap-1 flex-wrap px-2'>
        {statusFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={selectedStatus === filter.value ? "default" : "outline"}
            size='sm'
            onClick={() => setSelectedStatus(filter.value)}
            className={cn(
              "h-6 px-2 text-[12px] rounded-sm",
              selectedStatus === filter.value &&
                "bg-primary text-primary-foreground"
            )}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Data Table grouped by date */}
      <div className='flex flex-col gap-6 bg-light py-2 rounded-xl px-2'>
        {groupedData.length === 0 ? (
          <div className='flex items-center justify-center py-12 text-[#8D8D86] dark:text-neutral-500'>
            <p className='text-sm'>No training items found</p>
          </div>
        ) : (
          groupedData.map(([dateKey, items], index) => (
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
  );
}
