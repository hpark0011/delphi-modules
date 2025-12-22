"use client";

import { AnimatePresence } from "framer-motion";
import { useOnboardingAnimation } from "@/app/onboarding/_context";
import { ONBOARDING_STEPS } from "@/app/onboarding/_utils/onboarding-steps-config";
import { useOnboardingBubbleShadow } from "../../_hooks/use-onboarding-bubble-shadow";
import { OnboardingMindWidgetContent } from "./onboarding-mind-widget-content";
import { OnboardingMindWidgetLevel } from "./onboarding-mind-widget-level";
import { OnboardingMindWidgetTrainingStatus } from "./onboarding-mind-widget-training-status";
import { OnboardingMindWidgetContainer } from "./onboarding-mind-widget-container";
import { OnboardingMindWidgetWrapper } from "./onboarding-mind-widget-wrapper";
import { OnboardingMindWidgetBubble } from "./onboarding-mind-widget-bubble";
import { OnboardingMindWidgetBubbleHighlight } from "./onboarding-mind-widget-bubble-highlight";
import { CSSProperties } from "react";

interface OnboardingMindWidgetProps {
  currentPage: number;
  mindScore: number;
  isLuminating: boolean;
  isGlowing: boolean;
  style?: CSSProperties;
}

export function OnboardingMindWidget({
  currentPage,
  mindScore,
  isLuminating,
  isGlowing,
  style,
}: OnboardingMindWidgetProps) {
  const { animationState, trainingMessage } = useOnboardingAnimation();
  // Check if the current step should show the large widget based on configuration
  const currentStep = ONBOARDING_STEPS[currentPage];
  const isLarge = currentStep?.showLargeWidget ?? false;
  const showLabel = mindScore === 0 && animationState === "idle";
  const showPlusTen = animationState === "showing-plus";
  const showTrainingStatus = animationState === "training";

  // Get shadow data from hook
  const shadowData = useOnboardingBubbleShadow({
    currentPage,
    mindScore,
    isLarge,
  });

  return (
    <OnboardingMindWidgetContainer isLarge={isLarge}>
      <OnboardingMindWidgetWrapper>
        {/* Width wrapper for label state */}
        <div className={showLabel && !isLarge ? "w-fit" : ""}>
          {/* Inner widget: Widget that contains the label or score. */}
          <OnboardingMindWidgetBubble
            isLarge={isLarge}
            showLabel={showLabel}
            shadowData={shadowData}
          >
            {/* Content: Label, +10, or Score */}
            <OnboardingMindWidgetContent
              showLabel={showLabel}
              showPlusTen={showPlusTen}
              isLarge={isLarge}
              mindScore={mindScore}
              shouldRollIn={animationState === "showing-score"}
            />

            {/* Mind Level (only visible when large) */}
            <AnimatePresence>
              {isLarge && (
                <OnboardingMindWidgetLevel level={shadowData.level} />
              )}
            </AnimatePresence>

            {/* Bubble Highlight Effect (glow/shadow layers) */}
            <OnboardingMindWidgetBubbleHighlight
              isLarge={isLarge}
              isLuminating={isLuminating}
              isGlowing={isGlowing}
              shadowData={shadowData}
              style={style}
            />
          </OnboardingMindWidgetBubble>
        </div>

        {/* Training Status */}
        <AnimatePresence>
          {showTrainingStatus && (
            <OnboardingMindWidgetTrainingStatus
              trainingMessage={trainingMessage}
            />
          )}
        </AnimatePresence>
      </OnboardingMindWidgetWrapper>
    </OnboardingMindWidgetContainer>
  );
}
