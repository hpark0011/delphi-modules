import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface SourceListItemProps {
  name: string;
  citation: number;
}

export function SourceListItem({ name, citation }: SourceListItemProps) {
  return (
    <div className='flex items-center justify-between p-2 py-1 rounded-md hover:bg-[#F6F6F5]'>
      <div className='flex items-center gap-2'>
        <Icon name='DocFillIcon' className='w-6 h-6 text-[#CFCECA]' />
        <div className='flex flex-col'>
          <span className='font-medium text-text-primary text-sm'>{name}</span>
        </div>
      </div>
      <span className='text-sm font-normal text-[#8D8D86]'>{citation}</span>
    </div>
  );
}
