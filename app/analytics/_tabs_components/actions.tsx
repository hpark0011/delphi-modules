"use client";
import { CalendarListItem } from "@/components/analytics/calendar-list-item";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { InsightCard } from "@/components/analytics/insight-card";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";
import { PeopleHighlight } from "@/components/analytics/people-highlight";
import { QuestionsStack } from "@/components/analytics/questions-stack";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

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

const insights = [
  {
    id: 1,
    insight: "Your audience brings unfiltered emotional honesty when they",
    action:
      "Design content and programs that explicitly model radical acceptance and non-judgement",
  },
  {
    id: 2,
    insight:
      "Your audience brings unfiltered emotional honesty when they feel truly seen and non-judged",
    action:
      "Design content and programs that explicitly model radical acceptance and non-judgement",
  },
  {
    id: 3,
    insight:
      "Your audience brings unfiltered emotional honesty when they feel truly seen and non-judged",
    action:
      "Design content and programs that explicitly model radical acceptance and non-judgement",
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
          <div className='flex flex-col px-4'>
            <PeopleHighlight />
          </div>
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
          <div className='flex flex-col py-2 px-3'>
            <QuestionsStack />
          </div>
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
          <div className='flex flex-col py-2 px-3'>
            <QuestionsStack />
          </div>
        </ModuleCard>
      </div>
      <div className='mt-2 grid grid-cols-2'>
        <ModuleCard className='w-full rounded-[24px]'>
          <ModuleCardHeader className='h-[42px]'>
            <div className='flex items-center gap-1.5 pt-1'>
              <span className='font-medium text-[#63635E]'>Insights</span>
              <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                {insights.length}
              </span>
            </div>
          </ModuleCardHeader>
          <div className='flex flex-col relative'>
            <div
              aria-hidden='true'
              className='pointer-events-none absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-card to-transparent z-20'
            />

            <div className='flex flex-col px-2 max-h-[234px] overflow-y-auto gap-2 py-2 relative'>
              {insights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight.insight}
                  action={insight.action}
                />
              ))}
            </div>

            <div
              aria-hidden='true'
              className='pointer-events-none absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-card to-transparent z-10'
            />
          </div>
        </ModuleCard>
      </div>
    </AnalyticsSectionWrapper>
  );
}
