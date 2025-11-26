"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

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
    setCurrentPage((prev) => (prev < 3 ? prev + 1 : prev));
  }, []);

  return (
    <OnboardingNavigationContext.Provider
      value={{ currentPage, handlePrevious, handleNext }}
    >
      {children}
    </OnboardingNavigationContext.Provider>
  );
}

export function useOnboardingNavigation() {
  const context = useContext(OnboardingNavigationContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingNavigation must be used within OnboardingNavigationProvider"
    );
  }
  return context;
}
