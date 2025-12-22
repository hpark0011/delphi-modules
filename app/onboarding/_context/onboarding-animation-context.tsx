"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

export type AnimationState =
  | "idle"
  | "training"
  | "showing-plus"
  | "showing-score";

interface OnboardingAnimationContextType {
  animationState: AnimationState;
  setAnimationState: (state: AnimationState) => void;
  trainingMessage: string;
  setTrainingMessage: (message: string) => void;
}

const OnboardingAnimationContext = createContext<
  OnboardingAnimationContextType | undefined
>(undefined);

export function OnboardingAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [animationState, setAnimationState] = useState<AnimationState>("idle");
  const [trainingMessage, setTrainingMessage] = useState("");

  const value = useMemo(
    () => ({
      animationState,
      setAnimationState,
      trainingMessage,
      setTrainingMessage,
    }),
    [animationState, trainingMessage]
  );

  return (
    <OnboardingAnimationContext.Provider value={value}>
      {children}
    </OnboardingAnimationContext.Provider>
  );
}

export function useOnboardingAnimation() {
  const context = useContext(OnboardingAnimationContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingAnimation must be used within OnboardingProviders"
    );
  }
  return context;
}
