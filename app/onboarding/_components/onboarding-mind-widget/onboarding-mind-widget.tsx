"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MindStatusIcon } from "@/components/mind-status-notification";
import { useOnboardingNavigation } from "@/app/onboarding/_context/onboarding-navigation-context";
import { ONBOARDING_STEPS } from "@/app/onboarding/_util/onboarding-steps-config";
import { cn } from "@/lib/utils";
import {
  getLevelShadowColors,
  generateShadowString,
  generateSmallWidgetShadowString,
} from "@/app/studio/_utils/mind-shadow-helpers";
import { calculateLevel } from "./onboarding-mind-widget-utils";
import {
  SPRING_CONFIG,
  WIDGET_WIDTH_LARGE,
  WIDGET_HEIGHT_LARGE,
  WIDGET_WIDTH_SMALL,
  WIDGET_HEIGHT_SMALL,
  POSITION_TOP_LARGE,
  POSITION_TOP_SMALL,
  BORDER_RADIUS_LARGE,
  BORDER_RADIUS_SMALL,
  PADDING_OUTER_LARGE,
  PADDING_OUTER_SMALL,
  PADDING_INNER_X,
  PADDING_INNER_Y,
  DEFAULT_NEUTRAL_SHADOW_LARGE,
  DEFAULT_NEUTRAL_SHADOW_SMALL,
  SMALL_WIDGET_INNER_SHADOW,
} from "./onboarding-mind-widget-constants";
import { OnboardingMindWidgetHelloLabel } from "./onboarding-mind-widget-hello-label";
import { OnboardingMindWidgetPlusTen } from "./onboarding-mind-widget-plus-ten";
import { OnboardingMindWidgetScore } from "./onboarding-mind-widget-score";
import { OnboardingMindWidgetLevel } from "./onboarding-mind-widget-level";

interface OnboardingMindWidgetProps {
  currentPage: number;
  mindScore: number;
}

export function OnboardingMindWidget({
  currentPage,
  mindScore,
}: OnboardingMindWidgetProps) {
  const { animationState, trainingMessage } = useOnboardingNavigation();
  // Check if the current step should show the large widget based on configuration
  const currentStep = ONBOARDING_STEPS[currentPage];
  const isLarge = currentStep?.showLargeWidget ?? false;
  const showLabel = mindScore === 0 && animationState === "idle";
  const showPlusTen = animationState === "showing-plus";
  const showTrainingStatus = animationState === "training";

  // Calculate level and get shadow colors (only apply colored shadow on and after page 1)
  const shouldUseColoredShadow = currentPage >= 1;
  const level = calculateLevel(mindScore);
  const levelColors = getLevelShadowColors(level);

  // Use different shadow generators for large vs small widgets (only if colored shadow is enabled)
  const defaultShadow = shouldUseColoredShadow
    ? isLarge
      ? generateShadowString(levelColors, false)
      : generateSmallWidgetShadowString(levelColors)
    : isLarge
      ? DEFAULT_NEUTRAL_SHADOW_LARGE
      : DEFAULT_NEUTRAL_SHADOW_SMALL;
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
      boxShadow: DEFAULT_NEUTRAL_SHADOW_SMALL.replace(/_/g, " "),
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
    return DEFAULT_NEUTRAL_SHADOW_LARGE;
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
                <OnboardingMindWidgetHelloLabel />
              ) : showPlusTen ? (
                <OnboardingMindWidgetPlusTen isLarge={isLarge} />
              ) : (
                <OnboardingMindWidgetScore
                  mindScore={mindScore}
                  isLarge={isLarge}
                  shouldRollIn={animationState === "showing-score"}
                />
              )}
            </AnimatePresence>

            {/* Mind Level (only visible when large) */}
            <AnimatePresence>
              {isLarge && <OnboardingMindWidgetLevel level={level} />}
            </AnimatePresence>

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
                  boxShadow: isLarge
                    ? innerDivShadow
                    : SMALL_WIDGET_INNER_SHADOW,
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
                  ? DEFAULT_NEUTRAL_SHADOW_LARGE
                  : SMALL_WIDGET_INNER_SHADOW,
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
