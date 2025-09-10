import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface QuestionListItemProps {
  question: string;
  index: number;
  conversations: number;
}

export function QuestionListItem({
  question,
  index,
  conversations,
}: QuestionListItemProps) {
  return (
    <div className='flex items-center justify-between p-4 py-1 hover:bg-gradient-to-r from-[#F6F6F5] via-[#f6f6f5] to-transparent'>
      <div className='flex items-center gap-2'>
        <span className='text-sm font-medium text-[#8D8D86]'>{index + 1}.</span>
        <span className='font-medium text-text-primary text-sm'>
          {question}
        </span>
      </div>
      <span className='text-sm font-normal text-[#8D8D86]'>
        {conversations}
      </span>
    </div>
  );
}
