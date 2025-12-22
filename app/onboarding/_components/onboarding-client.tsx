"use client";
import React from "react";
import { useOnboardingSteps } from "@/app/onboarding/_context";
import { ONBOARDING_STEPS } from "@/app/onboarding/_utils/onboarding-steps-config";

export default function OnboardingClient() {
  const { currentStep } = useOnboardingSteps();

  const step = ONBOARDING_STEPS[currentStep];
  const StepComponent = step?.component ?? ONBOARDING_STEPS[0].component;

  return <StepComponent />;
}
