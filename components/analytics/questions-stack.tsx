"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { AutoResizingTextarea } from "../ui/auto-resizing-textarea";
import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ArrowUp } from "lucide-react";

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
    name: "Priya Sharma",
    question:
      "How should we treat partial video views in engagement—do 10–15s plays count as separate events or partial views in reporting?",
    avatar: "https://i.pravatar.cc/140?img=12",
    initials: "PS",
  },
  {
    id: "3",
    name: "Liam O'Connor",
    question:
      "Can Delphi export highlight reels as MP4 with burned-in captions? We need shareable clips for Slack updates.",
    avatar: "https://i.pravatar.cc/140?img=31",
    initials: "LO",
  },
  {
    id: "4",
    name: "Aiko Tanaka",
    question:
      "What’s the recommended token budgeting for long interviews to avoid truncation without spiking cost? Any rules of thumb?",
    avatar: "https://i.pravatar.cc/140?img=47",
    initials: "AT",
  },
];

export function QuestionsStack() {
  const [currentCard, setCurrentCard] = useState<Question>(questions[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [submittedResponse, setSubmittedResponse] = useState<string | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setUserResponse(inputValue);
      setSubmittedResponse(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (
      submittedResponse &&
      responseRef.current &&
      scrollContainerRef.current
    ) {
      // Small delay to ensure the element is rendered
      setTimeout(() => {
        if (responseRef.current && scrollContainerRef.current) {
          const responseElement = responseRef.current;
          const container = scrollContainerRef.current;

          // Calculate position to center the response
          const responseTop = responseElement.offsetTop;
          const responseHeight = responseElement.offsetHeight;
          const containerHeight = container.offsetHeight;

          // Scroll to position that centers the response
          const scrollTo =
            responseTop - containerHeight / 2 + responseHeight / 2;

          container.scrollTo({
            top: scrollTo,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [submittedResponse]);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = (currentIndex + 1) % questions.length;
    setCurrentIndex(nextIndex);
    setCurrentCard(questions[nextIndex]);
    setSubmittedResponse(null);
    setUserResponse("");
  };

  return (
    <div className='flex flex-col gap-2 relative w-full h-full'>
      <div
        ref={scrollContainerRef}
        className='flex flex-col relative cursor-default transform-none gap-4 items-center w-full h-[232px] px-3 overflow-y-auto py-[40px] pb-[80px]'
      >
        <motion.div
          className={`relative bg-card-secondary rounded-[20px] p-3 shadow-card-stacked flex items-start w-full gap-2 inset-0 mx-auto h-fit`}
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
            <div className=' text-sm leading-[1.3] text-[#43250E]/70 dark:text-[#EBE9E7]/50 line-clamp-6'>
              {currentCard.question}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode='wait'>
          {submittedResponse && (
            <div ref={responseRef} className='w-full flex justify-end'>
              <motion.div
                key='response'
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  mass: 0.5,
                }}
                className='rounded-[20px] w-fit p-3.5 py-2 shadow-[0_1px_2px_0_rgba(242,107,56,0.5),0_20px_40px_0_rgba(242,107,56,0.2),0_1px_1px_0_rgba(242,107,56,0.05)] bg-[#F26B38] text-[#fff] text-sm leading-[1.4] ml-12 z-10 right-0 relative'
              >
                {submittedResponse}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode='wait'>
        {submittedResponse ? (
          <motion.div
            key='next-button'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className='absolute rounded-[14px] w-[calc(100%-24px)] h-fit bottom-[12px] p-0.5 flex items-center justify-center pr-2 left-3 z-10 pb-1.5 flex-row gap-1'
          >
            <button
              onClick={handleNextQuestion}
              className='text-sm text-primary text-center bg-card rounded-[16px] h-8 px-3 shadow-sm cursor-pointer hover:opacity-70 active:scale-95'
            >
              Edit response
            </button>
            <button
              onClick={handleNextQuestion}
              className='text-sm text-primary-foreground text-center bg-primary rounded-[16px] h-8 px-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.2),0_20px_40px_0_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.2)] cursor-pointer  hover:opacity-70 active:scale-95'
            >
              Next question
            </button>
          </motion.div>
        ) : (
          <motion.div
            key='input'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className='absolute z-10 rounded-[14px] w-[calc(100%-24px)] h-fit bg-chat-input-background bottom-[12px] p-0.5 shadow-card-primary flex items-center justify-between pr-2 left-3'
          >
            <AutoResizingTextarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder='Type your response...'
              className='w-full focus-visible:ring-0 h-full border-none bg-transparent rounded-[12px] hover:bg-hover-background mr-2'
            />
            <button
              onClick={handleSubmit}
              className='hover:bg-light/80 bg-light rounded-full flex flex-col items-center justify-center w-fit h-fit p-1 bottom-0 hover:opacity-80 cursor-pointer active:scale-95'
            >
              <ArrowUp className='size-5 text-[#8D8D86]' />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
