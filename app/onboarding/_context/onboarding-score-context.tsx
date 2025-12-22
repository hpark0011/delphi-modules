"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

interface OnboardingScoreContextType {
  mindScore: number;
  addMindScore: (points: number) => void;
}

const OnboardingScoreContext = createContext<
  OnboardingScoreContextType | undefined
>(undefined);

export function OnboardingScoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mindScore, setMindScore] = useState(0);

  const addMindScore = useCallback((points: number) => {
    setMindScore((prev) => prev + points);
  }, []);

  const value = useMemo(
    () => ({
      mindScore,
      addMindScore,
    }),
    [mindScore, addMindScore]
  );

  return (
    <OnboardingScoreContext.Provider value={value}>
      {children}
    </OnboardingScoreContext.Provider>
  );
}

export function useOnboardingScore() {
  const context = useContext(OnboardingScoreContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingScore must be used within OnboardingProviders"
    );
  }
  return context;
}
