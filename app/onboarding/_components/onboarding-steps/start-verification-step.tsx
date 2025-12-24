"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingAnimation, useOnboardingSteps } from "../../_context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";

export function StartVerificationStep() {
  const { handleNext } = useOnboardingSteps();
  const { setAnimationState, setTrainingMessage } = useOnboardingAnimation();

  const handleVerifyLinkedIn = () => {
    setAnimationState("training");
    setTrainingMessage("Learning about you...");
    // Wait 1.5 seconds to show the training state before navigating
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full relative w-full'>
      <div className='flex flex-col items-center justify-center gap-8 w-full'>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md w-full'>
          <h1 className='text-3xl font-medium'>Let&apos;s get to know you</h1>
          <p className='text-text-muted font-[480] text-center leading-[140%] text-[15px]'>
            You can only make a Delphi of yourself.
          </p>
        </div>

        {/* LinkedIn Handle Input */}
        <div className='flex flex-col gap-2 w-full max-w-md '>
          <Label htmlFor='linkedin-handle'>LinkedIn Handle</Label>
          <Input
            id='linkedin-handle'
            type='text'
            defaultValue='linkedin.com/in/hyunsolpark'
            className='w-full'
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2 items-center justify-center flex-col w-full mt-4'>
          <Button
            size='lg'
            className='w-full rounded-full max-w-[348px]'
            variant='primary'
            onClick={handleVerifyLinkedIn}
          >
            Verify Using LinkedIn
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='hover:bg-transparent text-text-muted'
          >
            Verify Using Government ID
          </Button>
        </div>

        <div className='mt-8 flex items-center justify-center'>
          <OnboardingPrivacyStatement />
        </div>
      </div>

      {/* Stylized "N" in bottom-right */}
      <div className='absolute bottom-4 right-4'>
        <span className='text-text-muted text-2xl font-medium'>N</span>
      </div>
    </div>
  );
}
