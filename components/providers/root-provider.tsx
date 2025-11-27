"use client";

import React, { useState, useEffect } from "react";

// all the providers go here
import { ThemeProvider } from "@/components/providers/theme-provider";

import { Toaster } from "sonner";
import { ReactQueryProvider } from "./react-query-provider";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import {
  MindScoreProvider,
  useMindScore,
} from "@/app/studio/_components/mindscore/mind-score-context";
import { TrainingQueueProvider } from "@/components/mind-dialog/training-queue-context";
import { LevelUpDialog } from "@/components/mind-dialog/level-up-dialog";

// ThemeWrapper is used to toggle the theme when the user presses the command + k key. This is only for development purposes.
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  useThemeToggle();
  return children;
}

// LevelUpDialogWrapper handles showing the level-up dialog when level changes
function LevelUpDialogWrapper({ children }: { children: React.ReactNode }) {
  const {
    hasLevelChanged,
    level,
    current,
    nextLevelThreshold,
    progressToNextLevel,
    progressCap,
    acknowledgeLevelChange,
  } = useMindScore();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (hasLevelChanged) {
      setShowDialog(true);
    }
  }, [hasLevelChanged]);

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setShowDialog(false);
      acknowledgeLevelChange();
    }
  };

  return (
    <>
      {children}
      <LevelUpDialog
        open={showDialog}
        onOpenChange={handleDialogClose}
        newLevel={level}
        currentScore={current}
        nextLevelThreshold={nextLevelThreshold}
        progressToNextLevel={progressToNextLevel}
        progressCap={progressCap}
      />
    </>
  );
}

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem
        disableTransitionOnChange
        storageKey='theme'
        themes={["light", "dark"]}
      >
        <MindScoreProvider>
          <TrainingQueueProvider>
            {/* <LevelUpDialogWrapper> */}
            <ThemeWrapper>
              {children}
              <Toaster />
            </ThemeWrapper>
            {/* </LevelUpDialogWrapper> */}
          </TrainingQueueProvider>
        </MindScoreProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
