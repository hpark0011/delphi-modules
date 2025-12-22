"use client";
import React from "react";
import { useOnboardingNavigation } from "@/app/onboarding/_context";
import { ONBOARDING_STEPS } from "@/app/onboarding/_utils/onboarding-steps-config";

export default function OnboardingClient() {
  const { currentPage } = useOnboardingNavigation();

  const currentStep = ONBOARDING_STEPS[currentPage];
  const StepComponent = currentStep?.component ?? ONBOARDING_STEPS[0].component;

  return <StepComponent />;
}
