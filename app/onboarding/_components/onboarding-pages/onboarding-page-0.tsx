"use client";

import { Button } from "@/components/ui/button";
import { useOnboardingNavigation } from "../../_context/onboarding-navigation-context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";
import { LoadingCircleIcon } from "@/delphi-ui/icons/LoadingCircle";
import { useTrainingAnimation } from "../../_hooks/use-training-animation";

export function OnboardingPage0() {
  const { handleNext } = useOnboardingNavigation();
  const { isLoading, startAnimation } = useTrainingAnimation({
    points: 10,
    onComplete: handleNext,
  });

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      {" "}
      <div className='flex flex-col items-center justify-center gap-8 w-full'>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md w-full'>
          <h1 className='text-3xl font-medium'>Is this you?</h1>
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
            onClick={startAnimation}
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
            className='hover:bg-transparent  hover:text-text-muted'
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
