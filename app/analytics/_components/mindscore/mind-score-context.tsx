"use client";

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";

const LEVEL_THRESHOLDS = [
  { name: "Novice", min: 0 },
  { name: "Skilled", min: 200 },
  { name: "Expert", min: 2000 },
  { name: "Master", min: 10000 },
  { name: "Sage", min: 25000 },
  { name: "Legendary", min: 50000 },
  { name: "Eternal", min: 200000 },
];

interface MindScoreContextType {
  current: number;
  level: string;
  progressToNextLevel: number;
  nextLevelThreshold: number;
  progressCap: number;
  lastIncrement: number | null;
  incrementScore: (points: number) => void;
}

const MindScoreContext = createContext<MindScoreContextType | null>(null);

function calculateLevel(score: number): string {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (score >= LEVEL_THRESHOLDS[i].min) {
      return LEVEL_THRESHOLDS[i].name;
    }
  }
  return LEVEL_THRESHOLDS[0].name;
}

function getCurrentLevelThreshold(score: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (score >= LEVEL_THRESHOLDS[i].min) {
      return LEVEL_THRESHOLDS[i].min;
    }
  }
  return LEVEL_THRESHOLDS[0].min;
}

function getNextLevelThreshold(score: number): number {
  const currentThreshold = getCurrentLevelThreshold(score);
  const currentIndex = LEVEL_THRESHOLDS.findIndex(
    (level) => level.min === currentThreshold
  );
  
  // If at max level, return current threshold (no next level)
  if (currentIndex === LEVEL_THRESHOLDS.length - 1) {
    return currentThreshold;
  }
  
  return LEVEL_THRESHOLDS[currentIndex + 1].min;
}

function getProgressToNextLevel(score: number): number {
  const currentThreshold = getCurrentLevelThreshold(score);
  return Math.max(0, score - currentThreshold);
}

function getProgressCap(score: number): number {
  const currentThreshold = getCurrentLevelThreshold(score);
  const nextThreshold = getNextLevelThreshold(score);
  return nextThreshold - currentThreshold;
}

interface MindScoreProviderProps {
  children: React.ReactNode;
  initialScore?: number;
}

export function MindScoreProvider({
  children,
  initialScore = 110,
}: MindScoreProviderProps) {
  const [current, setCurrent] = useState(initialScore);
  const [lastIncrement, setLastIncrement] = useState<number | null>(null);

  const incrementScore = useCallback((points: number) => {
    setCurrent((prev) => prev + points);
    setLastIncrement(points);
  }, []);

  // Clear increment indicator after 3 seconds
  useEffect(() => {
    if (lastIncrement !== null) {
      const timer = setTimeout(() => {
        setLastIncrement(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lastIncrement]);

  const level = useMemo(() => calculateLevel(current), [current]);
  const nextLevelThreshold = useMemo(
    () => getNextLevelThreshold(current),
    [current]
  );
  const progressToNextLevel = useMemo(
    () => getProgressToNextLevel(current),
    [current]
  );
  const progressCap = useMemo(() => getProgressCap(current), [current]);

  const value = useMemo(
    () => ({
      current,
      level,
      progressToNextLevel,
      nextLevelThreshold,
      progressCap,
      lastIncrement,
      incrementScore,
    }),
    [
      current,
      level,
      progressToNextLevel,
      nextLevelThreshold,
      progressCap,
      lastIncrement,
      incrementScore,
    ]
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

