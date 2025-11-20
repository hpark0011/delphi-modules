"use client";

// import { useSearchParams } from "next/navigation";

// import { OnboardingProgressBar } from "@delphi/ui";

import { InterviewLoadingImg } from "./interview-loading-img";
import LoadingText from "./interview-loading-text";

export function InterviewLoadingAnimation() {
  // const fromOnboarding = useSearchParams().get("fromOnboarding") === "true";

  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-sand-1'>
      {/* {fromOnboarding && (
        <OnboardingProgressBar
          currentStep="interview"
          version="v2"
          className="absolute top-0 left-0"
        />
      )} */}
      <div className='relative flex flex-col gap-8 min-w-[350px] items-center'>
        {/* Single grid container for all dots - much more performant */}
        <InterviewLoadingImg />

        <LoadingText />
      </div>
    </div>
  );
}
