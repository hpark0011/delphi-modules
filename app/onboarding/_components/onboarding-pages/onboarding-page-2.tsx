"use client";

import { Button } from "@/components/ui/button";
import { useOnboardingNavigation } from "../../_context/onboarding-navigation-context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";
import { LoadingCircleIcon } from "@/delphi-ui/icons/LoadingCircle";
import { useTrainingAnimation } from "../../_hooks/use-training-animation";

export function OnboardingPage2() {
  const { handleNext } = useOnboardingNavigation();
  const { isLoading, startAnimation } = useTrainingAnimation({
    points: 10,
    onComplete: handleNext,
  });

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center gap-8'>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md'>
          <h1 className='text-3xl font-medium'>Is this your account?</h1>
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
            disabled={isLoading}
          >
            Don&apos;t add
          </Button>
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
              "Add this"
            )}
          </Button>
        </div>

        <div className='mt-8 flex items-center justify-center '>
          <OnboardingPrivacyStatement />
        </div>
      </div>
    </div>
  );
}
