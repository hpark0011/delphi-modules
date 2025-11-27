"use client";

import { Icon } from "@/components/ui/icon";

interface SummaryStats {
  totalTrained: number;
  completed: number;
  failed: number;
  trainedLast24Hours: number;
  questionTypes: string;
  wordsLeft: number;
  totalWords: number;
}

interface TrainingSummaryProps {
  summaryStats: SummaryStats;
}

export function TrainingSummary({ summaryStats }: TrainingSummaryProps) {
  const questions = [
    "What is your latest hobby?",
    "How did you get into product design?",
    "What is your favorite AI tool?",
    "What are you working on right now?",
    "What is next for you?",
  ];

  return (
    <div className='flex flex-col gap-3 mt-4'>
      <div className='text-[14px] font-medium text-text-muted dark:text-neutral-500 px-3 flex items-center gap-0.5 tracking-tight'>
        <Icon
          name='SquareTextSquareFillIcon'
          className='size-4.5 text-icon-light'
        />
        Summary
      </div>
      <div className='bg-light dark:bg-[#1A1A1A] rounded-xl py-3.5 pb-0 mb-4'>
        <div className='flex flex-col gap-2 px-3 mb-0'>
          <div className='flex flex-col gap-2 mb-5'>
            <h1 className='text-start  text-text-primary px-1 text-[15px]'>
              Here is what happend from your last training at{" "}
              <span className='font-semibold'>Nov 17, 2025</span>:
            </h1>
            <div className='px-2 py-2 bg-extra-light dark:bg-[#2C2C2A] rounded-xl text-text-secondary shadow-xs w-full flex flex-col gap-1.5'>
              <div className='flex items-center gap-0.5'>
                <Icon
                  name='MindBubbleFillIcon'
                  className='size-5 text-orange-400'
                />
                <span className='text-text-secondary font-semibold'>
                  {summaryStats.totalTrained}
                </span>{" "}
                items were trained.
              </div>
              <div className='flex items-center gap-0.5'>
                <Icon
                  name='ArrowshapeUpFillIcon'
                  className='size-5 text-neutral-400'
                />
                <span className='text-text-secondary font-semibold'>130</span>{" "}
                mind score has increased.
              </div>

              <div className='flex items-center gap-0.5'>
                <Icon
                  name='CheckedCircleFillIcon'
                  className='size-5 text-green-600'
                />
                <span className='text-text-secondary font-semibold'>
                  {summaryStats.completed}
                </span>{" "}
                items completed.
              </div>
              <div className='flex items-center gap-0.5'>
                <Icon
                  name='ExclamationmarkTriangleFillIcon'
                  className='size-5 text-orange-500'
                />
                <span className='text-text-secondary font-semibold'>
                  {summaryStats.failed}
                </span>{" "}
                items failed and needs actions.
              </div>
            </div>
          </div>
          {/* <h1 className='text-start  text-text-primary px-1 text-[15px]'>
            Your mind can now answer 5 new questions!
          </h1> */}
          {/* <div className='flex flex-wrap gap-1'>
            {questions.map((question) => (
              <div
                key={question}
                className='px-2.5 py-1.5 bg-extra-light dark:bg-[#2C2C2A] rounded-lg text-text-secondary shadow-xs w-fit cursor-pointer opacity-100 hover:opacity-80 hover:bg-white hover:translate-y-[-1px] transition-all duration-100 ease-in'
              >
                {question}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
