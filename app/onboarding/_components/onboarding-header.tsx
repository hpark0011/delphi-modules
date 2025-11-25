"use client";

import { Button } from "@/components/ui/button";
import { ExitIcon } from "@/delphi-ui/icons/Exit";
import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";
import { useOnboardingNavigation } from "../_context/onboarding-navigation-context";

interface OnboardingHeaderProps {
  onExit?: () => void;
  hasResponses?: boolean;
}

export function OnboardingHeader({
  onExit,
  hasResponses = false,
}: OnboardingHeaderProps) {
  const { handlePrevious, handleNext } = useOnboardingNavigation();

  return (
    <header className='bg-gradient-to-b from-background via-background/80 to-transparent absolute top-0 left-0 right-0 z-10'>
      <div className='flex items-center justify-between px-3 h-13'>
        <Button
          size='sm'
          onClick={handlePrevious}
          className='gap-1 rounded-full h-7 has-[>svg]:px-3 hover:opacity-70'
          variant='secondary'
        >
          Before
        </Button>

        {/* Desktop: Show "Interview" title */}
        <MindWidgetSmall />
        {/* <h1 className='text-sm font-medium hidden md:block'>Interview</h1> */}

        {/* Save & Exit button - right aligned */}
        <div className='justify-end'>
          <Button
            size='sm'
            onClick={handleNext}
            className='gap-1 rounded-full h-7 has-[>svg]:px-3 hover:opacity-70'
            variant='secondary'
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
