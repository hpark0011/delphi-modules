"use client";

import { AnimatePresence } from "framer-motion";
import { OnboardingMindWidgetHelloLabel } from "./onboarding-mind-widget-hello-label";
import { OnboardingMindWidgetPlusTen } from "./onboarding-mind-widget-plus-ten";
import { OnboardingMindWidgetScore } from "./onboarding-mind-widget-score";

interface OnboardingMindWidgetContentProps {
  showLabel: boolean;
  showPlusTen: boolean;
  isLarge: boolean;
  mindScore: number;
  shouldRollIn: boolean;
}

export function OnboardingMindWidgetContent({
  showLabel,
  showPlusTen,
  isLarge,
  mindScore,
  shouldRollIn,
}: OnboardingMindWidgetContentProps) {
  return (
    <AnimatePresence mode='wait'>
      {showLabel ? (
        <OnboardingMindWidgetHelloLabel />
      ) : showPlusTen ? (
        <OnboardingMindWidgetPlusTen isLarge={isLarge} />
      ) : (
        <OnboardingMindWidgetScore
          mindScore={mindScore}
          isLarge={isLarge}
          shouldRollIn={shouldRollIn}
        />
      )}
    </AnimatePresence>
  );
}
