"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ONBOARDING_STEPS_COUNT } from "../_utils/onboarding-steps-config";

interface OnboardingStepsContextType {
  currentStep: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const OnboardingStepsContext = createContext<
  OnboardingStepsContextType | undefined
>(undefined);

export function OnboardingStepsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) =>
      prev < ONBOARDING_STEPS_COUNT - 1 ? prev + 1 : prev
    );
  }, []);

  const value = useMemo(
    () => ({
      currentStep,
      handlePrevious,
      handleNext,
    }),
    [currentStep, handlePrevious, handleNext]
  );

  return (
    <OnboardingStepsContext.Provider value={value}>
      {children}
    </OnboardingStepsContext.Provider>
  );
}

export function useOnboardingSteps() {
  const context = useContext(OnboardingStepsContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingSteps must be used within OnboardingProviders"
    );
  }
  return context;
}
