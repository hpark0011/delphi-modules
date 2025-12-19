"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";
import { LoadingCircleIcon } from "@/delphi-ui/icons/LoadingCircle";
import { useTrainingAnimation } from "../../_hooks/use-training-animation";

const options = [
  "Help My Team",
  "Support My Customers",
  "Engage & Filter Prospects",
  "Teach My Students",
  "Coach & Mentor",
  "Promote My Business",
  "Preserve My Life Story",
  "Showcase My Knowledge",
  "Not Sure Yet",
  "Other",
];

export function NewUseCaseStep() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleComplete = useCallback(() => {
    router.push("/studio");
  }, [router]);

  const { isLoading, startAnimation } = useTrainingAnimation({
    points: 10,
    message: "Learning your goals.",
    onComplete: handleComplete,
  });

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      }
      if (prev.length < 3) {
        return [...prev, option];
      }
      return prev;
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center gap-8 w-full max-w-2xl px-4'>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md w-full'>
          <h1 className='text-3xl font-medium text-center'>
            What should your <br /> Delphi help you do?
          </h1>
          <div className='flex flex-col gap-1 items-center justify-center'>
            <p className='text-text-muted font-[480] text-center leading-[140%] text-[15px]'>
              Delphi can be shaped in different directions. <br /> Choose up to
              3 areas where you want it to stand out.
            </p>
          </div>
        </div>

        {/* Options grid */}
        <div className='flex gap-2 gap-x-1 w-full flex-wrap justify-center my-4 mb-6'>
          {options.map((option) => (
            <Button
              key={option}
              variant='glossyWhite'
              className={`w-fit rounded-full h-auto py-3 px-4 text-sm font-medium transition-all ${
                selectedOptions.includes(option)
                  ? "bg-accent text-accent-foreground border-border"
                  : "bg-light hover:bg-accent/50"
              }`}
              onClick={() => toggleOption(option)}
              disabled={
                isLoading ||
                (!selectedOptions.includes(option) &&
                  selectedOptions.length >= 3)
              }
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Continue button */}
        <div className='flex flex-col gap-2 items-center justify-center w-full'>
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
        </div>

        <div className='mt-8 flex items-center justify-center '>
          <OnboardingPrivacyStatement />
        </div>
      </div>
    </div>
  );
}
