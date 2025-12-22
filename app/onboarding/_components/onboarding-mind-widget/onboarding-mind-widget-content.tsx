"use client";

import { AnimatePresence } from "framer-motion";
import {
  WidgetStyleConfig,
  WidgetSizeVariant,
} from "../../_utils/onboarding-mind-widget-style-config";
import { OnboardingMindWidgetHelloLabel } from "./onboarding-mind-widget-hello-label";
import { OnboardingMindWidgetPlusTen } from "./onboarding-mind-widget-plus-ten";
import { OnboardingMindWidgetScore } from "./onboarding-mind-widget-score";

interface OnboardingMindWidgetContentProps {
  showGreeting: boolean;
  showPlusTen: boolean;
  sizeVariant: WidgetSizeVariant;
  config: WidgetStyleConfig;
  mindScore: number;
  shouldRollIn: boolean;
}

export function OnboardingMindWidgetContent({
  showGreeting,
  showPlusTen,
  config,
  mindScore,
  shouldRollIn,
}: OnboardingMindWidgetContentProps) {
  return (
    <AnimatePresence mode='wait'>
      {showGreeting ? (
        <OnboardingMindWidgetHelloLabel />
      ) : showPlusTen ? (
        <OnboardingMindWidgetPlusTen config={config} />
      ) : (
        <OnboardingMindWidgetScore
          mindScore={mindScore}
          config={config}
          shouldRollIn={shouldRollIn}
        />
      )}
    </AnimatePresence>
  );
}
