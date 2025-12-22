"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ONBOARDING_STEPS_COUNT } from "../_utils/onboarding-steps-config";

interface OnboardingNavigationContextType {
  currentPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const OnboardingNavigationContext = createContext<
  OnboardingNavigationContextType | undefined
>(undefined);

export function OnboardingNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) =>
      prev < ONBOARDING_STEPS_COUNT - 1 ? prev + 1 : prev
    );
  }, []);

  const value = useMemo(
    () => ({
      currentPage,
      handlePrevious,
      handleNext,
    }),
    [currentPage, handlePrevious, handleNext]
  );

  return (
    <OnboardingNavigationContext.Provider value={value}>
      {children}
    </OnboardingNavigationContext.Provider>
  );
}

export function useOnboardingNavigation() {
  const context = useContext(OnboardingNavigationContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingNavigation must be used within OnboardingProviders"
    );
  }
  return context;
}
