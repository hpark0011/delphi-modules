"use client";

import { AnimatePresence } from "framer-motion";
import { OnboardingMindWidgetHelloLabel } from "./onboarding-mind-widget-hello-label";
import { OnboardingMindWidgetPlusTen } from "./onboarding-mind-widget-plus-ten";
import { OnboardingMindWidgetScore } from "./onboarding-mind-widget-score";

interface OnboardingMindWidgetContentProps {
  showGreeting: boolean;
  showPlusTen: boolean;
  mindScore: number;
  shouldRollIn: boolean;
}

export function OnboardingMindWidgetContent({
  showGreeting,
  showPlusTen,
  mindScore,
  shouldRollIn,
}: OnboardingMindWidgetContentProps) {
  return (
    <AnimatePresence mode="wait">
      {showGreeting ? (
        <OnboardingMindWidgetHelloLabel />
      ) : showPlusTen ? (
        <OnboardingMindWidgetPlusTen />
      ) : (
        <OnboardingMindWidgetScore
          mindScore={mindScore}
          shouldRollIn={shouldRollIn}
        />
      )}
    </AnimatePresence>
  );
}
