"use client";

import { AnimatePresence } from "framer-motion";
import { useOnboardingAnimation } from "@/app/onboarding/_context";
import { ONBOARDING_STEP_ORDER } from "@/app/onboarding/_utils/onboarding-steps-config";
import {
  WIDGET_STYLE_CONFIG,
  WidgetSizeVariant,
} from "@/app/onboarding/_utils/onboarding-mind-widget-style-config";
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
  const { animationState, trainingMessage } = useOnboardingAnimation();
  // Check if the current step should show the large widget
  const currentStepId = ONBOARDING_STEP_ORDER[currentStep];
  const sizeVariant: WidgetSizeVariant =
    currentStepId === "MindScore" ? "large" : "small";
  const widgetConfig = WIDGET_STYLE_CONFIG[sizeVariant];
  const showGreeting = mindScore === 0 && animationState === "idle";
  const showPlusTen = animationState === "showing-plus";
  const showTrainingStatus = animationState === "training";

  // Get shadow data from hook
  const shadowData = useOnboardingBubbleShadow({
    currentStep,
    mindScore,
    sizeVariant,
  });

  return (
    <OnboardingMindWidgetContainer config={widgetConfig}>
      <OnboardingMindWidgetWrapper>
        {/* Inner widget: Widget that contains the greeting or score. */}
        <OnboardingMindWidgetBubble config={widgetConfig}>
          {/* Content: Greeting, +10, or Score */}
          <OnboardingMindWidgetContent
            showGreeting={showGreeting}
            showPlusTen={showPlusTen}
            sizeVariant={sizeVariant}
            config={widgetConfig}
            mindScore={mindScore}
            shouldRollIn={animationState === "showing-score"}
          />

          {/* Mind Level (only visible when large) */}
          <AnimatePresence>
            {sizeVariant === "large" && (
              <OnboardingMindWidgetLevel level={shadowData.level} />
            )}
          </AnimatePresence>

          {/* Bubble Highlight Effect (glow/shadow layers) */}
          <OnboardingMindWidgetBubbleHighlight
            config={widgetConfig}
            isLuminating={isLuminating}
            isGlowing={isGlowing}
            defaultShadow={shadowData.defaultShadow}
            hoverShadow={shadowData.hoverShadow}
            innerDivShadow={shadowData.innerDivShadow}
            cssVariables={shadowData.cssVariables}
            baseShadow={shadowData.baseShadow}
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
