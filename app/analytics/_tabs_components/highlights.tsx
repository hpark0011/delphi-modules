"use client";
import { CalendarListItem } from "@/components/analytics/calendar-list-item";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { InsightCard } from "@/components/analytics/insight-card";
import { ModuleCard, ModuleCardHeader } from "@/components/analytics/module-ui";
import { QuestionsStack } from "@/components/analytics/questions-stack";
import { HeaderNavButtons } from "@/components/analytics/header-nav-buttons";
import { useState } from "react";
import { PeopleHighlightsHorizontal } from "@/components/analytics/people-highlights-horizontal";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";

const upcomingMeetings = [
  {
    date: "Wed Apr 2",
    meetings: [],
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
      {
        title: "Meeting with John Doe",
        startTime: "4:00PM",
        endTime: "5:00PM",
        meetingType: "Video Only",
      },
    ],
  },
  {
    date: "Thu Apr 5",
    meetings: [
      {
        title: "Meeting with Jane Doe",
        startTime: "11:00AM",
        endTime: "12:00PM",
        meetingType: "Text Only",
      },
    ],
  },
];

const initialInsights = [
  {
    id: 1,
    insight:
      "Your audience brings unfiltered emotional honesty when they feel truly seen and non-judged",
    action:
      "Design content and programs that explicitly model radical acceptance and non-judgement",
  },
  {
    id: 2,
    insight:
      "Peak engagement occurs during evening hours between 7-10 PM when users are most receptive to deeper content",
    action:
      "Schedule high-value content releases and live sessions during these prime engagement windows",
  },
  {
    id: 3,
    insight:
      "Community members who interact with 3+ pieces of content weekly show 85% higher retention rates",
    action:
      "Create content series that encourage multiple touchpoints throughout the week",
  },
  {
    id: 4,
    insight:
      "Video content with personal stories generates 3x more engagement than educational content alone",
    action:
      "Incorporate more personal narratives and vulnerability into your video content strategy",
  },
  {
    id: 5,
    insight:
      "Members who join small group discussions are 4x more likely to become long-term community advocates",
    action:
      "Facilitate more intimate group sessions with 5-8 participants for deeper connections",
  },
  {
    id: 6,
    insight:
      "Questions about mental health and self-care receive the highest engagement in community forums",
    action:
      "Develop targeted resources and expert sessions addressing mental wellness topics",
  },
  {
    id: 7,
    insight:
      "User-generated content receives 2.5x more shares than branded content across all platforms",
    action:
      "Launch a community spotlight program to feature member stories and experiences",
  },
  {
    id: 8,
    insight:
      "Mobile users spend 40% more time on the platform but complete fewer actions than desktop users",
    action:
      "Optimize mobile UX for consumption-heavy experiences with simplified interaction patterns",
  },
];

export function HighlightsTab() {
  const [currentDate, setCurrentDate] = useState<string>(
    upcomingMeetings[1].date
  );
  const [currentPeopleIndex, setCurrentPeopleIndex] = useState(0);
  const [insights, setInsights] = useState(initialInsights);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const dates = upcomingMeetings.map((d) => d.date);
  const currentMeetings = upcomingMeetings.find((meeting) => meeting.date === currentDate)?.meetings || [];

  const handleRemoveInsight = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setInsights((prev) => prev.filter((insight) => insight.id !== id));
      setRemovingId(null);
    }, 500); // Match animation duration
  };

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
    const itemsPerPage =
      window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 5;
    setCurrentPeopleIndex((prev) => {
      const newIndex = Math.max(0, prev - itemsPerPage);
      return newIndex;
    });
  };

  const handleNextPeople = () => {
    const itemsPerPage =
      window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 5;
    const maxPeople = 20; // Total number of people in the component
    setCurrentPeopleIndex((prev) => {
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
              <div className='flex items-center gap-1.5'>
                <span className='font-medium text-[#63635E]'>
                  Upcoming Meetings
                </span>
                {currentMeetings.length > 0 && (
                  <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                    {currentMeetings.length}
                  </span>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-[#8D8D86]'>{currentDate}</span>
                <HeaderNavButtons
                  onPrev={handlePrevDate}
                  onNext={handleNextDate}
                />
              </div>
            </ModuleCardHeader>
            <div className='flex flex-col pb-2 h-full min-h-[248px]'>
              {currentMeetings.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className='flex flex-col items-center justify-center py-8 px-4 h-full'
                >
                  <div className='flex items-center justify-center mb-2'>
                    <Icon
                      name='CalendarFillIcon'
                      className='w-8 h-8 text-neutral-300'
                    />
                  </div>
                  <div className='flex flex-col items-center justify-center gap-1'>
                    <p className='text-primary text-sm text-center'>
                      No meetings scheduled
                    </p>
                    <p className='text-[#8D8D86] text-xs mb-6 text-center px-4'>
                      You have no meetings scheduled for this date. Add meetings to stay organized and track your commitments.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Add meeting functionality
                      console.log('Add meeting clicked');
                    }}
                    className='px-3 h-7 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-[#3C3C38] transition-colors shadow-xl'
                  >
                    Add meetings
                  </motion.button>
                </motion.div>
              ) : (
                currentMeetings.map((meeting, index) => (
                  <CalendarListItem key={index} {...meeting} />
                ))
              )}
            </div>
          </ModuleCard>

          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader className='h-[42px]'>
              <div className='flex items-center gap-1.5 pt-1'>
                <span className='font-medium text-[#63635E]'>Insights</span>
                {insights.length > 0 && (
                  <span className='font-semibold text-[#EF5F28] bg-[#EF5F28]/10 rounded-full flex text-center items-center justify-center px-2 py-0.5 w-fit text-xs'>
                    {insights.length}
                  </span>
                )}
              </div>
              {insights.length > 0 && (
                <button
                  onClick={() => setInsights([])}
                  className='text-[#8D8D86] cursor-pointer hover:opacity-70 transition-opacity'
                >
                  Clear
                </button>
              )}
            </ModuleCardHeader>
            <div className='flex flex-col relative'>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-card to-transparent z-20'
              />

              <div className='flex flex-col px-3 max-h-[250px] h-full overflow-y-auto gap-2 py-2 relative'>
                {insights.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className='flex flex-col items-center justify-center py-8 px-4 translate-y-[-16px]'
                  >
                    <div className='flex items-center justify-center mb-2'>
                      <Icon
                        name='LightbulbFillIcon'
                        className='w-8 h-8 text-neutral-300'
                      />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-1'>
                      <p className='text-primary text-sm text-center'>
                        All insights are added to the list.
                      </p>
                      <p className='text-[#8D8D86] text-sm mb-6 text-center'>
                        Insights are auto-generated suggestions based on trends
                        and gaps recognized from Delphi’s interaction.{" "}
                        <Link
                          href='/'
                          target='_blank'
                          className='text-blue-500 hover:opacity-70'
                        >
                          Learn More
                        </Link>
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInsights(initialInsights)}
                      className='px-3 h-7 bg-primary text-primary-foreground rounded-full text-xs font-medium hover:bg-[#3C3C38] transition-colors shadow-xl'
                    >
                      Get more insights
                    </motion.button>
                  </motion.div>
                ) : (
                  <AnimatePresence mode='popLayout'>
                    {insights.map((insight, index) => (
                      <InsightCard
                        key={insight.id}
                        id={insight.id}
                        insight={insight.insight}
                        action={insight.action}
                        onRemove={handleRemoveInsight}
                        isRemoving={removingId === insight.id}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                )}
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
