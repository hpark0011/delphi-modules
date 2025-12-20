import React from "react";
import { NameSearchStep } from "@/app/onboarding/_components/onboarding-steps/name-search-step";
import { MindScoreStep } from "@/app/onboarding/_components/onboarding-steps/mind-score-step";
import { ContentScrapingStep } from "@/app/onboarding/_components/onboarding-steps/content-scraping-step";
// import { NewUseCaseStep } from "@/app/onboarding/_components/onboarding-steps/new-use-case-step";
import { StartVerificationStep } from "@/app/onboarding/_components/onboarding-steps/start-verification-step";

export type OnboardingStepConfig = {
  component: React.ComponentType;
  showLargeWidget?: boolean;
};

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  { component: StartVerificationStep },
  { component: NameSearchStep },
  { component: MindScoreStep, showLargeWidget: true },
  { component: ContentScrapingStep },
  // { component: NewUseCaseStep },
];

export const ONBOARDING_STEPS_COUNT = ONBOARDING_STEPS.length;
