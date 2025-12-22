"use client";

import React from "react";
import { OnboardingStepsProvider } from "./onboarding-steps-context";
import { OnboardingScoreProvider } from "./onboarding-score-context";
import { OnboardingAnimationProvider } from "./onboarding-animation-context";

export function OnboardingProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingStepsProvider>
      <OnboardingScoreProvider>
        <OnboardingAnimationProvider>{children}</OnboardingAnimationProvider>
      </OnboardingScoreProvider>
    </OnboardingStepsProvider>
  );
}
