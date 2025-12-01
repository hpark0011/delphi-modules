"use client";

import { useTransitionRouter } from "next-view-transitions";
import { useCallback } from "react";

import type { Question } from "@/app/profile/_lib/types";
import { ChatAltIcon } from "@/delphi-ui/icons";
import { cn } from "@/lib/utils";

interface ProfileQuestionsProps {
  questions: Question[];
  slug: string;
}

export function ProfileQuestions({ questions, slug }: ProfileQuestionsProps) {
  const router = useTransitionRouter();

  const handleQuestionClick = useCallback(
    (question: string, index: number) => {
      router.push(`/${slug}/talk?q=${encodeURIComponent(question)}`);
    },
    [slug, router]
  );

  if (!questions || questions.length === 0) return null;

  return (
    <div className='pb-3 mb-8 bg-sand-9/5 rounded-none p-6 pt-4 -ml-5.5 -mr-5.5 md:rounded-[30px]'>
      <div className='flex items-center justify-between pb-4'>
        <h2 id='questions-section' className='text-xl font-[580] text-sand-12'>
          <span className='inline-flex items-center gap-2 transition-opacity duration-300'>
            <ChatAltIcon className='size-4' />
            Questions
          </span>
        </h2>
      </div>

      <div className={cn("flex flex-row flex-wrap gap-2 -ml-4 -mr-4")}>
        {questions.map((question, index) => (
          <button
            key={question.id}
            type='button'
            onClick={() => handleQuestionClick(question.question, index)}
            className='cursor-pointer w-fit rounded-[20px] bg-sand-11/5 px-4 py-3 text-left text-sand-12 hover:bg-sand-10/10 animate-in fade-in slide-in-from-bottom-4 text-[18px] transition-all duration-400 active:scale-95'
            style={{
              animationDelay: `${(index + 1) * 80}ms`,
              animationDuration: "500ms",
              animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              animationFillMode: "backwards",
            }}
          >
            {question.question}
          </button>
        ))}
      </div>
    </div>
  );
}
