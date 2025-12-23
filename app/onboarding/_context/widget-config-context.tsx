"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  WidgetConfig,
  STEP_WIDGET_CONFIG,
  SPRING_CONFIG,
} from "../_utils/widget-config";
import {
  OnboardingStepId,
  ONBOARDING_STEP_ORDER,
} from "../_utils/onboarding-steps-config";

interface WidgetConfigContextType {
  /** Current widget configuration based on step */
  config: WidgetConfig;
  /** Current step ID */
  stepId: OnboardingStepId;
  /** Spring animation config */
  springConfig: typeof SPRING_CONFIG;
}

const WidgetConfigContext = createContext<WidgetConfigContextType | undefined>(
  undefined
);

interface WidgetConfigProviderProps {
  currentStep: number;
  children: React.ReactNode;
}

export function WidgetConfigProvider({
  currentStep,
  children,
}: WidgetConfigProviderProps) {
  const value = useMemo(() => {
    const stepId = ONBOARDING_STEP_ORDER[currentStep];
    const config = STEP_WIDGET_CONFIG[stepId];

    return {
      config,
      stepId,
      springConfig: SPRING_CONFIG,
    };
  }, [currentStep]);

  return (
    <WidgetConfigContext.Provider value={value}>
      {children}
    </WidgetConfigContext.Provider>
  );
}

export function useWidgetConfig(): WidgetConfigContextType {
  const context = useContext(WidgetConfigContext);
  if (context === undefined) {
    throw new Error(
      "useWidgetConfig must be used within WidgetConfigProvider"
    );
  }
  return context;
}
