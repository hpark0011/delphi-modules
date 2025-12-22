"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useOnboardingSteps,
  useOnboardingAnimation,
  useOnboardingScore,
} from "../../_context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";
import { LoadingCircleIcon } from "@/delphi-ui/icons/LoadingCircle";

export function NameSearchStep() {
  const { handleNext } = useOnboardingSteps();
  const { setAnimationState } = useOnboardingAnimation();
  const { addMindScore } = useOnboardingScore();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);

    // Step 1: Show +10 for 1 second
    setAnimationState("showing-plus");

    setTimeout(() => {
      // Step 2: Show score and add points
      setAnimationState("showing-score");
      addMindScore(10);

      setTimeout(() => {
        // Step 3: Hide training status (set to idle)
        setAnimationState("idle");

        setTimeout(() => {
          // Step 4: Go to next page
          setIsLoading(false);
          handleNext();
        }, 500);
      }, 1000);
    }, 1000);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      {" "}
      <div className='flex flex-col items-center justify-center gap-8 w-full'>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md w-full'>
          <h1 className='text-3xl font-medium'>Tell us about yourself</h1>
          <p className='text-text-muted font-[480] text-center leading-[140%] text-[15px]'>
            We&apos;ll use the basics here to start training Digital Hyunsol.
          </p>
        </div>

        <div className='h-[236px] w-[400px] rounded-2xl bg-light shadow-xl my-8' />

        {/* Button */}
        <div className='flex gap-2 items-center justify-center flex-col w-full'>
          <Button
            size='lg'
            className='w-full rounded-full max-w-[348px]'
            variant='primary'
            onClick={handleContinue}
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingCircleIcon className='size-5 animate-spin' />
            ) : (
              "Continue"
            )}
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='hover:bg-transparent text-text-muted'
          >
            Not you? Search again
          </Button>
        </div>

        <div className='mt-8 flex items-center justify-center '>
          <OnboardingPrivacyStatement />
        </div>
      </div>
    </div>
  );
}
