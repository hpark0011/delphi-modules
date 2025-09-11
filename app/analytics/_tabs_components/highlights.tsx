"use client";
import { CalendarListItem } from "@/components/analytics/calendar-list-item";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { InsightCard } from "@/components/analytics/insight-card";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";
import { QuestionsStack } from "@/components/analytics/questions-stack";
import { HeaderNavButtons } from "@/components/analytics/header-nav-buttons";
import { useState } from "react";
import { PeopleHighlightsHorizontal } from "@/components/analytics/people-highlights-horizontal";

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
    insight:
      "Your audience brings unfiltered emotional honesty when they. Your audience brings unfiltered emotional honesty when they feel truly seen and non-judged",
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

export function HighlightsTab() {
  const [currentDate, setCurrentDate] = useState<string>(
    upcomingMeetings[0].date
  );
  const [currentPeopleIndex, setCurrentPeopleIndex] = useState(0);
  
  const dates = upcomingMeetings.map((d) => d.date);
  const handlePrevDate = () => {
    const index = dates.indexOf(currentDate);
    const prevIndex = (index - 1 + dates.length) % dates.length;
    setCurrentDate(dates[prevIndex]);
  };
  const handleNextDate = () => {
    const index = dates.indexOf(currentDate);
    const nextIndex = (index + 1) % dates.length;
    setCurrentDate(dates[nextIndex]);
  };

  // Handlers for people navigation
  const handlePrevPeople = () => {
    const itemsPerPage = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 5;
    setCurrentPeopleIndex(prev => {
      const newIndex = Math.max(0, prev - itemsPerPage);
      return newIndex;
    });
  };

  const handleNextPeople = () => {
    const itemsPerPage = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 5;
    const maxPeople = 20; // Total number of people in the component
    setCurrentPeopleIndex(prev => {
      const newIndex = Math.min(maxPeople - itemsPerPage, prev + itemsPerPage);
      return Math.max(0, newIndex);
    });
  };
  return (
    <div className='space-y-2'>
      {/* <AnalyticsSectionWrapper>
        <ModuleCard className='rounded-[24px]'>
          <ModuleCardHeader className='h-[40px] mb-1'>
            <div className='flex items-center gap-1.5'>
              <span className='font-medium text-[#63635E]'>
                People Highlights
              </span>
              <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                {insights.length}
              </span>
            </div>
          </ModuleCardHeader>
          <div className='flex flex-col px-3 py-4 pt-0'>
            <PeopleHighlightsHorizontal />
          </div>
        </ModuleCard>
      </AnalyticsSectionWrapper> */}

      <AnalyticsSectionWrapper>
        <div className='mb-4'>
          <ModuleCard className='rounded-[24px] px-0'>
            <ModuleCardHeader className='h-[40px] mb-1 pr-3'>
              <div className='flex items-center gap-1.5'>
                <span className='font-medium text-[#63635E]'>
                  People Highlights
                </span>
                <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                  {insights.length}
                </span>
              </div>
              <HeaderNavButtons 
                onPrev={handlePrevPeople}
                onNext={handleNextPeople}
                disabledPrev={currentPeopleIndex === 0}
                disabledNext={currentPeopleIndex >= 15} // 20 total - 5 visible = 15 max index
              />
            </ModuleCardHeader>
            <div className='flex flex-col px-3 py-4 pt-0'>
              <PeopleHighlightsHorizontal 
                currentIndex={currentPeopleIndex}
                onIndexChange={setCurrentPeopleIndex}
              />
            </div>
          </ModuleCard>
        </div>
        <div className='grid grid-cols-2 gap-2 gap-y-4'>
          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader className='pr-3'>
              <span className='font-medium text-[#63635E]'>
                Upcoming Meetings
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-[#8D8D86]'>{currentDate}</span>
                <HeaderNavButtons
                  onPrev={handlePrevDate}
                  onNext={handleNextDate}
                />
              </div>
            </ModuleCardHeader>
            <div className='flex flex-col pb-2'>
              {upcomingMeetings
                .find((meeting) => meeting.date === currentDate)
                ?.meetings.map((meeting, index) => (
                  <CalendarListItem key={index} {...meeting} />
                ))}
            </div>
          </ModuleCard>

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

              <div className='flex flex-col px-2 max-h-[250px] overflow-y-auto gap-2 py-2 relative'>
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

          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader className='pr-3'>
              <div className='flex items-center gap-1.5'>
                <span className='font-medium text-[#63635E]'>
                  Unanswered Questions
                </span>
                <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                  32
                </span>
              </div>
              <HeaderNavButtons />
            </ModuleCardHeader>
            <div className='flex flex-col py-2 px-3'>
              <QuestionsStack />
            </div>
          </ModuleCard>

          <ModuleCard className=' w-full rounded-[24px]'>
            <ModuleCardHeader className='pr-3'>
              <div className='flex items-center gap-1.5'>
                <span className='font-medium text-[#63635E]'>
                  Product Mentions
                </span>
                <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                  32
                </span>
              </div>
              <HeaderNavButtons />
            </ModuleCardHeader>
            <div className='flex flex-col py-2 px-3'>
              <QuestionsStack />
            </div>
          </ModuleCard>
        </div>
        {/* <div className='mt-2 grid grid-cols-2'>
        <ModuleCard className=' w-full rounded-[24px]'>
          <ModuleCardHeader className='pr-3'>
            <span className='font-medium text-[#63635E]'>
              People Highlights
            </span>
          </ModuleCardHeader>
          <div className='flex flex-col px-4'>
            <PeopleHighlight />
          </div>
        </ModuleCard>
      </div> */}
      </AnalyticsSectionWrapper>
    </div>
  );
}
