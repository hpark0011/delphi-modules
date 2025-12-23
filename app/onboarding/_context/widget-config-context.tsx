"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  WidgetConfig,
  WidgetVariant,
  createWidgetConfig,
  SPRING_CONFIG,
} from "../_utils/widget-config";

interface WidgetConfigContextType {
  /** Current widget configuration */
  config: WidgetConfig;
  /** Spring animation config */
  springConfig: typeof SPRING_CONFIG;
}

const WidgetConfigContext = createContext<WidgetConfigContextType | undefined>(
  undefined
);

interface WidgetConfigProviderProps {
  variant: WidgetVariant;
  children: React.ReactNode;
}

export function WidgetConfigProvider({
  variant,
  children,
}: WidgetConfigProviderProps) {
  const value = useMemo(
    () => ({
      config: createWidgetConfig(variant),
      springConfig: SPRING_CONFIG,
    }),
    [variant]
  );

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
