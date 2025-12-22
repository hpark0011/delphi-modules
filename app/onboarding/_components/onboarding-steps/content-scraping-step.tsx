"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnboardingAnimation } from "../../_context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";

export function ContentScrapingStep() {
  const { setAnimationState, setTrainingMessage } = useOnboardingAnimation();
  const [addCount, setAddCount] = useState(0);

  const handleAddContent = () => {
    const newCount = addCount + 1;
    setAddCount(newCount);
    setAnimationState("training");
    setTrainingMessage(`Learning ${newCount}`);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center gap-8'>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md'>
          <h1 className='text-3xl font-medium'>Is this your content?</h1>
          <p className='text-text-muted font-[480] text-center leading-[140%] text-[15px]'>
            Train your digital mind with this account.
          </p>
        </div>

        <div className='h-[236px] w-[400px] rounded-2xl bg-light shadow-xl my-8' />

        {/* Button */}
        <div className='flex gap-2 items-center justify-center'>
          <Button
            size='lg'
            className='w-full rounded-full max-w-[348px]'
            variant='secondary'
          >
            Don&apos;t add
          </Button>
          <Button
            size='lg'
            className='w-full rounded-full max-w-[348px]'
            variant='primary'
            onClick={handleAddContent}
          >
            Add this
          </Button>
        </div>

        <div className='mt-8 flex items-center justify-center '>
          <OnboardingPrivacyStatement />
        </div>
      </div>
    </div>
  );
}
