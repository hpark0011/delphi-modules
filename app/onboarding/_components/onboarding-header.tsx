"use client";

// import { MindWidgetSmall } from "@/components/mind-widget/mind-widget-small";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/delphi-ui/icons/ArrowLeft";
import { useOnboardingNavigation } from "@/app/onboarding/_context/onboarding-navigation-context";
import { OnboardingMindWidget } from "./onboarding-mind-widget";

export function OnboardingHeader() {
  const { handlePrevious, currentPage } = useOnboardingNavigation();

  return (
    <header className='bg-gradient-to-b from-background via-background/80 to-transparent absolute top-0 left-0 right-0 z-10'>
      <div className='flex items-start justify-center px-3 h-13 relative w-full'>
        <Button
          size='sm'
          onClick={handlePrevious}
          className='gap-1 rounded-full h-7 has-[>svg]:px-3 hover:opacity-70 absolute left-2 mt-2.5'
          variant='ghost'
        >
          <ArrowLeftIcon className='size-4 text-icon-medium' />
        </Button>

        {/* Desktop: Show "Interview" title */}
        <OnboardingMindWidget currentPage={currentPage} />
        {/* <MindWidgetSmall /> */}
        {/* <h1 className='text-sm font-medium hidden md:block'>Interview</h1> */}
      </div>
    </header>
  );
}
