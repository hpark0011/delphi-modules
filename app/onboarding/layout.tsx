import { MindDialog } from "@/components/mind-dialog/mind-dialog";
import { OnboardingHeader } from "@/app/onboarding/_components/onboarding-header";
import { OnboardingNavigationProvider } from "@/app/onboarding/_context/onboarding-navigation-context";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MindDialog>
      <OnboardingNavigationProvider>
        <div className='h-screen flex flex-col bg-background'>
          <OnboardingHeader />
          {children}
        </div>
      </OnboardingNavigationProvider>
    </MindDialog>
  );
}
