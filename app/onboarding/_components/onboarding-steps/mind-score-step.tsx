import { Button } from "@/components/ui/button";
import { useOnboardingNavigation } from "../../_context/onboarding-navigation-context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";

export function MindScoreStep() {
  const { handleNext } = useOnboardingNavigation();
  return (
    <div className='flex flex-col items-center justify-center gap-[80px] relative translate-y-[50%]'>
      <div className='flex flex-col items-center justify-center gap-8 '>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md'>
          <h1 className='text-3xl font-medium'>
            Digital Hyunsol is in training.
          </h1>
          <p className='text-text-muted font-[480] text-center leading-[140%] text-[15px]'>
            Your Mind Score tracks how much Digital Hyunsol knows about you.
            Start at Novice, reach Skilled.
          </p>
        </div>

        {/* Button */}
        <div className='flex flex-col gap-2 items-center justify-center w-full'>
          <Button
            size='lg'
            className='w-full rounded-full max-w-[348px]'
            variant='primary'
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>

        <div className='mt-8 flex items-center justify-center '>
          <OnboardingPrivacyStatement />
        </div>
      </div>
    </div>
  );
}
