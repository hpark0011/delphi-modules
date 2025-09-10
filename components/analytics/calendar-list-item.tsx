"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalendarListItemProps {
  title: string;
  startTime: string;
  endTime: string;
  meetingType: string;
}

const meetingTypes = ["Text Only", "No Clone", "Video Only"];

export function CalendarListItem({
  title,
  startTime,
  endTime,
  meetingType,
}: CalendarListItemProps) {
  const [selectedType, setSelectedType] = useState(meetingType);

  return (
    <div className='flex items-center justify-between p-4 py-1.5 hover:bg-gradient-to-r from-[#F6F6F5] via-[#f6f6f5] to-transparent text-[15px] leading-[1.4] relative'>
      <div className='flex items-center'>
        <div className='h-8 w-[4px] bg-[#EF5F28] rounded-full' />
        <div className='flex flex-col pl-3'>
          <span className='font-medium text-text-primary text-sm'>{title}</span>
          <span className='text-[#8D8D86] text-xs'>
            {startTime} - {endTime}
          </span>
        </div>
      </div>
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger
          className='w-fit gap-3.5 text-xs py-0 data-[size=default]:h-6'
          size='default'
        >
          <SelectValue placeholder='Select type' />
        </SelectTrigger>
        <SelectContent>
          {meetingTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
