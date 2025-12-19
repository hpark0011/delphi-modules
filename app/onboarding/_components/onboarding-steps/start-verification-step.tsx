"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboardingNavigation } from "../../_context/onboarding-navigation-context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";
import { FilterIcon } from "@/delphi-ui/icons/Filter";

export function StartVerificationStep() {
  const { handleNext } = useOnboardingNavigation();

  return (
    <div className='flex flex-col items-center justify-center h-full relative'>
      <div className='flex flex-col items-center justify-center gap-8 w-full'>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md w-full'>
          <h1 className='text-3xl font-medium'>Let&apos;s get to know you</h1>
          <p className='text-text-muted font-[480] text-center leading-[140%] text-[15px]'>
            You can only make a Delphi of yourself.
          </p>
        </div>

        {/* LinkedIn Handle Input */}
        <div className='flex flex-col gap-2 w-full max-w-md'>
          <Label htmlFor='linkedin-handle'>LinkedIn Handle</Label>
          <Input
            id='linkedin-handle'
            type='text'
            defaultValue='linkedin.com/in/hyunsolpark'
            className='w-full'
          />
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2 items-center justify-center flex-col w-full'>
          <Button
            size='lg'
            className='w-full rounded-full max-w-[348px]'
            variant='primary'
            onClick={handleNext}
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

      {/* Decorative Elements */}
      {/* Settings/Filter icon on middle-right */}
      <div className='absolute right-4 top-1/2 -translate-y-1/2'>
        <FilterIcon className='size-5 text-icon-medium' />
      </div>

      {/* Stylized "N" in bottom-right */}
      <div className='absolute bottom-4 right-4'>
        <span className='text-text-muted text-2xl font-medium'>N</span>
      </div>
    </div>
  );
}
