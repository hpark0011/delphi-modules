"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuestionListItem } from "@/components/analytics/question-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended questions data
const allQuestions = [
  {
    id: 1,
    question: "What elements contribute to an intuitive interface?",
    conversations: 132,
    trendRate: 32.1,
    isPositive: true,
  },
  {
    id: 2,
    question: "What innovative techniques can improve product design?",
    conversations: 99,
    trendRate: 12.5,
    isPositive: true,
  },
  {
    id: 3,
    question: "In what ways can user testing shape design decisions?",
    conversations: 87,
    trendRate: 2.1,
    isPositive: true,
  },
  {
    id: 4,
    question: "How does minimalism influence the overall user experience?",
    conversations: 67,
    trendRate: 25.9,
    isPositive: true,
  },
  {
    id: 5,
    question: "Which software tools are essential for effective design collaboration?",
    conversations: 45,
    trendRate: 8.6,
    isPositive: true,
  },
  {
    id: 6,
    question: "How do you test a design's effectiveness?",
    conversations: 32,
    trendRate: 11.4,
    isPositive: true,
  },
  {
    id: 7,
    question: "What are the key principles of responsive design?",
    conversations: 28,
    trendRate: 10.4,
    isPositive: true,
  },
  {
    id: 8,
    question: "How can accessibility be integrated from the start?",
    conversations: 26,
    trendRate: 18.2,
    isPositive: true,
  },
  {
    id: 9,
    question: "What role does typography play in user engagement?",
    conversations: 24,
    trendRate: 5.3,
    isPositive: true,
  },
  {
    id: 10,
    question: "How do you balance aesthetics with functionality?",
    conversations: 22,
    trendRate: 3.8,
    isPositive: false,
  },
  {
    id: 11,
    question: "What are the best practices for mobile-first design?",
    conversations: 21,
    trendRate: 15.7,
    isPositive: true,
  },
  {
    id: 12,
    question: "How can animation enhance user experience without distraction?",
    conversations: 19,
    trendRate: 7.2,
    isPositive: true,
  },
  {
    id: 13,
    question: "What makes a design system scalable?",
    conversations: 18,
    trendRate: 22.4,
    isPositive: true,
  },
  {
    id: 14,
    question: "How do you handle design feedback effectively?",
    conversations: 17,
    trendRate: 4.1,
    isPositive: false,
  },
  {
    id: 15,
    question: "What are the emerging trends in UX design?",
    conversations: 16,
    trendRate: 9.6,
    isPositive: true,
  },
  {
    id: 16,
    question: "How can micro-interactions improve user satisfaction?",
    conversations: 15,
    trendRate: 13.2,
    isPositive: true,
  },
  {
    id: 17,
    question: "What's the importance of user personas in design?",
    conversations: 14,
    trendRate: 6.5,
    isPositive: true,
  },
  {
    id: 18,
    question: "How do you create effective user onboarding?",
    conversations: 13,
    trendRate: 8.9,
    isPositive: true,
  },
  {
    id: 19,
    question: "What are the challenges in cross-platform design?",
    conversations: 12,
    trendRate: 2.7,
    isPositive: false,
  },
  {
    id: 20,
    question: "How can data inform design decisions?",
    conversations: 11,
    trendRate: 11.8,
    isPositive: true,
  },
];

export function QuestionsDialog({
  open,
  onOpenChange,
}: QuestionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Popular Questions</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="flex flex-col">
            {allQuestions.map((question, index) => (
              <QuestionListItem
                key={question.id}
                index={index}
                question={question.question}
                conversations={question.conversations}
                trendRate={question.trendRate}
                isPositive={question.isPositive}
              />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}