"use client";
import { useState } from "react";
import { CalendarListItem } from "@/components/analytics/calendar-list-item";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

const upcomingMeetings = [
  {
    date: "Wed Apr 3",
    meetings: [
      {
        title: "Meeting with John Doe",
        startTime: "10:00AM",
        endTime: "11:00AM",
        meetingType: "Text Only",
      },
      {
        title: "Meeting with Jane Doe",
        startTime: "11:00AM",
        endTime: "12:00PM",
        meetingType: "Video Only",
      },
      {
        title: "Meeting with John Doe",
        startTime: "12:00PM",
        endTime: "1:00PM",
        meetingType: "No Clone",
      },
      {
        title: "Meeting with Jane Doe",
        startTime: "1:00PM",
        endTime: "2:00PM",
        meetingType: "No Clone",
      },
    ],
  },
  {
    date: "Thu Apr 4",
    meetings: [
      {
        title: "Meeting with Jane Doe",
        startTime: "11:00AM",
        endTime: "12:00PM",
        meetingType: "Text Only",
      },
      {
        title: "Meeting with John Doe",
        startTime: "12:00PM",
        endTime: "1:00PM",
        meetingType: "Video Only",
      },
      {
        title: "Meeting with Jane Doe",
        startTime: "2:00PM",
        endTime: "3:00PM",
        meetingType: "No Clone",
      },
      {
        title: "Meeting with John Doe",
        startTime: "3:00PM",
        endTime: "4:00PM",
        meetingType: "No Clone",
      },
    ],
  },
];

export function ActionsTab() {
  const [currentDate, setCurrentDate] = useState<string>(
    upcomingMeetings[0].date
  );
  return (
    <AnalyticsSectionWrapper>
      <div className='grid grid-cols-2 gap-2'>
        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader>
            <span className='font-medium text-[#63635E]'>
              Upcoming Meetings
            </span>
            <span className='text-[#8D8D86]'>{currentDate}</span>
          </ModuleCardHeader>
          <div className='flex flex-col pb-2'>
            {upcomingMeetings
              .find((meeting) => meeting.date === currentDate)
              ?.meetings.map((meeting, index) => (
                <CalendarListItem key={index} {...meeting} />
              ))}
          </div>
        </ModuleCard>
        <ModuleCard className=' w-full rounded-[24px]'>
          <ModuleCardHeader>
            <span className='font-medium text-[#63635E]'>
              People Highlights
            </span>
          </ModuleCardHeader>
        </ModuleCard>

        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader>
            <div className='flex items-center gap-1.5'>
              <span className='font-medium text-[#63635E]'>
                Unanswered Questions
              </span>
              <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                32
              </span>
            </div>

            <div className='flex items-center gap-1'>
              <button className='hover:bg-[#EBEBE9] rounded-[6px] p-1'>
                <ChevronLeft className='size-4 text-[#8D8D86]' />
              </button>
              <button className='hover:bg-[#EBEBE9] rounded-[6px] p-1'>
                <ChevronRight className='size-4 text-[#8D8D86]' />
              </button>
            </div>
          </ModuleCardHeader>
        </ModuleCard>
        <ModuleCard className=' w-full rounded-[24px]'>
          <ModuleCardHeader>
            <div className='flex items-center gap-1.5'>
              <span className='font-medium text-[#63635E]'>
                Product Mentions
              </span>
              <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                32
              </span>
            </div>

            <div className='flex items-center gap-1'>
              <button className='hover:bg-[#EBEBE9] rounded-[6px] p-1'>
                <ChevronLeft className='size-4 text-[#8D8D86]' />
              </button>
              <button className='hover:bg-[#EBEBE9] rounded-[6px] p-1'>
                <ChevronRight className='size-4 text-[#8D8D86]' />
              </button>
            </div>
          </ModuleCardHeader>
        </ModuleCard>
      </div>
      <div className='mt-2'>
        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader>
            <div className='flex items-center gap-1.5'>
              <span className='font-medium text-[#63635E]'>Insights</span>
              <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                32
              </span>
            </div>
          </ModuleCardHeader>
        </ModuleCard>
      </div>
    </AnalyticsSectionWrapper>
  );
}
