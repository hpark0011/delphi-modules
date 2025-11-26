"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingNavigation } from "@/app/onboarding/_context/onboarding-navigation-context";
import { MiniTrainingStatus } from "@/components/mind-widget/mini-training-status";

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export function OnboardingMindWidget() {
  const { currentPage } = useOnboardingNavigation();
  const isSmall = currentPage >= 1;

  return (
    <motion.div
      className='flex items-center justify-center relative'
      initial={false}
      // initial={{ opacity: 0 }}
      transition={SPRING_CONFIG}
      animate={{
        top: isSmall ? "8px" : "128px",
        // opacity: 1,
      }}
    >
      <motion.div
        className='relative bg-light rounded-full'
        initial={{ padding: "6px" }}
        animate={{
          padding: isSmall ? "2px" : "6px",
        }}
        transition={SPRING_CONFIG}
      >
        <motion.div
          className='shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.4),0_1px_1px_0_rgba(0,0,0,0.15)] overflow-hidden bg-black/87 border-white/20 hover:bg-black/84 dark:border-white/3 dark:bg-black/40 z-10 flex flex-col items-center justify-center'
          initial={{
            width: 336,
            height: 218,
            borderWidth: 1.5,
            borderRadius: 9999,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          animate={{
            width: isSmall ? 46 : 336,
            height: isSmall ? 32 : 218,
            borderWidth: isSmall ? 1 : 1.5,
            borderRadius: isSmall ? 18 : 9999,
            paddingLeft: isSmall ? 10 : 0,
            paddingRight: isSmall ? 10 : 0,
            paddingTop: isSmall ? 4 : 0,
            paddingBottom: isSmall ? 4 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeIn" }}
        >
          <motion.h1
            className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%]'
            initial={{ fontSize: "80px" }}
            animate={{
              fontSize: isSmall ? "14px" : "80px",
            }}
            transition={SPRING_CONFIG}
          >
            20
          </motion.h1>

          {/* Mind Level */}
          <AnimatePresence>
            {!isSmall && (
              <motion.div
                className='text-[16px] font-[480] text-text-muted'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                Novice
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
