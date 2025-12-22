import { Button } from "@/components/ui/button";
import { useOnboardingSteps } from "../../_context";
import { OnboardingPrivacyStatement } from "../onboarding-privacy-statement";

export function MindScoreStep() {
  const { handleNext } = useOnboardingSteps();
  return (
    <div className='flex flex-col items-center justify-center gap-[80px] relative translate-y-[50%]'>
      <div className='flex flex-col items-center justify-center gap-8 '>
        {/* Heading and description */}
        <div className='flex flex-col gap-4 items-center justify-center max-w-md'>
          <h1 className='text-3xl font-medium'>This is your Mind Score.</h1>
          <p className='text-text-tertiary font-[480] text-center leading-[140%] text-[18px]'>
            Add content to your mind to increase your score.
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
