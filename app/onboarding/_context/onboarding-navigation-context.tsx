"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ONBOARDING_STEPS_COUNT } from "../_utils/onboarding-steps-config";

export type AnimationState =
  | "idle"
  | "training"
  | "showing-plus"
  | "showing-score";

interface OnboardingNavigationContextType {
  currentPage: number;
  mindScore: number;
  animationState: AnimationState;
  trainingMessage: string;
  handlePrevious: () => void;
  handleNext: () => void;
  addMindScore: (points: number) => void;
  setAnimationState: (state: AnimationState) => void;
  setTrainingMessage: (message: string) => void;
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
  const [animationState, setAnimationState] = useState<AnimationState>("idle");
  const [trainingMessage, setTrainingMessage] = useState("");

  const handlePrevious = useCallback(() => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) =>
      prev < ONBOARDING_STEPS_COUNT - 1 ? prev + 1 : prev
    );
  }, []);

  const addMindScore = useCallback((points: number) => {
    setMindScore((prev) => prev + points);
  }, []);

  return (
    <OnboardingNavigationContext.Provider
      value={{
        currentPage,
        mindScore,
        animationState,
        trainingMessage,
        handlePrevious,
        handleNext,
        addMindScore,
        setAnimationState,
        setTrainingMessage,
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
