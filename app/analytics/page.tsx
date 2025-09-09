"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  // Sample data - replace with actual data fetching
  const mindScore = {
    current: 110,
    total: 200,
    level: "Beginner",
  };

  const conversions = {
    value: 418,
    change: 36,
    isPositive: true,
  };

  const activeUsers = {
    value: 231,
    change: 21,
    isPositive: true,
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
        <h1 className='text-3xl font-medium mb-2 text-[#21201C] dark:text-[#EEEEEC]'>
          Good Afternoon, John!
        </h1>
      </div>

      {/* Top Section: Training and Mind Score */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {/* Train your Delphi Section */}
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

        {/* Mind Score Card */}
        <Card className='rounded-[24px] border-none shadow-card-primary dark:shadow-card-secondary bg-gradient-to-br from-orange-400 to-orange-500 text-white'>
          <CardContent className='p-6 h-full flex flex-col justify-between'>
            <div>
              <p className='text-sm opacity-90 mb-1'>Mind Score</p>
              <h2 className='text-4xl font-bold mb-4'>{mindScore.level}</h2>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center justify-center'>
                <div className='relative w-32 h-32'>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center'>
                      <p className='text-3xl font-bold'>{mindScore.current}</p>
                      <p className='text-xs opacity-75'>MIND SCORE</p>
                    </div>
                  </div>
                  <svg className='w-32 h-32 transform -rotate-90'>
                    <circle
                      cx='64'
                      cy='64'
                      r='56'
                      stroke='rgba(255, 255, 255, 0.2)'
                      strokeWidth='8'
                      fill='none'
                    />
                    <circle
                      cx='64'
                      cy='64'
                      r='56'
                      stroke='white'
                      strokeWidth='8'
                      fill='none'
                      strokeDasharray={`${(mindScore.current / mindScore.total) * 352} 352`}
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
              </div>

              <button className='w-full py-3 bg-white/20 backdrop-blur rounded-xl hover:bg-white/30 transition-colors text-sm font-medium'>
                Open breakdown
              </button>

              <div className='flex justify-between items-center pt-2'>
                <div>
                  <p className='text-xs opacity-75'>{mindScore.level}</p>
                  <p className='text-sm font-medium'>{mindScore.current}</p>
                </div>
                <div className='text-right'>
                  <p className='text-xs opacity-75'>Advanced</p>
                  <p className='text-sm font-medium'>{mindScore.total}</p>
                </div>
              </div>

              <div className='w-full bg-white/20 rounded-full h-2'>
                <div
                  className='bg-white rounded-full h-2 transition-all'
                  style={{
                    width: `${(mindScore.current / mindScore.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className='space-y-4'>
        <Link
          href='/analytics/engagement'
          className='flex items-center justify-between group hover:opacity-80 transition-opacity'
        >
          <h2 className='text-xl font-medium text-[#21201C] dark:text-[#EEEEEC]'>
            Analytics this week
          </h2>
          <ChevronRight className='w-5 h-5 text-[#8D8D86] dark:text-neutral-500 group-hover:translate-x-1 transition-transform' />
        </Link>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Conversations Card */}
          <Card className='rounded-[24px] border-none shadow-card-primary dark:shadow-card-secondary bg-white dark:bg-[#1C1C1A]'>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                <p className='text-sm font-medium text-[#63635E] dark:text-neutral-400'>
                  Conversations
                </p>
                <div className='flex items-baseline justify-between'>
                  <p className='text-3xl font-medium tracking-[-0.04em] text-[#21201C] dark:text-[#EEEEEC]'>
                    {conversions.value}
                  </p>
                  <span
                    className={cn(
                      "text-sm font-medium flex items-center gap-1",
                      conversions.isPositive
                        ? "text-[#16A34A]"
                        : "text-[#DC2626]"
                    )}
                  >
                    {conversions.isPositive ? (
                      <TrendingUp className='w-4 h-4' />
                    ) : (
                      <TrendingDown className='w-4 h-4' />
                    )}
                    +{conversions.change}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Users Card */}
          <Card className='rounded-[24px] border-none shadow-card-primary dark:shadow-card-secondary bg-white dark:bg-[#1C1C1A]'>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                <p className='text-sm font-medium text-[#63635E] dark:text-neutral-400'>
                  Active Users
                </p>
                <div className='flex items-baseline justify-between'>
                  <p className='text-3xl font-medium tracking-[-0.04em] text-[#21201C] dark:text-[#EEEEEC]'>
                    {activeUsers.value}
                  </p>
                  <span
                    className={cn(
                      "text-sm font-medium flex items-center gap-1",
                      activeUsers.isPositive
                        ? "text-[#16A34A]"
                        : "text-[#DC2626]"
                    )}
                  >
                    {activeUsers.isPositive ? (
                      <TrendingUp className='w-4 h-4' />
                    ) : (
                      <TrendingDown className='w-4 h-4' />
                    )}
                    +{activeUsers.change}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Next Actions */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-[#21201C] dark:text-[#EEEEEC] flex items-center gap-2'>
            <span className='text-[#8D8D86] dark:text-neutral-500'>▶</span>
            Next up
          </h3>
          <Card className='rounded-[24px] border-none shadow-card-primary dark:shadow-card-secondary bg-white dark:bg-[#1C1C1A]'>
            <CardContent className='p-4'>
              <p className='text-sm text-[#63635E] dark:text-neutral-400'>
                Continue training your Delphi
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-[#21201C] dark:text-[#EEEEEC]'>
            Test your Delphi
          </h3>
          <Card className='rounded-[24px] border-none shadow-card-primary dark:shadow-card-secondary bg-white dark:bg-[#1C1C1A]'>
            <CardContent className='p-4'>
              <p className='text-sm text-[#63635E] dark:text-neutral-400'>
                Try asking questions to see how well your Delphi responds
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
