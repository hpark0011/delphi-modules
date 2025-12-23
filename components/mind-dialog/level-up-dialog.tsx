"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getLevelShadowColors } from "@/app/onboarding/_utils/widget-config";

interface LevelUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newLevel: string;
  currentScore: number;
  nextLevelThreshold: number;
  progressToNextLevel: number;
  progressCap: number;
}

export function LevelUpDialog({
  open,
  onOpenChange,
  newLevel,
  currentScore,
  nextLevelThreshold,
  progressToNextLevel,
  progressCap,
}: LevelUpDialogProps) {
  const levelColors = getLevelShadowColors(newLevel);
  const isMaxLevel = newLevel === "Eternal";

  // Parse rgba color for border accent
  const parseRgba = (rgbaString: string) => {
    const match = rgbaString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      };
    }
    return { r: 255, g: 164, b: 102 }; // fallback to orange
  };

  const accentColor = parseRgba(levelColors.light);
  const borderColor = `rgba(${accentColor.r}, ${accentColor.g}, ${accentColor.b}, 0.3)`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        style={{
          borderColor: borderColor,
          borderWidth: "2px",
        }}
      >
        <DialogHeader className="text-center space-y-4 pb-4">
          <DialogTitle className="text-2xl font-bold">
            Level Up!
          </DialogTitle>
          <div className="space-y-2">
            <div
              className="text-4xl font-bold"
              style={{
                color: levelColors.light,
                textShadow: `0 0 20px ${levelColors.light}`,
              }}
            >
              {newLevel}
            </div>
            <DialogDescription className="text-base pt-2">
              {isMaxLevel ? (
                <span>
                  You&apos;ve reached the maximum level! Your mind has achieved
                  eternal wisdom.
                </span>
              ) : (
                <span>
                  You&apos;ve reached <strong>{newLevel}</strong>! Keep training to
                  reach the next level.
                </span>
              )}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Current Score</span>
              <span className="font-semibold">{currentScore.toLocaleString()}</span>
            </div>
            {!isMaxLevel && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Next Level</span>
                  <span className="font-semibold">
                    {nextLevelThreshold.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((progressToNextLevel / progressCap) * 100, 100)}%`,
                      backgroundColor: levelColors.light,
                      boxShadow: `0 0 10px ${levelColors.light}`,
                    }}
                  />
                </div>
                <div className="text-xs text-text-tertiary text-center pt-1">
                  {progressToNextLevel.toLocaleString()} / {progressCap.toLocaleString()} points
                  to next level
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="w-full sm:w-auto"
              style={{
                backgroundColor: levelColors.light,
                color: "white",
              }}
            >
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

