"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import type { DateRange, PeriodType } from "@/app/analytics/types"

interface DateRangePickerProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
  className?: string
}

function formatDateRange(start: Date, end: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' }
  const startStr = start.toLocaleDateString('en-US', options)
  const endStr = end.toLocaleDateString('en-US', options)
  
  return `${startStr} - ${endStr}`
}

function adjustDateRange(
  currentRange: DateRange, 
  direction: 'prev' | 'next'
): DateRange {
  const { start, end, period } = currentRange
  const days = period === '1d' ? 1 : period === '7d' ? 7 : 30
  const multiplier = direction === 'prev' ? -1 : 1
  
  const newStart = new Date(start)
  const newEnd = new Date(end)
  
  newStart.setDate(newStart.getDate() + (days * multiplier))
  newEnd.setDate(newEnd.getDate() + (days * multiplier))
  
  return {
    start: newStart,
    end: newEnd,
    period
  }
}

function getDateRangeForPeriod(period: PeriodType): DateRange {
  const end = new Date()
  const start = new Date()
  
  switch (period) {
    case '1d':
      start.setDate(start.getDate() - 1)
      break
    case '7d':
      start.setDate(start.getDate() - 7)
      break
    case '30d':
      start.setDate(start.getDate() - 30)
      break
  }
  
  return { start, end, period }
}

export function DateRangePicker({ 
  dateRange, 
  onDateRangeChange,
  className 
}: DateRangePickerProps) {
  const handlePeriodChange = (value: string) => {
    if (value && (value === '1d' || value === '7d' || value === '30d')) {
      onDateRangeChange(getDateRangeForPeriod(value as PeriodType))
    }
  }
  
  const handleNavigate = (direction: 'prev' | 'next') => {
    onDateRangeChange(adjustDateRange(dateRange, direction))
  }
  
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleNavigate('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-sm font-medium text-gray-700 min-w-[140px] text-center">
          {formatDateRange(dateRange.start, dateRange.end)}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleNavigate('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-4 w-px bg-gray-200" />
      
      <ToggleGroup 
        type="single" 
        value={dateRange.period}
        onValueChange={handlePeriodChange}
        className="gap-1"
      >
        <ToggleGroupItem 
          value="1d" 
          className="h-8 px-3 text-sm data-[state=on]:bg-gray-900 data-[state=on]:text-white"
        >
          1d
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="7d"
          className="h-8 px-3 text-sm data-[state=on]:bg-gray-900 data-[state=on]:text-white"
        >
          7d
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="30d"
          className="h-8 px-3 text-sm data-[state=on]:bg-gray-900 data-[state=on]:text-white"
        >
          30d
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}