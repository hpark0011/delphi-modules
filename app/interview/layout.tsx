"use client";

import { useRouter } from "next/navigation";
import { InterviewHeader } from "./_components";
import { InterviewProvider, useInterviewContext } from "./_context/interview-context";
import { MindScoreProvider } from "@/app/analytics/_components/mindscore/mind-score-context";
import { TrainingQueueProvider } from "@/app/analytics/_components/mindscore/training-queue-context";
import { MindDialog } from "@/app/analytics/_components/mindscore/mind-dialog";

function InterviewLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { hasResponses } = useInterviewContext();

  const handleExit = () => {
    router.push("/analytics");
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
    <MindScoreProvider>
      <TrainingQueueProvider>
        <MindDialog>
          <InterviewProvider>
            <InterviewLayoutContent>{children}</InterviewLayoutContent>
          </InterviewProvider>
        </MindDialog>
      </TrainingQueueProvider>
    </MindScoreProvider>
  );
}
