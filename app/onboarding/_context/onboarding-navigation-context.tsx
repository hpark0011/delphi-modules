"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface OnboardingNavigationContextType {
  currentPage: number;
  mindScore: number;
  handlePrevious: () => void;
  handleNext: () => void;
  addMindScore: (points: number) => void;
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
  const [mindScore, setMindScore] = useState(0);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => (prev < 3 ? prev + 1 : prev));
  }, []);

  const addMindScore = useCallback((points: number) => {
    setMindScore((prev) => prev + points);
  }, []);

  return (
    <OnboardingNavigationContext.Provider
      value={{
        currentPage,
        mindScore,
        handlePrevious,
        handleNext,
        addMindScore,
      }}
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
