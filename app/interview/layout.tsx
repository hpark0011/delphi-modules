"use client";

import { useRouter } from "next/navigation";
import { InterviewHeader } from "./_components";
import {
  InterviewProvider,
  useInterviewContext,
} from "./_context/interview-context";
import { MindDialog } from "@/components/mind-dialog/mind-dialog";

function InterviewLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { hasResponses } = useInterviewContext();

  const handleExit = () => {
    router.push("/studio");
  };

  return (
    <div className='h-screen flex flex-col bg-background'>
      <InterviewHeader onExit={handleExit} hasResponses={hasResponses} />
      <div className='flex-1 flex overflow-hidden'>{children}</div>
    </div>
  );
}

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MindDialog>
      <InterviewProvider>
        <InterviewLayoutContent>{children}</InterviewLayoutContent>
      </InterviewProvider>
    </MindDialog>
  );
}
