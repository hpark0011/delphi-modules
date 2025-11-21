"use client";

import { useRouter } from "next/navigation";
import { InterviewHeader } from "./_components";

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleExit = () => {
    router.push("/analytics");
  };

  return (
    <div className='h-screen flex flex-col bg-background'>
      <InterviewHeader onExit={handleExit} />
      <div className='flex-1 flex overflow-hidden'>{children}</div>
    </div>
  );
}
