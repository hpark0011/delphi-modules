"use client";

import React, { createContext, useContext, useState, useMemo, useCallback } from "react";

interface MindScoreContextType {
  current: number;
  total: number;
  level: string;
  incrementScore: (points: number) => void;
}

const MindScoreContext = createContext<MindScoreContextType | null>(null);

function calculateLevel(score: number): string {
  if (score >= 151) {
    return "Master";
  } else if (score >= 101) {
    return "Advanced";
  } else if (score >= 51) {
    return "Intermediate";
  } else {
    return "Beginner";
  }
}

interface MindScoreProviderProps {
  children: React.ReactNode;
  initialScore?: number;
  total?: number;
}

export function MindScoreProvider({
  children,
  initialScore = 110,
  total = 200,
}: MindScoreProviderProps) {
  const [current, setCurrent] = useState(initialScore);

  const incrementScore = useCallback(
    (points: number) => {
      setCurrent((prev) => Math.min(prev + points, total));
    },
    [total]
  );

  const level = useMemo(() => calculateLevel(current), [current]);

  const value = useMemo(
    () => ({
      current,
      total,
      level,
      incrementScore,
    }),
    [current, total, level, incrementScore]
  );

  return (
    <MindScoreContext.Provider value={value}>
      {children}
    </MindScoreContext.Provider>
  );
}

export function useMindScore() {
  const context = useContext(MindScoreContext);
  if (!context) {
    throw new Error("useMindScore must be used within MindScoreProvider");
  }
  return context;
}

