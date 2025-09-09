"use client";

import { HomeAnalytics } from "@/components/analytics/home/home-analytics";
import { MindScore } from "@/components/analytics/home/mindscore";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

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

export default function AnalyticsPage() {
  // Sample data - replace with actual data fetching
  const mindScore = {
    current: 110,
    total: 200,
    level: "Beginner",
  };

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

  return (
    <div className='space-y-6 px-3'>
      {/* Header Section */}
      <div>
        <h1 className='text-3xl font-medium mb-2 text-[#21201C] dark:text-[#EEEEEC] px-3'>
          Good Afternoon, John!
        </h1>
      </div>

      {/* Top Section: Training and Mind Score */}
      <div className='flex gap-2'>
        {/* Train your Delphi Section */}
        <div className='space-y-2 w-full'>
          <Card className='rounded-[24px] border-none shadow-card-primary dark:shadow-card-secondary bg-white dark:bg-[#1C1C1A]'>
            <CardHeader className='pb-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded flex items-center justify-center'>
                    <Sparkles className='w-5 h-5 text-white' />
                  </div>
                  <h2 className='text-lg font-medium'>Train your Delphi</h2>
                </div>
                <div className='flex items-center gap-2 text-sm text-[#63635E] dark:text-neutral-400'>
                  <span>Reach 200 Mind Score</span>
                  <span className='font-medium text-[#21201C] dark:text-[#EEEEEC]'>
                    {mindScore.current} / {mindScore.total}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='grid grid-cols-2 gap-3'>
                {trainingCards.slice(0, 4).map((card, index) => (
                  <div
                    key={index}
                    className='group p-4 rounded-2xl bg-[#F8F8F6] dark:bg-[#262626] hover:bg-[#EBEBE9] dark:hover:bg-[#2C2C2A] transition-colors cursor-pointer'
                  >
                    <div className='space-y-2'>
                      <h3 className='text-sm font-medium text-[#21201C] dark:text-[#EEEEEC]'>
                        {card.title}
                      </h3>
                      <p className='text-xs text-[#8D8D86] dark:text-neutral-500'>
                        {card.description}
                      </p>
                      <div className='flex items-center gap-1'>
                        <div className='w-5 h-5 rounded-full bg-[#E8E8E6] dark:bg-[#363636] flex items-center justify-center'>
                          <span className='text-xs font-medium text-[#63635E] dark:text-neutral-400'>
                            +{card.points}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='grid grid-cols-2 gap-3'>
                {trainingCards.slice(4, 8).map((card, index) => (
                  <div
                    key={index}
                    className='group p-4 rounded-2xl bg-[#F8F8F6] dark:bg-[#262626] hover:bg-[#EBEBE9] dark:hover:bg-[#2C2C2A] transition-colors cursor-pointer'
                  >
                    <div className='space-y-2'>
                      <h3 className='text-sm font-medium text-[#21201C] dark:text-[#EEEEEC]'>
                        {card.title}
                      </h3>
                      <p className='text-xs text-[#8D8D86] dark:text-neutral-500'>
                        {card.description}
                      </p>
                      <div className='flex items-center gap-1'>
                        <div className='w-5 h-5 rounded-full bg-[#E8E8E6] dark:bg-[#363636] flex items-center justify-center'>
                          <span className='text-xs font-medium text-[#63635E] dark:text-neutral-400'>
                            +{card.points}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bottom Section - Next Actions */}
          <Card className='rounded-[24px] border-none shadow-card-primary dark:shadow-card-secondary bg-white dark:bg-[#1C1C1A] flex flex-row px-4'>
            <h3 className='text-lg font-medium text-[#21201C] dark:text-[#EEEEEC] flex items-center gap-2'>
              <span className='text-[#8D8D86] dark:text-neutral-500'>▶</span>
              Next up
            </h3>
            <CardContent className='p-4'>
              <p className='text-sm text-[#63635E] dark:text-neutral-400'>
                Continue training your Delphi
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='flex flex-col space-y-2 w-full max-w-[392px]'>
          {/* Mind Score Card */}
          <MindScore mindScore={mindScore} />

          {/* Analytics Section */}
          <HomeAnalytics engagements={engagements} />
        </div>
      </div>
    </div>
  );
}
