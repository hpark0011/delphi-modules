"use client";

import { useState } from "react";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { LanguageChart } from "@/components/analytics/charts/language-chart";
import {
  ModuleCard,
  ModuleCardContent,
  ModuleCardHeader,
  ModuleViewMoreButton,
} from "@/components/analytics/module-ui";
import { UserListItem } from "@/components/analytics/user-list-item";
import { SourceListItem } from "@/components/analytics/source-list-item";
import { TopicsChart } from "@/components/analytics/charts/topics-chart";
import { QuestionListItem } from "@/components/analytics/question-list-item";
import { ActiveUsersDialog } from "@/components/analytics/dialogs/active-users-dialog";
import { LanguagesDialog } from "@/components/analytics/dialogs/languages-dialog";
import { SourcesDialog } from "@/components/analytics/dialogs/sources-dialog";
import { TopicsDialog } from "@/components/analytics/dialogs/topics-dialog";
import { QuestionsDialog } from "@/components/analytics/dialogs/questions-dialog";

const mostActiveUsers = [
  {
    id: 1,
    name: "Nature Lover Brown",
    status: "Active Now",
    isActive: true,
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    messageCount: 132,
  },
  {
    id: 2,
    name: "Tech Guru Smith",
    status: "2h ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    messageCount: 102,
  },
  {
    id: 3,
    name: "Jade Thompson",
    status: "1d ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    messageCount: 78,
  },
  {
    id: 4,
    name: "Jade Thompson",
    status: "1d ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    messageCount: 78,
  },
  {
    id: 5,
    name: "Artistic Soul Davis",
    status: "4h ago",
    isActive: false,
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    messageCount: 56,
  },
];

const sourceList = [
  { id: 1, name: "Influence", citation: 324 },
  { id: 2, name: "Design Systems Handbook", citation: 298 },
  { id: 3, name: "User Experience Research", citation: 276 },
  { id: 4, name: "Material Design Guidelines", citation: 254 },
  { id: 5, name: "Human Interface Guidelines", citation: 232 },
  { id: 6, name: "Web Content Accessibility", citation: 210 },
];

const popularQuestions = [
  {
    id: 1,
    question: "What elements contribute to an intuitive interface?",
    conversations: 132,
    trendRate: 32.1,
    isPositive: true,
  },
  {
    id: 2,
    question: "What innovative techniques can improve product design?",
    conversations: 99,
    trendRate: 12.5,
    isPositive: true,
  },
  {
    id: 3,
    question: "In what ways can user testing shape design decisions?",
    conversations: 87,
    trendRate: 2.1,
    isPositive: true,
  },
  {
    id: 4,
    question: "How does minimalism influence the overall user experience?",
    conversations: 67,
    trendRate: 25.9,
    isPositive: true,
  },
  {
    id: 5,
    question:
      "Which software tools are essential for effective design collaboration?",
    conversations: 45,
    trendRate: 8.6,
    isPositive: true,
  },
  {
    id: 6,
    question: "How do you test a design's effectiveness?",
    conversations: 32,
    trendRate: 11.4,
    isPositive: true,
  },
  {
    id: 7,
    question: "What are the key principles of responsive design?",
    conversations: 28,
    trendRate: 10.4,
    isPositive: true,
  },
];

export function AudienceTab() {
  const [activeUsersOpen, setActiveUsersOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  return (
    <div className='flex flex-col gap-6 w-full'>
      <AnalyticsSectionWrapper>
        {/* <div className='flex items-center justify-between px-4 py-3'>
          <p className='font-medium text-[#8D8D86] leading-[1.4] text-sm'>
            Audience
          </p>
        </div> */}
        <div className='grid grid-cols-2 gap-2 mb-6'>
          <ModuleCard className='w-full rounded-[24px] pb-0'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>
                Most Active Users
              </span>
              <span className='text-[#8D8D86]'>Messages</span>
            </ModuleCardHeader>
            <ModuleCardContent className='py-0'>
              {mostActiveUsers.map((user) => (
                <UserListItem
                  key={user.id}
                  name={user.name}
                  status={user.status}
                  isActive={user.isActive}
                  avatarUrl={user.avatarUrl}
                  messageCount={user.messageCount}
                />
              ))}
              <ModuleViewMoreButton onClick={() => setActiveUsersOpen(true)}>
                View All
              </ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>
          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>Languages</span>
            </ModuleCardHeader>
            <ModuleCardContent className='pt-0 pb-4 px-0'>
              <LanguageChart />
              <ModuleViewMoreButton onClick={() => setLanguagesOpen(true)}>
                View All
              </ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>
        </div>

        <div className='grid grid-cols-2 gap-2 mb-6'>
          <ModuleCard className='w-full rounded-[24px] h-fit'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>
                Popular Sources
              </span>
              <span className=' text-[#8D8D86]'>Citation</span>
            </ModuleCardHeader>
            <ModuleCardContent className='pt-0 px-2 gap-0.5 pb-4'>
              {sourceList.map((source) => (
                <SourceListItem
                  key={source.id}
                  name={source.name}
                  citation={source.citation}
                />
              ))}
              <ModuleViewMoreButton onClick={() => setSourcesOpen(true)}>
                View All
              </ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>

          <ModuleCard className='w-full rounded-[24px] h-full'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>Popular Topics</span>
              <span className=' text-[#8D8D86]'>Conversations</span>
            </ModuleCardHeader>
            <ModuleCardContent className='pt-0 pb-0 px-0 h-full'>
              <TopicsChart />
              <ModuleViewMoreButton onClick={() => setTopicsOpen(true)}>
                View All
              </ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>
        </div>

        <div className='w-full'>
          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>
                Popular Questions
              </span>
              <span className=' text-[#8D8D86]'>Conversations</span>
            </ModuleCardHeader>
            <ModuleCardContent className='py-1 px-0 min-h-[224px]'>
              {popularQuestions.map((question, index) => (
                <QuestionListItem
                  key={question.id}
                  index={index}
                  question={question.question}
                  conversations={question.conversations}
                  trendRate={question.trendRate}
                  isPositive={question.isPositive}
                />
              ))}
              <ModuleViewMoreButton onClick={() => setQuestionsOpen(true)}>
                View All
              </ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>
        </div>
      </AnalyticsSectionWrapper>

      {/* Dialogs */}
      <ActiveUsersDialog
        open={activeUsersOpen}
        onOpenChange={setActiveUsersOpen}
      />
      <LanguagesDialog open={languagesOpen} onOpenChange={setLanguagesOpen} />
      <SourcesDialog open={sourcesOpen} onOpenChange={setSourcesOpen} />
      <TopicsDialog open={topicsOpen} onOpenChange={setTopicsOpen} />
      <QuestionsDialog open={questionsOpen} onOpenChange={setQuestionsOpen} />
    </div>
  );
}
