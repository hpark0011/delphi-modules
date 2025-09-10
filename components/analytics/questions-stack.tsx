"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { AutoResizingTextarea } from "../ui/auto-resizing-textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

type Question = {
  id: string;
  name: string;
  question: string;
  avatar: string;
  initials: string;
};

const questions: Question[] = [
  {
    id: "1",
    name: "Niclas Ernst",
    question:
      "Delphi doesn’t offer unlimited pricing for pay-as-you-go. Instead, you can set specific costs per message, voice minute, and video minute. To get started...",
    avatar: "https://i.pravatar.cc/140?img=15",
    initials: "Q1",
  },
  {
    id: "2",
    name: "Question 2",
    question: "Question 2",
    avatar: "https://i.pravatar.cc/140?img=15",
    initials: "Q2",
  },
  {
    id: "3",
    name: "Question 3",
    question: "Question 3",
    avatar: "https://i.pravatar.cc/140?img=15",
    initials: "Q3",
  },
  {
    id: "4",
    name: "Question 4",
    question: "Question 4",
    avatar: "https://i.pravatar.cc/140?img=15",
    initials: "Q4",
  },
];

export function QuestionsStack() {
  const [currentCard, setCurrentCard] = useState<Question>(questions[0]);

  return (
    <div className='flex flex-col relative cursor-default transform-none gap-2 justify-center items-center w-full h-[232px] pb-[56px]'>
      <motion.div
        className={`relative bg-[#E7E4E1]/80 rounded-[20px] p-3 shadow-card-stacked flex items-start w-full gap-2 inset-0 mx-auto h-fit max-h-[160px] overflow-y-auto `}
      >
        <Avatar className='h-8 w-8 rounded-full overflow-hidden mt-0.5'>
          <AvatarImage src={currentCard.avatar} />
          <AvatarFallback>{currentCard.initials}</AvatarFallback>
        </Avatar>

        <div className='flex flex-col mb-1 h-full w-full'>
          <div className='flex items-center justify-between w-full text-sm mb-0.5'>
            <div className='font-medium'>{currentCard.name}</div>
            <div className=' text-[#8D8D86]'>6h</div>
          </div>
          <div className=' text-sm leading-[1.3] text-[#43250E]/50 line-clamp-6'>
            {currentCard.question}
          </div>
        </div>
      </motion.div>

      <div className='absolute z-10 rounded-[14px] w-full h-fit bg-white bottom-[4px] p-0.5 shadow-card-primary flex items-center justify-between pr-2'>
        <AutoResizingTextarea className='w-full focus-visible:ring-0 h-full border-none bg-transparent rounded-[12px]' />
        <button className='bg-[#F1F0EF] rounded-full flex flex-col items-center justify-center w-fit h-fit p-1 bottom-0'>
          <Icon name='ArrowUpIcon' className='size-5 text-[#8D8D86]' />
        </button>
      </div>
    </div>
  );
}
