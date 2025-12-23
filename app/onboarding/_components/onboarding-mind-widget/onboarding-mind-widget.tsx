"use client";

import { AnimatePresence } from "framer-motion";
import {
  useOnboardingAnimation,
  WidgetConfigProvider,
  useWidgetConfig,
} from "@/app/onboarding/_context";
import { WidgetVariant } from "@/app/onboarding/_utils/widget-config";
import { useOnboardingBubbleShadow } from "../../_hooks/use-onboarding-bubble-shadow";
import { OnboardingMindWidgetContent } from "./onboarding-mind-widget-content";
import { OnboardingMindWidgetLevel } from "./onboarding-mind-widget-level";
import { OnboardingMindWidgetTrainingStatus } from "./onboarding-mind-widget-training-status";
import { OnboardingMindWidgetContainer } from "./onboarding-mind-widget-container";
import { OnboardingMindWidgetWrapper } from "./onboarding-mind-widget-wrapper";
import { OnboardingMindWidgetBubble } from "./onboarding-mind-widget-bubble";
import { OnboardingMindWidgetBubbleHighlight } from "./onboarding-mind-widget-bubble-highlight";
import { CSSProperties } from "react";

// Step 2 (MindScore) uses large variant, all others use small
const MIND_SCORE_STEP = 2;

interface OnboardingMindWidgetProps {
  currentStep: number;
  mindScore: number;
  isLuminating: boolean;
  isGlowing: boolean;
  style?: CSSProperties;
}

export function OnboardingMindWidget({
  currentStep,
  mindScore,
  isLuminating,
  isGlowing,
  style,
}: OnboardingMindWidgetProps) {
  const variant: WidgetVariant =
    currentStep === MIND_SCORE_STEP ? "large" : "small";

  return (
    <WidgetConfigProvider variant={variant}>
      <OnboardingMindWidgetInner
        mindScore={mindScore}
        isLuminating={isLuminating}
        isGlowing={isGlowing}
        style={style}
      />
    </WidgetConfigProvider>
  );
}

interface OnboardingMindWidgetInnerProps {
  mindScore: number;
  isLuminating: boolean;
  isGlowing: boolean;
  style?: CSSProperties;
}

function OnboardingMindWidgetInner({
  mindScore,
  isLuminating,
  isGlowing,
  style,
}: OnboardingMindWidgetInnerProps) {
  const { animationState, trainingMessage } = useOnboardingAnimation();
  const { config } = useWidgetConfig();

  const showGreeting = mindScore === 0 && animationState === "idle";
  const showPlusTen = animationState === "showing-plus";
  const showTrainingStatus = animationState === "training";

  // Get shadow data from hook
  const shadowData = useOnboardingBubbleShadow({ mindScore });

  return (
    <OnboardingMindWidgetContainer>
      <OnboardingMindWidgetWrapper>
        {/* Mind Bubble */}
        <OnboardingMindWidgetBubble>
          {/* Content: Greeting, +10, or Score */}
          <OnboardingMindWidgetContent
            showGreeting={showGreeting}
            showPlusTen={showPlusTen}
            mindScore={mindScore}
            shouldRollIn={animationState === "showing-score"}
          />

          {/* Mind Level */}
          <AnimatePresence>
            {config.showLevel && (
              <OnboardingMindWidgetLevel level={shadowData.level} />
            )}
          </AnimatePresence>

          {/* Bubble Highlight Effect (glow/shadow layers) */}
          <OnboardingMindWidgetBubbleHighlight
            isLuminating={isLuminating}
            isGlowing={isGlowing}
            shadowData={shadowData}
            style={style}
          />
        </OnboardingMindWidgetBubble>

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
