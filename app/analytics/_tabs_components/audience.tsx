"use client";

import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import {
  ModuleCard,
  ModuleCardHeader,
  ModuleCardContent,
} from "@/components/analytics/module-ui";
import { UserListItem } from "@/components/analytics/user-list-item";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

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

export function AudienceTab() {
  return (
    <div className='flex flex-col gap-6 w-full'>
      <AnalyticsSectionWrapper>
        <div className='flex items-center justify-between px-4 py-2.5'>
          <p className='font-medium'>Audience</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader>
              <span className='font-medium text-[#63635E]'>
                Most Active Users
              </span>
              <span className='font-normal text-[#8D8D86]'>Messages</span>
            </ModuleCardHeader>
            <ModuleCardContent className='pt-0'>
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
              <div className=' flex justify-center absolute bottom-0 p-3 left-0 w-full bg-gradient-to-t from-card to-transparent'>
                <Button
                  variant='outline'
                  className='h-8 px-3 rounded-full border-[#E5E5E0] font-medium text-[#1C1C17] hover:bg-gray-50 bg-base'
                >
                  View All
                </Button>
              </div>
            </ModuleCardContent>
          </ModuleCard>
          <ModuleCard className='w-full rounded-[24px]'>
            <ModuleCardHeader>Languages</ModuleCardHeader>
          </ModuleCard>
        </div>
      </AnalyticsSectionWrapper>
      <AnalyticsSectionWrapper>
        <div className='flex items-center justify-between px-4 py-3'>
          <p className='font-medium'>Trends</p>
        </div>
        <div className='grid grid-cols-2 gap-2'></div>
      </AnalyticsSectionWrapper>
    </div>
  );
}
