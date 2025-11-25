import { MindWidgetLarge } from "@/components/mind-widget/mind-widget-large";

export function OnboardingPage1() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      {/* Heading and description */}
      <div className='flex flex-col gap-2 items-center justify-center'>
        <h1 className='text-2xl font-medium'>
          Digital Hyunsol is in training.
        </h1>
        <p className='text-text-tertiary'>
          Your Mind Score tracks how much Digital Hyunsol knows about you. Start
          at Novice, reach Skilled.
        </p>
      </div>

      {/* Mind Widget */}
      <MindWidgetLarge />
    </div>
  );
}
