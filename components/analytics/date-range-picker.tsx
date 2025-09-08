"use client";

import type { DateRange, PeriodType } from "@/app/analytics/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as React from "react";
import { DateRange as CalendarDateRange } from "react-day-picker";

interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  className?: string;
}

function getDateRangeForPeriod(period: PeriodType): DateRange {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case "1d":
      start.setDate(start.getDate() - 1);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
  }

  return { start, end, period };
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  className,
}: DateRangePickerProps) {
  const handlePeriodChange = (value: string) => {
    if (value && (value === "1d" || value === "7d" || value === "30d")) {
      onDateRangeChange(getDateRangeForPeriod(value as PeriodType));
    }
  };

  const [calendarDateRange, setCalendarDateRange] = React.useState<
    CalendarDateRange | undefined
  >({
    from: dateRange.start,
    to: dateRange.end,
  });

  React.useEffect(() => {
    setCalendarDateRange({
      from: dateRange.start,
      to: dateRange.end,
    });
  }, [dateRange]);

  const handleDateSelect = (range: CalendarDateRange | undefined) => {
    setCalendarDateRange(range);
    if (range?.from && range?.to) {
      onDateRangeChange({
        start: range.from,
        end: range.to,
        period: "custom" as PeriodType,
      });
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              "justify-start text-left rounded-full h-8 px-3 text-[13px]",
              !calendarDateRange && "text-muted-foreground"
            )}
          >
            {calendarDateRange?.from ? (
              calendarDateRange.to ? (
                <>
                  {format(calendarDateRange.from, "MMM dd")} -{" "}
                  {format(calendarDateRange.to, "MMM dd")}
                </>
              ) : (
                format(calendarDateRange.from, "MMM dd, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={calendarDateRange?.from}
            selected={calendarDateRange}
            onSelect={handleDateSelect}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <ToggleGroup
        type='single'
        value={dateRange.period}
        onValueChange={handlePeriodChange}
        className='gap-0.5'
      >
        <ToggleGroupItem
          value='1d'
          className='h-8 px-3 text-[13px] rounded-full'
        >
          1d
        </ToggleGroupItem>
        <ToggleGroupItem
          value='7d'
          className='h-8 px-3 text-[13px] rounded-full'
        >
          7d
        </ToggleGroupItem>
        <ToggleGroupItem
          value='30d'
          className='h-8 px-3 text-[13px] rounded-full'
        >
          30d
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
