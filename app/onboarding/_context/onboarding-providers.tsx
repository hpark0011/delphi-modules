"use client";

import React from "react";
import { OnboardingNavigationProvider } from "./onboarding-navigation-context";
import { OnboardingScoreProvider } from "./onboarding-score-context";
import { OnboardingAnimationProvider } from "./onboarding-animation-context";

export function OnboardingProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingNavigationProvider>
      <OnboardingScoreProvider>
        <OnboardingAnimationProvider>{children}</OnboardingAnimationProvider>
      </OnboardingScoreProvider>
    </OnboardingNavigationProvider>
  );
}
