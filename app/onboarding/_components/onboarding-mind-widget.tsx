"use client";

import { MindStatusIcon } from "@/components/mind-status-notification";
import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { AnimatePresence, motion } from "framer-motion";
import { useOnboardingNavigation } from "@/app/onboarding/_context/onboarding-navigation-context";
import { cn } from "@/lib/utils";
import {
  getLevelShadowColors,
  generateShadowString,
  generateSmallWidgetShadowString,
} from "@/app/studio/_utils/mind-shadow-helpers";

const LEVEL_THRESHOLDS = [
  { name: "Novice", min: 0 },
  { name: "Skilled", min: 200 },
  { name: "Expert", min: 1000 },
  { name: "Master", min: 2000 },
  { name: "Sage", min: 3000 },
  { name: "Legendary", min: 4000 },
  { name: "Eternal", min: 5000 },
];

function calculateLevel(score: number): string {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (score >= LEVEL_THRESHOLDS[i].min) {
      return LEVEL_THRESHOLDS[i].name;
    }
  }
  return LEVEL_THRESHOLDS[0].name;
}

// Animation Config

export const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

// Dimensions

export const WIDGET_WIDTH_LARGE = 336;
export const WIDGET_HEIGHT_LARGE = 218;
export const WIDGET_WIDTH_SMALL = 52;
export const WIDGET_HEIGHT_SMALL = 40;

// Positions

export const POSITION_TOP_LARGE = "17vh";
export const POSITION_TOP_SMALL = "8px";

// Styling Values

export const BORDER_RADIUS_LARGE = 9999;
export const BORDER_RADIUS_SMALL = 9999;
export const PADDING_OUTER_LARGE = "0px";
export const PADDING_OUTER_SMALL = "2px";
export const PADDING_INNER_X = 12;
export const PADDING_INNER_Y = 4;
export const FONT_SIZE_LARGE = "80px";
export const FONT_SIZE_SMALL = "16px";

// ============================================================================
// Subcomponents
// ============================================================================

function HelloLabel() {
  return (
    <motion.div
      key='label'
      className='flex items-center gap-1'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <BrainIcon className='text-icon-light size-4' />
      <motion.h1 className='text-text-primary-inverse dark:text-white tracking-tighter font-medium flex items-center justify-center h-fit leading-[100%]'>
        Hello
      </motion.h1>
    </motion.div>
  );
}

function PlusTenContent({ isLarge }: { isLarge: boolean }) {
  return (
    <motion.h1
      key='plus-ten'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%] dark:text-white'
      initial={{
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        fontSize: isLarge ? FONT_SIZE_LARGE : FONT_SIZE_SMALL,
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: isLarge ? FONT_SIZE_LARGE : FONT_SIZE_SMALL,
      }}
      exit={{
        y: -20,
        opacity: 0,
        filter: "blur(10px)",
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      +10
    </motion.h1>
  );
}

function ScoreContent({
  mindScore,
  isLarge,
  shouldRollIn,
}: {
  mindScore: number;
  isLarge: boolean;
  shouldRollIn?: boolean;
}) {
  return (
    <motion.h1
      key='score'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%] dark:text-white'
      initial={
        shouldRollIn
          ? {
              y: 20,
              opacity: 0,
              filter: "blur(10px)",
              fontSize: FONT_SIZE_LARGE,
            }
          : { opacity: 0, fontSize: FONT_SIZE_LARGE }
      }
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: isLarge ? FONT_SIZE_LARGE : FONT_SIZE_SMALL,
      }}
      exit={{ opacity: 0 }}
      transition={
        shouldRollIn ? { duration: 0.2, ease: "easeInOut" } : SPRING_CONFIG
      }
    >
      {mindScore}
    </motion.h1>
  );
}

function MindLevel() {
  return (
    <motion.div
      className='text-[16px] font-[480] text-text-muted'
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      Novice
    </motion.div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function OnboardingMindWidget({
  currentPage,
  mindScore,
}: {
  currentPage: number;
  mindScore: number;
}) {
  const { animationState, trainingMessage } = useOnboardingNavigation();
  // When the current page is 1, the widget is large. All the other pages, the widget is small (default).
  const isLarge = currentPage === 1;
  const showLabel = mindScore === 0 && animationState === "idle";
  const showPlusTen = animationState === "showing-plus";
  const showTrainingStatus = animationState === "training";

  // Calculate level and get shadow colors (only apply colored shadow on and after page 1)
  const shouldUseColoredShadow = currentPage >= 1;
  const level = calculateLevel(mindScore);
  const levelColors = getLevelShadowColors(level);

  // Default neutral shadows for page 0
  const defaultNeutralShadowLarge =
    "inset 0px 1px 1px 1px rgba(0,0,0,0.1), inset 0px -1px 1px 0px rgba(255,255,255,0.7), inset 0px 1px 1px 3px rgba(255,255,255,1)";
  const defaultNeutralShadowSmall =
    "0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)";
  // White inset shadow for small widget's inner div (always the same regardless of colored shadow)
  const smallWidgetInnerShadow =
    "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)";

  // Use different shadow generators for large vs small widgets (only if colored shadow is enabled)
  const defaultShadow = shouldUseColoredShadow
    ? isLarge
      ? generateShadowString(levelColors, false)
      : generateSmallWidgetShadowString(levelColors)
    : isLarge
      ? defaultNeutralShadowLarge
      : defaultNeutralShadowSmall;
  const hoverShadow = shouldUseColoredShadow
    ? isLarge
      ? generateShadowString(levelColors, true)
      : generateSmallWidgetShadowString(levelColors) // Small widget doesn't have hover state
    : defaultShadow;

  // Compute outer container shadow style for small widgets
  // Small widgets have colored shadow applied to outer container (not inner div)
  const outerContainerShadowStyle = (() => {
    // Large widgets don't need shadow on outer container (shadow is on inner div)
    if (isLarge) {
      return undefined;
    }

    // Small widget with colored shadow (page 1+)
    if (shouldUseColoredShadow) {
      return {
        boxShadow: defaultShadow.replace(/_/g, " "),
      };
    }

    // Small widget with neutral shadow (page 0)
    return {
      boxShadow: defaultNeutralShadowSmall.replace(/_/g, " "),
    };
  })();

  // Compute inner div shadow for the "Mind Area Inner" element
  // Only applies to large widgets (small widgets use white inset shadow)
  const innerDivShadow = (() => {
    // Only compute shadow for large widgets
    if (!isLarge) {
      return undefined;
    }

    // Large widget with colored shadow (page 1+)
    if (shouldUseColoredShadow) {
      return "var(--shadow-default)";
    }

    // Large widget with neutral shadow (page 0)
    return defaultNeutralShadowLarge;
  })();

  return (
    // Widget container
    <motion.div
      className='flex items-center justify-center relative'
      initial={false}
      transition={SPRING_CONFIG}
      animate={{
        top: isLarge ? POSITION_TOP_LARGE : POSITION_TOP_SMALL,
      }}
    >
      {/* Outer border */}
      <motion.div
        className='relative bg-light rounded-full flex flex-row items-center'
        initial={{ padding: PADDING_OUTER_SMALL }}
        animate={{
          padding: isLarge ? PADDING_OUTER_LARGE : PADDING_OUTER_SMALL,
        }}
        transition={SPRING_CONFIG}
      >
        {/* Width wrapper for label state */}
        <div className={showLabel && !isLarge ? "w-fit" : ""}>
          {/* Inner widget: Widget that contains the label or score. */}
          <motion.div
            className={cn(
              isLarge && !shouldUseColoredShadow
                ? "shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)]"
                : "",
              "overflow-hidden",
              "bg-sand-12 hover:bg-sand-12 dark:bg-black/60",
              "border-none",
              "z-10",
              "flex flex-col items-center justify-center",
              "relative"
            )}
            style={outerContainerShadowStyle}
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
            <AnimatePresence mode='wait'>
              {showLabel ? (
                <HelloLabel />
              ) : showPlusTen ? (
                <PlusTenContent isLarge={isLarge} />
              ) : (
                <ScoreContent
                  mindScore={mindScore}
                  isLarge={isLarge}
                  shouldRollIn={animationState === "showing-score"}
                />
              )}
            </AnimatePresence>

            {/* Mind Level (only visible when large) */}
            <AnimatePresence>{isLarge && <MindLevel />}</AnimatePresence>

            {/* Mind Area Inner */}
            {isLarge && (
              <motion.div
                className='rounded-full absolute'
                style={
                  isLarge && shouldUseColoredShadow
                    ? ({
                        "--shadow-default": defaultShadow.replace(/_/g, " "),
                        "--shadow-hover": hoverShadow.replace(/_/g, " "),
                      } as React.CSSProperties & {
                        "--shadow-default": string;
                        "--shadow-hover": string;
                      })
                    : undefined
                }
                animate={{
                  top: isLarge ? "2px" : "1px",
                  left: isLarge ? "2px" : "1px",
                  width: isLarge ? "calc(100% - 4px)" : "calc(100% - 2px)",
                  height: isLarge ? "calc(100% - 4px)" : "calc(100% - 2px)",
                  filter: isLarge ? "blur(6px)" : "blur(3px)",
                  boxShadow: isLarge ? innerDivShadow : smallWidgetInnerShadow,
                }}
                transition={SPRING_CONFIG}
                onMouseEnter={
                  isLarge && shouldUseColoredShadow
                    ? (e) => {
                        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
                      }
                    : undefined
                }
                onMouseLeave={
                  isLarge && shouldUseColoredShadow
                    ? (e) => {
                        e.currentTarget.style.boxShadow =
                          "var(--shadow-default)";
                      }
                    : undefined
                }
              />
            )}
            <motion.div
              className='rounded-full absolute'
              animate={{
                top: isLarge ? "2px" : "1px",
                left: isLarge ? "2px" : "1px",
                width: isLarge ? "calc(100% - 4px)" : "calc(100% - 2px)",
                height: isLarge ? "calc(100% - 4px)" : "calc(100% - 2px)",
                filter: isLarge ? "blur(6px)" : "blur(3px)",
                boxShadow: isLarge
                  ? "inset 0px 1px 1px 1px rgba(0,0,0,0.1), inset 0px -1px 1px 0px rgba(255,255,255,0.7), inset 0px 1px 1px 3px rgba(255,255,255,1)"
                  : "inset 0px -2px 2px 0px rgba(255,255,255,0.9), inset 0px 5px 2px 0px rgba(255,255,255,0.5), inset 0px 4px 4px 0px rgba(255,255,255,0), inset 0px 1px 1px 0.5px rgba(255,255,255,0.7)",
              }}
              transition={SPRING_CONFIG}
            />
          </motion.div>
        </div>

        {/* Training Status */}
        <AnimatePresence>
          {showTrainingStatus && (
            <motion.div
              className='overflow-hidden'
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className='pl-2.5 pr-3.5 text-text-tertiary flex items-center gap-1 whitespace-nowrap'>
                <MindStatusIcon status='active' />
                <span className='max-w-[176px] truncate text-[13px]'>
                  {trainingMessage}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
