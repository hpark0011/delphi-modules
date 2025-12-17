"use client";

import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
import { format } from "date-fns";

interface SummaryStats {
  totalTrained: number;
  completed: number;
  failed: number;
}

interface TrainingSummaryProps {
  summaryStats: SummaryStats;
  scoreIncrease: number;
  remainingToNextLevel: number;
  trainingDate: Date | null;
}

interface StatCardProps {
  iconName: IconName;
  iconColor: string;
  label: string;
  value: number;
}

function StatCard({ iconName, iconColor, label, value }: StatCardProps) {
  return (
    <div className='flex flex-col items-center gap-2 w-full px-1.5 py-1 pb-0.5'>
      <div className='flex items-center gap-0.5 w-full'>
        <Icon name={iconName} className={`size-5 ${iconColor}`} />
        <span className='text-text-secondary text-sm'>{label}</span>
      </div>
      <span className='text-text-secondary font-semibold text-2xl w-full flex-end flex px-0.5'>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className='self-stretch bg-light min-w-[2px] w-[2px]' />;
}

export function TrainingSummary({
  summaryStats,
  scoreIncrease,
  remainingToNextLevel,
  trainingDate,
}: TrainingSummaryProps) {
  // Format the training date
  const formattedDate = trainingDate
    ? format(trainingDate, "MMM d, yyyy")
    : "No training yet";

  return (
    <div className='flex flex-col gap-3 mt-4'>
      <div className='text-[14px] font-medium text-text-muted dark:text-neutral-500 px-3 flex items-center gap-0.5 tracking-tight'>
        <Icon
          name='SquareTextSquareFillIcon'
          className='size-4.5 text-icon-light'
        />
        Summary
      </div>
      <div className='bg-light dark:bg-[#1A1A1A] rounded-2xl py-3 pb-3.5 mb-4'>
        <div className='flex flex-col gap-2 px-3 mb-0'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-start text-text-secondary px-1 text-[15px]'>
              From training on{" "}
              <span className='font-semibold'>{formattedDate}</span>
            </h1>

            <div className='flex flex-col w-full items-center justify-center mb-4 py-10 gap-2'>
              <span className='text-text-secondary text-[15px]'>
                Mind Score
              </span>
              <div className='flex gap-0 items-end justify-center relative  w-full'>
                <span className='text-text-primary font-semibold text-6xl tracking-tighter ml-[-24px]'>
                  {/* Mind score increased */}
                  <span className='text-5xl'>+</span>
                  {scoreIncrease}
                </span>{" "}
              </div>
              {/* Remaining mind score until next level */}
              <div className='text-text-muted text-[15px] mt-1'>
                Mind score left until next level{" "}
                <span className='px-1.5 py-0.5 bg-extra-light rounded-sm tracking-tighter shadow-sm ml-0.5 text-text-primary'>
                  {remainingToNextLevel}
                </span>
              </div>
            </div>

            {/* Training Summary Section */}
            <div className='px-2 py-2 bg-extra-light dark:bg-[#2C2C2A] rounded-xl text-text-secondary shadow-xs w-full flex items-stretch gap-1.5'>
              <StatCard
                iconName='MindBubbleFillIcon'
                iconColor='text-orange-400'
                label='Items Trained'
                value={summaryStats.totalTrained}
              />
              <Divider />
              <StatCard
                iconName='CheckedCircleFillIcon'
                iconColor='text-green-500'
                label='Completed'
                value={summaryStats.completed}
              />
              <Divider />
              <StatCard
                iconName='ExclamationmarkTriangleFillIcon'
                iconColor='text-orange-500'
                label='Failed'
                value={summaryStats.failed}
              />
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
