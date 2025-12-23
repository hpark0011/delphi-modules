import { MindDialog } from "@/components/mind-dialog/mind-dialog-2";
import { OnboardingHeader } from "@/app/onboarding/_components/onboarding-header";
import { OnboardingProviders } from "@/app/onboarding/_context";
import "./_styles/mind-widget.styles.css";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MindDialog>
      <OnboardingProviders>
        <div className='h-screen flex flex-col bg-background'>
          <OnboardingHeader />
          {children}
        </div>
      </OnboardingProviders>
    </MindDialog>
  );
}
