import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { AnalyticsSectionWrapper } from "../dashboard-ui";
import { ArrowRight } from "lucide-react";

interface MindScoreProps {
  mindScore: {
    current: number;
    total: number;
    level: string;
  };
}

export function MindScore({ mindScore }: MindScoreProps) {
  return (
    <AnalyticsSectionWrapper className='p-0 rounded-[20px] gap-0'>
      <Card className='rounded-[20px] border-none shadow-card-primary dark:shadow-card-secondary bg-gradient-to-tl from-[#863A0B] via-[#BD6224] to-[#FF9F5F] text-white p-4 py-3.5 pb-4'>
        <CardContent className='h-full flex flex-col justify-between p-0'>
          <div className='mb-8'>
            <p className='text-sm font-medium opacity-80 mix-blend-hard-light '>
              Mind Score
            </p>
            <h2 className='text-[40px] leading-[1] font-medium font-serif'>
              {mindScore.level}
            </h2>
          </div>

          <div className='space-y-4'>
            <button className='w-fit py-1.5 px-3 bg-white/20 backdrop-blur hover:bg-white/30 transition-colors text-sm font-medium rounded-full cursor-pointer'>
              Open breakdown
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Mind Score Breakdown */}
      <div className='p-4 flex w-full flex-col gap-3'>
        <div className='flex justify-between items-center px-0.5'>
          <div>
            <p className='text-sm'>{mindScore.level}</p>
            <p className='text-sm text-[#8D8D86]'>{mindScore.current}</p>
          </div>
          <ArrowRight className='size-3.5 text-[#8D8D86]' />
          <div className='text-right'>
            <p className='text-sm text-[#8D8D86]'>Advanced</p>
            <p className='text-sm text-[#8D8D86]'>{mindScore.total}</p>
          </div>
        </div>

        <div className='w-full bg-[#BD6224]/20 rounded-[3px] h-2'>
          <div
            className='bg-[#BD6224] rounded-[3px] h-2 transition-all'
            style={{
              width: `${(mindScore.current / mindScore.total) * 100}%`,
            }}
          />
        </div>
      </div>
    </AnalyticsSectionWrapper>
  );
}

export function MindScoreFull({ mindScore }: MindScoreProps) {
  return (
    <AnalyticsSectionWrapper className='p-0 rounded-[20px] gap-0'>
      <Card className='rounded-[20px] border-none shadow-card-primary dark:shadow-card-secondary bg-gradient-to-tl from-[#4e392f] to-[#A88777]/80 text-white p-4 py-3.5 pb-4'>
        <CardContent className='h-full flex flex-col justify-between p-0'>
          <div className='mb-8'>
            <p className='text-sm font-medium opacity-80 mix-blend-hard-light '>
              Mind Score
            </p>
            <h2 className='text-[40px] leading-[1] font-medium font-serif'>
              {mindScore.level}
            </h2>
          </div>

          <div className='space-y-4'>
            <button className='w-fit py-1.5 px-3 bg-white/20 backdrop-blur hover:bg-white/30 transition-colors text-sm font-medium rounded-full cursor-pointer'>
              Open breakdown
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Mind Score Breakdown */}
      {/* <div className='p-4 flex w-full flex-col gap-3'>
        <div className='flex justify-between items-center px-0.5'>
          <div>
            <p className='text-sm'>{mindScore.level}</p>
            <p className='text-sm text-[#8D8D86]'>{mindScore.current}</p>
          </div>
          <ArrowRight className='size-3.5 text-[#8D8D86]' />
          <div className='text-right'>
            <p className='text-sm text-[#8D8D86]'>Advanced</p>
            <p className='text-sm text-[#8D8D86]'>{mindScore.total}</p>
          </div>
        </div>

        <div className='w-full bg-[#BD6224]/20 rounded-[3px] h-2'>
          <div
            className='bg-[#BD6224] rounded-[3px] h-2 transition-all'
            style={{
              width: `${(mindScore.current / mindScore.total) * 100}%`,
            }}
          />
        </div>
      </div> */}
    </AnalyticsSectionWrapper>
  );
}
