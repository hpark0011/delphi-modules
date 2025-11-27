"use client";

import { MindStatusIcon } from "@/components/mind-status-notification";
import { BrainIcon } from "@/delphi-ui/icons/Brain";
import { AnimatePresence, motion } from "framer-motion";
import { useOnboardingNavigation } from "@/app/onboarding/_context/onboarding-navigation-context";

// ============================================================================
// Constants
// ============================================================================

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

// Dimensions
const WIDGET_WIDTH_LARGE = 336;
const WIDGET_HEIGHT_LARGE = 218;
const WIDGET_WIDTH_SMALL = 46;
const WIDGET_HEIGHT_SMALL = 32;

// Positions
const POSITION_TOP_LARGE = "128px";
const POSITION_TOP_SMALL = "8px";

// Border & Padding
const BORDER_RADIUS_LARGE = 9999;
const BORDER_RADIUS_SMALL = 18;
const PADDING_OUTER_LARGE = "6px";
const PADDING_OUTER_SMALL = "2px";
const PADDING_INNER_X = 10;
const PADDING_INNER_Y = 4;

// Font Sizes
const FONT_SIZE_LARGE = "80px";
const FONT_SIZE_SMALL = "14px";

// ============================================================================
// Subcomponents
// ============================================================================

function LabelContent() {
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
      <motion.h1 className='text-text-primary-inverse tracking-tighter font-medium flex items-center justify-center h-fit leading-[100%]'>
        Hello
      </motion.h1>
    </motion.div>
  );
}

function PlusTenContent({ isSmall }: { isSmall: boolean }) {
  return (
    <motion.h1
      key='plus-ten'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%]'
      initial={{
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        fontSize: isSmall ? FONT_SIZE_SMALL : FONT_SIZE_LARGE,
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: isSmall ? FONT_SIZE_SMALL : FONT_SIZE_LARGE,
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
  isSmall,
  shouldRollIn,
}: {
  mindScore: number;
  isSmall: boolean;
  shouldRollIn?: boolean;
}) {
  return (
    <motion.h1
      key='score'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%]'
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
        fontSize: isSmall ? FONT_SIZE_SMALL : FONT_SIZE_LARGE,
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
  const { animationState } = useOnboardingNavigation();
  // When the current page is 1, the widget is large. All the other pages, the wdiget is small.
  const isSmall = currentPage !== 1;
  const showLabel = mindScore === 0 && animationState === "idle";
  const showPlusTen = animationState === "showing-plus";
  const showTrainingStatus = animationState === "training";

  return (
    // Widget container
    <motion.div
      className='flex items-center justify-center relative'
      initial={false}
      transition={SPRING_CONFIG}
      animate={{
        top: isSmall ? POSITION_TOP_SMALL : POSITION_TOP_LARGE,
      }}
    >
      {/* Outer border */}
      <motion.div
        className='relative bg-light rounded-full flex flex-row items-center'
        initial={{ padding: PADDING_OUTER_SMALL }}
        animate={{
          padding: isSmall ? PADDING_OUTER_SMALL : PADDING_OUTER_LARGE,
        }}
        transition={SPRING_CONFIG}
      >
        {/* Width wrapper for label state */}
        <div className={showLabel && isSmall ? "w-fit" : ""}>
          {/* Inner widget: Widget that contains the label or score. */}
          <motion.div
            className='shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)] overflow-hidden bg-black/87 border-white/20 hover:bg-black/84 dark:border-white/3 dark:bg-black/40 z-10 flex flex-col items-center justify-center'
            initial={{
              width: showLabel && isSmall ? undefined : WIDGET_WIDTH_LARGE,
              height: WIDGET_HEIGHT_SMALL,
              borderWidth: 0,
              borderRadius: BORDER_RADIUS_LARGE,
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}
            animate={{
              width: isSmall
                ? showLabel
                  ? "fit-content"
                  : WIDGET_WIDTH_SMALL
                : WIDGET_WIDTH_LARGE,
              height: isSmall ? WIDGET_HEIGHT_SMALL : WIDGET_HEIGHT_LARGE,
              borderWidth: isSmall ? 1 : 1.5,
              borderRadius: isSmall ? BORDER_RADIUS_SMALL : BORDER_RADIUS_LARGE,
              paddingLeft: isSmall ? PADDING_INNER_X : 0,
              paddingRight: isSmall ? PADDING_INNER_X : 0,
              paddingTop: isSmall ? PADDING_INNER_Y : 0,
              paddingBottom: isSmall ? PADDING_INNER_Y : 0,
            }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            {/* Content: Label, +10, or Score */}
            <AnimatePresence mode='wait'>
              {showLabel ? (
                <LabelContent />
              ) : showPlusTen ? (
                <PlusTenContent isSmall={isSmall} />
              ) : (
                <ScoreContent
                  mindScore={mindScore}
                  isSmall={isSmall}
                  shouldRollIn={animationState === "showing-score"}
                />
              )}
            </AnimatePresence>

            {/* Mind Level (only visible when large) */}
            <AnimatePresence>{!isSmall && <MindLevel />}</AnimatePresence>
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
                  Learning from your profile.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
