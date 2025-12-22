"use client";

// import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/delphi-ui/icons/ArrowLeft";
import {
  useOnboardingNavigation,
  useOnboardingScore,
  useOnboardingAnimation,
} from "@/app/onboarding/_context";
import { OnboardingMindWidget } from "./onboarding-mind-widget/onboarding-mind-widget";

export function OnboardingHeader() {
  const { handlePrevious, currentPage } = useOnboardingNavigation();
  const { mindScore } = useOnboardingScore();
  const { animationState } = useOnboardingAnimation();

  return (
    <header className='bg-gradient-to-b from-background via-background/80 to-transparent absolute top-0 left-0 right-0 z-10'>
      <div className='flex items-start justify-center px-3 h-13 relative w-full'>
        {/* Previous step button */}
        <Button
          size='sm'
          onClick={handlePrevious}
          className='gap-1 rounded-full h-10 w-10 has-[>svg]:px-3 hover:bg-light absolute left-2 mt-2.5 bg-light'
          variant='ghost'
        >
          <ArrowLeftIcon className='size-5 text-icon-medium' />
        </Button>

        {/* Desktop: Show "Interview" title */}
        <OnboardingMindWidget
          currentPage={currentPage}
          mindScore={mindScore}
          isLuminating={animationState === "training"}
          isGlowing={false}
        />
      </div>
    </header>
  );
}
