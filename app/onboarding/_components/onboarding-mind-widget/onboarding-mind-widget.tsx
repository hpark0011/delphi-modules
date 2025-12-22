"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useOnboardingAnimation } from "@/app/onboarding/_context";
import { ONBOARDING_STEPS } from "@/app/onboarding/_utils/onboarding-steps-config";
import { cn } from "@/lib/utils";
import {
  WIDGET_WIDTH_LARGE,
  WIDGET_HEIGHT_LARGE,
  WIDGET_WIDTH_SMALL,
  WIDGET_HEIGHT_SMALL,
  BORDER_RADIUS_LARGE,
  BORDER_RADIUS_SMALL,
  PADDING_INNER_X,
  PADDING_INNER_Y,
} from "../../_utils/onboarding-mind-widget-constants";
import { useOnboardingBubbleShadow } from "../../_utils/use-onboarding-bubble-shadow";
import { OnboardingMindWidgetContent } from "./onboarding-mind-widget-content";
import { OnboardingMindWidgetLevel } from "./onboarding-mind-widget-level";
import { OnboardingMindWidgetTrainingStatus } from "./onboarding-mind-widget-training-status";
import { OnboardingMindWidgetContainer } from "./onboarding-mind-widget-container";
import { OnboardingMindWidgetWrapper } from "./onboarding-mind-widget-wrapper";
import { OnboardingMindWidgetBubble } from "./onboarding-mind-widget-bubble";
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
          <motion.div
            className={cn(
              isLarge && !shadowData.shouldUseColoredShadow
                ? "shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)]"
                : "",
              "overflow-hidden",
              "bg-sand-12 hover:bg-sand-12 dark:bg-black/60",
              "border-none",
              "z-10",
              "flex flex-col items-center justify-center",
              "relative"
            )}
            style={shadowData.outerContainerShadowStyle}
            initial={{
              width: showLabel && !isLarge ? undefined : WIDGET_WIDTH_LARGE,
              height: WIDGET_HEIGHT_SMALL,
              borderWidth: 0,
              borderRadius: BORDER_RADIUS_LARGE,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            animate={{
              width: isLarge
                ? WIDGET_WIDTH_LARGE
                : showLabel
                  ? "fit-content"
                  : WIDGET_WIDTH_SMALL,
              height: isLarge ? WIDGET_HEIGHT_LARGE : WIDGET_HEIGHT_SMALL,
              borderWidth: isLarge ? 1.5 : 1,
              borderRadius: isLarge ? BORDER_RADIUS_LARGE : BORDER_RADIUS_SMALL,
              paddingLeft: isLarge ? 0 : PADDING_INNER_X,
              paddingRight: isLarge ? 0 : PADDING_INNER_X,
              paddingTop: isLarge ? 0 : PADDING_INNER_Y,
              paddingBottom: isLarge ? 0 : PADDING_INNER_Y,
            }}
            transition={{ duration: 0.2, ease: "easeIn" }}
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
              {isLarge && <OnboardingMindWidgetLevel level={shadowData.level} />}
            </AnimatePresence>

            {/* Bubble Effect (glow/shadow layers) */}
            <OnboardingMindWidgetBubble
              isLarge={isLarge}
              isLuminating={isLuminating}
              isGlowing={isGlowing}
              shadowData={shadowData}
              style={style}
            />
          </motion.div>
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
