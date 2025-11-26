import { Button } from "@/components/ui/button";

export function OnboardingPage2() {
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

        {/* Button */}
        <div className='flex gap-2 items-center justify-center'>
          <Button
            size='lg'
            className='w-full rounded-full max-w-[348px]'
            variant='secondary'
          >
            Don't add
          </Button>
          <Button
            size='lg'
            className='w-full rounded-full max-w-[348px]'
            variant='primary'
          >
            Add this
          </Button>
        </div>
      </div>
    </div>
  );
}
