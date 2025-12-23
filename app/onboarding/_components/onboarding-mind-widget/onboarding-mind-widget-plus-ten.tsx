"use client";

import { motion } from "framer-motion";
import { useWidgetConfig } from "@/app/onboarding/_context";

export function OnboardingMindWidgetPlusTen() {
  const { config } = useWidgetConfig();

  return (
    <motion.h1
      key='plus-ten'
      className='text-text-primary-inverse tracking-tighter font-semibold flex items-center justify-center h-fit leading-[100%] dark:text-white'
      initial={{
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        fontSize: config.contentFontSize,
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        fontSize: config.contentFontSize,
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
