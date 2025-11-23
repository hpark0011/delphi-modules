"use client";

import { MindScoreWidget } from "@/app/analytics/_components/mindscore/widget/mindscore";
import { AnalyticsSectionWrapper } from "@/components/analytics/dashboard-ui";
import { HomeAnalytics } from "@/components/analytics/home/home-analytics";
import { HomeHighlights } from "@/components/analytics/home/home-highlights";
import { Icon } from "@/components/ui/icon";
import { CircleDashedIcon } from "lucide-react";

export type Engagements = {
  conversations: {
    value: number;
    change: number;
    isPositive: boolean;
  };
  activeUsers: {
    value: number;
    change: number;
    isPositive: boolean;
  };
};

export type Highlights = {
  unansweredQuestions: {
    value: number;
  };
  productMentions: {
    value: number;
  };
  peopleHighlights: {
    value: number;
  };
  insights: {
    value: number;
  };
};

export default function AnalyticsPage() {
  // Sample data - replace with actual data fetching
  const engagements: Engagements = {
    conversations: {
      value: 418,
      change: 36,
      isPositive: true,
    },
    activeUsers: {
      value: 231,
      change: 21,
      isPositive: true,
    },
  };

  const highlights: Highlights = {
    unansweredQuestions: {
      value: 32,
    },
    productMentions: {
      value: 8,
    },
    peopleHighlights: {
      value: 24,
    },
    insights: {
      value: 16,
    },
  };

  const trainingCards = [
    {
      icon: "import",
      title: "Import your website",
      description: "Connect your blog or website content",
      points: 5,
    },
    {
      icon: "upload",
      title: "Upload your documents",
      description: "Add PDFs, presentations, and files",
      points: 5,
    },
    {
      icon: "connect",
      title: "Connect your notes",
      description: "Link your note-taking apps",
      points: 5,
    },
    {
      icon: "podcast",
      title: "Find your podcast appearances",
      description: "Claim podcast episodes you've been on",
      points: 15,
    },
    {
      icon: "childhood",
      title: "Talk about your childhood",
      description:
        "Increase the accuracy and variety of questions your mind can answer",
      points: 30,
    },
    {
      icon: "education",
      title: "Talk about your education",
      description:
        "Complete the Big 5 assessment to understand your communication style",
      points: 30,
    },
    {
      icon: "topic",
      title: "Choose your next topic",
      description: "Pick another area to train your Delphi on",
      points: 15,
    },
    {
      icon: "claim",
      title: "Claim your content",
      description: "Verify content we found about you online",
      points: 15,
    },
  ];

  // const highlights = [];

  return (
    <div className='space-y-4 px-13'>
      {/* Header Section */}
      <div>
        <h1 className='text-[24px] leading-[1.2] font-medium mb-2 text-[#21201C] dark:text-[#EEEEEC] px-3'>
          Good Afternoon, John!
        </h1>
      </div>

      {/* Top Section: Training and Mind Score */}
      <div className='flex gap-2'>
        <div className='w-full flex flex-col gap-2'>
          {/* Train your Delphi Section */}
          <AnalyticsSectionWrapper className='w-full p-2 rounded-[20px]'>
            {/* Header */}
            <div className='space-y-2 w-full'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 p-2'>
                  <div className='w-8 h-8 bg-[#FF8D28]/10 rounded-full flex items-center justify-center'>
                    <Icon
                      name='BookClosedFillIcon'
                      className='size-6 text-[#FF8D28]'
                    />
                  </div>
                  <h2 className='text-lg font-medium'>Train your Delphi</h2>
                </div>
                <div className='flex items-end text-xs text-[#8D8D86] dark:text-neutral-400 flex-col mr-4'>
                  <span>Reach 200 Mind Score</span>
                  <span className='text-[#21201C] dark:text-[#EEEEEC]'>
                    110 / 200
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div className='grid grid-cols-2 gap-2'>
                {trainingCards.map((card, index) => (
                  <div
                    key={index}
                    className='group p-3 rounded-[20px] bg-card dark:bg-[#262626] hover:bg-[#EBEBE9] dark:hover:bg-[#2C2C2A] transition-colors cursor-pointer shadow-card-primary flex flex-col gap-3 w-full h-[144px]'
                  >
                    <CircleDashedIcon className='size-5 min-h-5 text-[#CFCECA]' />
                    <div className='flex flex-col w-full h-full'>
                      <h3 className='text-sm font-medium text-[#21201C] dark:text-[#EEEEEC]'>
                        {card.title}
                      </h3>
                      <p className='text-xs leading-[1.4] text-[#8D8D86] dark:text-neutral-500'>
                        {card.description}
                      </p>
                    </div>

                    <div className='h-[24px] min-h-[24px] px-3 w-fit rounded-full bg-[#F0EEE4] dark:bg-[#363636] flex items-center justify-center'>
                      <span className='text-sm text-[#71624B] dark:text-neutral-400'>
                        +{card.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnalyticsSectionWrapper>

          <AnalyticsSectionWrapper className='p-4 py-3 rounded-[20px] flex gap-3 flex-row items-center justify-between'>
            {/* Bottom Section - Next Actions */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-2 size-8 bg-[#F1F0EF] rounded-full justify-center'>
                <span className='text-[#8D8D86] dark:text-neutral-500'>▶</span>
              </div>
              <div className='text-[#8D8D86]'>Next up</div>
            </div>
            <div className='text-[#8D8D86] pr-2'>Test your Delphi</div>
          </AnalyticsSectionWrapper>
        </div>

        <div className='flex flex-col space-y-2 w-full max-w-[360px]'>
          {/* Mind Score Card */}
          <MindScoreWidget />

          {/* Analytics Section */}
          <HomeAnalytics engagements={engagements} />

          {/* Highlights Section */}
          <HomeHighlights highlights={highlights} />

          {/* Upgrade Broadcast Section */}
          {/* <UpgradeBroadcast /> */}
        </div>
      </div>
    </div>
  );
}
