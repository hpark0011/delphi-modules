import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface InsightListItemProps {
  question: string;
  index: number;
  conversations: number;
}

export function InsightListItem({
  question,
  index,
  conversations,
}: InsightListItemProps) {
  return (
    <div className='flex items-center justify-between p-4 py-1 hover:bg-gradient-to-r from-[#F6F6F5] via-[#f6f6f5] to-transparent text-[15px] leading-[1.4]'>
      <div className='flex items-baseline gap-2'>
        <span className=' font-medium text-[#8D8D86]'>{index + 1}.</span>
        <span className='font-medium text-text-primary text-sm'>
          {question}
        </span>
      </div>
      <span className=' font-normal text-[#8D8D86] text-sm'>
        {conversations}
      </span>
    </div>
  );
}
