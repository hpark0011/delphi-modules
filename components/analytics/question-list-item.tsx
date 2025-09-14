import { 
  // TrendingUp, // Unused import
  // TrendingDown, // Unused import
  ArrowUp 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionListItemProps {
  question: string;
  index: number;
  conversations: number;
  trendRate?: number;
  isPositive?: boolean;
}

export function QuestionListItem({
  question,
  index,
  conversations,
  trendRate,
  isPositive = true,
}: QuestionListItemProps) {
  // const TrendIcon = isPositive ? TrendingUp : TrendingDown; // Unused variable
  const trendColorClass = isPositive
    ? "text-trend-positive"
    : "text-trend-negative";

  return (
    <div className='flex items-center justify-between p-4 py-1 hover:bg-gradient-to-r from-[#F6F6F5] via-[#f6f6f5] to-transparent text-[15px] leading-[1.4]'>
      <div className='flex items-baseline gap-2'>
        <span className=' font-medium text-[#8D8D86]'>{index + 1}.</span>
        <span className='font-medium text-text-primary text-sm'>
          {question}
        </span>
      </div>
      <div className='flex items-center gap-1 text-sm'>
        <span className='text-[#8D8D86]'>{conversations}</span>
        {trendRate !== undefined && (
          <>
            <span className='text-[#8D8D86]'>•</span>
            <div className={cn("flex items-center", trendColorClass)}>
              <ArrowUp className='w-3.5 h-3.5' />
              <span className=''>{trendRate}%</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
