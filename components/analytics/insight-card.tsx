"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { CircleDashed, Plus } from "lucide-react";
import { toast } from "sonner";

interface InsightCardProps {
  insight: string;
  action: string;
}

export function InsightCard({ insight, action }: InsightCardProps) {
  const handleAddToTodo = () => {
    toast.success(`Added to todo list: ${action}`);
  };

  return (
    <div className='flex flex-col p-1 bg-card-secondary rounded-3xl'>
      <div className='flex gap-2 py-2 px-2.5'>
        <div className='w-6 h-6 rounded-full bg-[#FF8D28]/15 flex items-center justify-center min-w-6 '>
          <Icon name='LightbulbFillIcon' className='w-5 h-5 text-[#FF8D28]' />
        </div>
        <div
          className={`text-sm text-[#43250E]/70 font-medium h-full flex items-center leading-[1.4]`}
        >
          {insight}
        </div>
      </div>

      <div className='flex-1 bg-card rounded-[20px] p-2.5 flex items-center justify-between shadow-card-primary gap-2'>
        <div className='w-6 h-6 rounded-full flex items-center justify-center min-w-6 '>
          <CircleDashed className='w-4.5 h-4.5 text-[#CFCECA]' />
        </div>

        <p className='text-[14px] text-text-primary leading-[1.4]'>{action}</p>
        <button
          onClick={handleAddToTodo}
          className='flex items-center gap-1 px-2 pr-3 h-6  hover:opacity-80 active:scale-95 cursor-pointer rounded-full transition-colors ml-3 flex-shrink-0 bg-light'
        >
          <Plus className='w-3.5 h-3.5 text-[#8D8D86]' />
          <span className='text-[13px] font-medium text-[#63635E]'>Add</span>
        </button>
      </div>
    </div>
  );
}
