"use client";

import { useState, useEffect, useCallback } from "react";
import { useOnboardingScore, useOnboardingAnimation } from "../_context";

// Animation timing constants (in milliseconds)
const TRAINING_DURATION = 1500;
const PLUS_DURATION = 1000;
const SCORE_DURATION = 1000;

interface UseTrainingAnimationOptions {
  points?: number;
  message?: string;
  onComplete: () => void;
}

export function useTrainingAnimation({
  points = 10,
  message,
  onComplete,
}: UseTrainingAnimationOptions) {
  const { addMindScore } = useOnboardingScore();
  const { setAnimationState, setTrainingMessage } = useOnboardingAnimation();
  const [isLoading, setIsLoading] = useState(false);

  const startAnimation = useCallback(() => {
    if (message) setTrainingMessage(message);
    setIsLoading(true);
    setAnimationState("training");
  }, [setAnimationState, setTrainingMessage, message]);

  useEffect(() => {
    if (!isLoading) return;

    // Step 1: Show training status
    const trainingTimeout = setTimeout(() => {
      setAnimationState("showing-plus");
    }, TRAINING_DURATION);

    // Step 2: Show +10 and add score
    const plusTimeout = setTimeout(() => {
      setAnimationState("showing-score");
      addMindScore(points);
    }, TRAINING_DURATION + PLUS_DURATION);

    // Step 3: Complete and call onComplete callback
    const scoreTimeout = setTimeout(
      () => {
        setIsLoading(false);
        setAnimationState("idle");
        onComplete();
      },
      TRAINING_DURATION + PLUS_DURATION + SCORE_DURATION
    );

    return () => {
      clearTimeout(trainingTimeout);
      clearTimeout(plusTimeout);
      clearTimeout(scoreTimeout);
    };
  }, [isLoading, setAnimationState, addMindScore, points, onComplete]);

  return { isLoading, startAnimation };
}
