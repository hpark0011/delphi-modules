import React from "react";
import { NameSearchStep } from "@/app/onboarding/_components/onboarding-steps/name-search-step";
import { MindScoreStep } from "@/app/onboarding/_components/onboarding-steps/mind-score-step";
import { ContentScrapingStep } from "@/app/onboarding/_components/onboarding-steps/content-scraping-step";
import { StartVerificationStep } from "@/app/onboarding/_components/onboarding-steps/start-verification-step";

export type OnboardingStepConfig = {
  component: React.ComponentType;
};

// Step identifiers as a union type for type safety
export type OnboardingStepId =
  | "StartVerification"
  | "NameSearch"
  | "MindScore"
  | "ContentScraping";

// Registry mapping IDs to step configs
const STEP_REGISTRY: Record<OnboardingStepId, OnboardingStepConfig> = {
  StartVerification: { component: StartVerificationStep },
  NameSearch: { component: NameSearchStep },
  MindScore: { component: MindScoreStep },
  ContentScraping: { component: ContentScrapingStep },
};

// Simple order array - easy to reorganize
export const ONBOARDING_STEP_ORDER: OnboardingStepId[] = [
  "StartVerification",
  "NameSearch",
  "MindScore",
  "ContentScraping",
];

// Derived array built from order
export const ONBOARDING_STEPS: OnboardingStepConfig[] =
  ONBOARDING_STEP_ORDER.map((id) => STEP_REGISTRY[id]);

export const ONBOARDING_STEPS_COUNT = ONBOARDING_STEPS.length;
