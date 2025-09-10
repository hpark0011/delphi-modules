"use client";

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
  {
    id: 1,
    name: "Influence",
    citation: 324,
  },
  {
    id: 2,
    name: "Nature Lover Brown",
    citation: 324,
  },

  {
    id: 3,
    name: "Nature Lover Brown",
    citation: 324,
  },
  {
    id: 4,
    name: "Nature Lover Brown",
    citation: 324,
  },
];

export function AudienceTab() {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <AnalyticsSectionWrapper>
        <div className='flex items-center justify-between px-4 py-2'>
          <p className='font-medium'>Audience</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <ModuleCard className='w-full rounded-[24px] pb-0'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>
                Most Active Users
              </span>
              <span className='font-normal text-[#8D8D86]'>Messages</span>
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
              <ModuleViewMoreButton>View All</ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>
          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>Languages</span>
            </ModuleCardHeader>
            <ModuleCardContent className='pt-0 pb-4 px-0'>
              <LanguageChart />
              <ModuleViewMoreButton>View All</ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>
        </div>
      </AnalyticsSectionWrapper>
      <AnalyticsSectionWrapper>
        <div className='flex items-center justify-between px-4 py-3'>
          <p className='font-medium'>Trends</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>
                Popular Sources
              </span>
              <span className='font-normal text-[#8D8D86]'>Citation</span>
            </ModuleCardHeader>
            <ModuleCardContent className='pt-0 pb-4 px-2 '>
              {sourceList.map((source) => (
                <SourceListItem
                  key={source.id}
                  name={source.name}
                  citation={source.citation}
                />
              ))}
              <ModuleViewMoreButton>View All</ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>

          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>Popular Topics</span>
              <span className='font-normal text-[#8D8D86]'>Conversations</span>
            </ModuleCardHeader>
            <ModuleCardContent className='pt-0 pb-4 px-0 min-h-[224px]'>
              <TopicsChart />
              <ModuleViewMoreButton>View All</ModuleViewMoreButton>
            </ModuleCardContent>
          </ModuleCard>
        </div>
      </AnalyticsSectionWrapper>
    </div>
  );
}
